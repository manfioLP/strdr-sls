const mongoose = require('mongoose');
const { user } = require('../errors');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, user.USERNAME_REQUIRED],
    unique: [true, user.USERNAME_UNIQUE],
  },
  email: {
    type: String,
    required: [true, user.EMAIL_REQUIRED],
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
