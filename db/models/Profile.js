module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define("Profile", {
    bio: { type: DataTypes.STRING, defaultValue: null },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
    },
  });
  return Trip;
};
