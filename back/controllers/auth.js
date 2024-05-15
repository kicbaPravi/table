const User = require('../models/User.js');
const { createError } = require('../error.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sign up

exports.signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send('User has been created!');
  } catch (err) {
    next(err);
  }
};

// Sign in

exports.signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, 'User not found!'));

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!correctPassword) return next(createError(404, 'Wrong credentials!'));

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    // return access token in cookie

    const { password, ...others } = user._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Number(new Date()) + 8 * 60 * 60 * 1000)
        // expires in 8 hours
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};
