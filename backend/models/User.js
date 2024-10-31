const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
    timestamp: {
      type: Date,
      required: false,
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.updateLocation = function (latitude, longitude) {
  this.location = {
    latitude,
    longitude,
    timestamp: new Date(),
  };
  return this.save();
};

userSchema.methods.getLocation = function () {
  return this.location;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
