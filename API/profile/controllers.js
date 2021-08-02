//databases
const { Profile, User } = require("../../db/models");

/* Find the Trip by Id */

exports.profileFetch = async (req, res, next) => {
  try {
    const profile = await Profile.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: User,
        as: "user",
        attributes: ["username", "image", "bio"],
      },
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};
