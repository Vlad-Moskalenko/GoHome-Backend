const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is require'],
  },
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  token: {
    type: String,
    default: '',
  },
});

const User = model('user', userSchema);

module.exports = User;
