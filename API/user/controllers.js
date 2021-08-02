//library imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRATION_MS, JWT_SECERT } = require("../../config/keys");
//databases
const { User, Profile } = require("../../db/models");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRound = 10;
  // hashing the pass
  try {
    const hashedPassword = await bcrypt.hash(password, saltRound);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    await Profile.create({
      userId: newUser.id,
    });
    const token = jwt.sign(JSON.stringify(payload), JWT_SECERT);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECERT);
  res.json({ token });
};
