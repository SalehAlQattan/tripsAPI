//library imports
const express = require("express");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");
const { jwtStrategy } = require("./middleware/passport");
// importing routes
const userRoutes = require("./API/user/routes");
const tripRoutes = require("./API/trip/routes");
// importing db
const db = require("./db/models");

const app = express();

// middledwares
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(express.json());

// routes
app.use(userRoutes);
app.use("/trips", tripRoutes);

app.use("/media", express.static("media"))

//Middleware: internal server error
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error!" });
});

//Middleware: no path found
app.use((req, res, next) => {
  res.status(404).json({ message: "Path Not Found!" });
});

//run
const run = async () => {
  try {
    // we add {force: true} one time to allow add new colum in DB
    await db.sequelize.sync({ alter: true });
    console.log("Database is connected");
    app.listen(8000, () => console.log("App is running on port 8000"));
  } catch (error) {
    console.error(error);
  }
};
run();
