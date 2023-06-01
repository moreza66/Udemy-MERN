const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // This is a validator
  },
  email: {
    type: String,
    required: true,
    unique: true, // This is a validator
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now, // This is a default value
  },
});

module.exports = User = mongoose.model('user', UserSchema);
