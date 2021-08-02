module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username taken",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: { type: DataTypes.STRING, defaultValue: null },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
    },
  });
  return User;
};