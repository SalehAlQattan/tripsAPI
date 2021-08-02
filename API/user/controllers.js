//library imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRATION_MS, JWT_SECERT } = require("../../config/keys");
//databases
const { User, Profile } = require("../../db/models");

exports.fetchProfile = async (userId, next) => {
  try {
    const profile = await User.findByPk(userId);
    return profile
  } catch (error) {
    next(error)
  }
}

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

exports.updateProfile = async (req, res, next) => {
  try {
    if (req.user.id === req.profile.id) {
      if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`
      await req.profile.update(req.body);
      res.json(req.profile);
    } else {
      const error = new Error("Unauthrozied")
      error.status = 401
      return next(error)
    }
  } catch (error) {
    next(error)
  }
};
