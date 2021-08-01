//databases
const { Trip } = require('../../db/models');

/* Find the Trip by Id */
exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findByPk(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

exports.tripFetch = async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

exports.tripCreate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get('host')}/${req.file.path}`;
    req.body.userId = req.user.id;
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};

exports.updateTrip = async (req, res, next) => {
  const foundTrip = req.foundTrip;
  try {
    if (foundTrip.userId === req.user.id) {
      if (req.file)
        req.body.image = `http://${req.get('host')}/${req.file.path}`;
      const updatedTrip = await foundTrip.update(req.body);

      res.json(updatedTrip);
    } else {
      const err = new Error('Unauthorized!');
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteTrip = async (req, res, next) => {
  const foundTrip = req.foundTrip;
  try {
    if (req.user.id === foundTrip.userId) {
      await foundTrip.destroy();
      res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};
