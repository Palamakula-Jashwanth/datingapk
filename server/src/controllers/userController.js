const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const { calculateMatchPercentage } = require('../utils/matchAlgorithm');

exports.updateProfile = async (req, res) => {
  try {
    const allowedUpdates = ['name', 'bio', 'location', 'interests'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ success: false, message: 'Invalid updates' });
    }

    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No images uploaded' });
    }

    const user = await User.findById(req.user._id);
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: 'tinder-users', resource_type: 'image' },
            (error, result) => {
              if (error) reject(error);
              else resolve({ url: result.secure_url, publicId: result.public_id });
            }
          )
          .end(file.buffer);
      });
    });

    const uploadedImages = await Promise.all(uploadPromises);
    user.images.push(...uploadedImages);
    await user.save();

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;
    const user = await User.findById(req.user._id);

    const imageIndex = user.images.findIndex((img) => img.publicId === publicId);
    if (imageIndex === -1) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    await cloudinary.uploader.destroy(publicId);
    user.images.splice(imageIndex, 1);
    await user.save();

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDiscoverUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const { limit = 20, skip = 0 } = req.query;

    const excludedIds = [
      ...currentUser.likes,
      ...currentUser.dislikes,
      ...currentUser.blockedUsers,
      currentUser._id,
    ];

    let genderFilter = {};
    if (currentUser.interestedIn !== 'both') {
      genderFilter = { gender: currentUser.interestedIn };
    }

    const users = await User.find({
      _id: { $nin: excludedIds },
      ...genderFilter,
    })
      .select('-password -likes -dislikes -blockedUsers')
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const usersWithMatch = users.map((user) => ({
      ...user.toJSON(),
      matchPercentage: calculateMatchPercentage(currentUser, user),
    }));

    res.json({ success: true, data: usersWithMatch });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -blockedUsers');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const currentUser = await User.findById(req.user._id);
    const matchPercentage = calculateMatchPercentage(currentUser, user);

    res.json({ success: true, data: { ...user.toJSON(), matchPercentage } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
