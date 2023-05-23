const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { httpError, ctrlWrapper } = require('../helpers');

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json(newUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw httpError(401, 'Email or password invalid');
  }

  const passwordCompare = bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw httpError(401, 'Email or password invalid');
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '24h' });
  await User.findByIdAndUpdate(user.id, { token });

  res.status(200).json({ token });
};

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: '' });

  res.status(204).end();
};

const current = async (req, res) => {
  const { email, name } = req.user;

  res.status(200).json({ email, name });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
};
