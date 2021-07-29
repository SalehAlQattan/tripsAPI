const express = require('express');
const app = express();
const passport = require('passport');
const { localStrategy } = require('./middleware/passport');
const { jwtStrategy } = require('./middleware/passport');

// importing db
const db = require('./db/models');

// import routes
const userRoutes = require('./API/user/routes');

// middledwares
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(express.json());

// routes
app.use(userRoutes);

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error!' });
});
// not found => respond with a message for a not declared path!
app.use((req, res, next) => {
  res.status(404).json({ message: 'Path Not Found!' });
});

// running the server and connecting to db
const run = async () => {
  try {
    // we add {force: true} one time to allow add new colum in DB
    await db.sequelize.sync({ alter: true });
    console.log('Database is connected');
    app.listen(8000, () => console.log('App is running on port 8000'));
  } catch (error) {
    console.error(error);
  }
};
run();
