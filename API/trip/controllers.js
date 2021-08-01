//databases
const { Trip } = require("../../db/models");

exports.tripFetch = async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};
exports.tripCreate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.userId = req.user.id;
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};
