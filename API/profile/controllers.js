//databases
const { Profile, User } = require("../../db/models");

/* Find the Trip by Id */
exports.fetchProfile = async (userId, next) => {
  try {
    const profile = await Profile.findOne({
      where: { userId },
    });
    return profile
  } catch (error) {
    next(error)
  }
}

exports.profileFetch = async (req, res, next) => {
  try {
    const profile = await Profile.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    if (req.user.id === req.profile.id) {
      if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`
      const response = await req.profile.update(req.body);
      res.json({ ...response.dataValues, user: { username: req.user.username } });
    } else {
      const error = new Error("Unauthrozied")
      error.status = 401
      return next(error)
    }
  } catch (error) {
    next(error)
  }
};
