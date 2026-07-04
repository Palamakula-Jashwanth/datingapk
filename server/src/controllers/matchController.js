const User = require('../models/User');
const Chat = require('../models/Chat');

exports.likeUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findById(req.user._id);
    const likedUser = await User.findById(userId);

    if (!likedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (currentUser.likes.includes(userId)) {
      return res.status(400).json({ success: false, message: 'Already liked this user' });
    }

    currentUser.likes.push(userId);
    await currentUser.save();

    let isMatch = false;
    if (likedUser.likes.includes(req.user._id)) {
      isMatch = true;
      currentUser.matches.push(userId);
      likedUser.matches.push(req.user._id);
      await currentUser.save();
      await likedUser.save();

      const chat = await Chat.create({
        participants: [req.user._id, userId],
      });

      return res.json({
        success: true,
        data: { isMatch, match: likedUser, chat },
      });
    }

    res.json({ success: true, data: { isMatch } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.dislikeUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findById(req.user._id);

    if (currentUser.dislikes.includes(userId)) {
      return res.status(400).json({ success: false, message: 'Already disliked this user' });
    }

    currentUser.dislikes.push(userId);
    await currentUser.save();

    res.json({ success: true, message: 'User disliked' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      'matches',
      'name age location images isOnline lastSeen'
    );

    res.json({ success: true, data: user.matches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.unmatch = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findById(req.user._id);
    const otherUser = await User.findById(userId);

    if (!otherUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    currentUser.matches = currentUser.matches.filter((id) => id.toString() !== userId);
    otherUser.matches = otherUser.matches.filter((id) => id.toString() !== req.user._id);

    await currentUser.save();
    await otherUser.save();

    await Chat.findOneAndDelete({
      participants: { $all: [req.user._id, userId] },
    });

    res.json({ success: true, message: 'Unmatched successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
