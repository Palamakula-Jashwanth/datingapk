const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const Chat = require('../models/Chat');

const socketHandler = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.userId = user._id;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', async (socket) => {
    await User.findByIdAndUpdate(socket.userId, { isOnline: true });

    socket.on('join_chat', (chatId) => {
      socket.join(chatId);
    });

    socket.on('send_message', async (data) => {
      try {
        const { chatId, content } = data;

        const message = await Message.create({
          chat: chatId,
          sender: socket.userId,
          content,
        });

        const chat = await Chat.findById(chatId);
        chat.lastMessage = message._id;
        await chat.save();

        const populatedMessage = await Message.findById(message._id).populate(
          'sender',
          'name images'
        );

        io.to(chatId).emit('new_message', populatedMessage);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('typing', (chatId) => {
      socket.to(chatId).emit('user_typing', { userId: socket.userId });
    });

    socket.on('stop_typing', (chatId) => {
      socket.to(chatId).emit('user_stop_typing', { userId: socket.userId });
    });

    socket.on('disconnect', async () => {
      await User.findByIdAndUpdate(socket.userId, {
        isOnline: false,
        lastSeen: Date.now(),
      });
    });
  });
};

module.exports = socketHandler;
