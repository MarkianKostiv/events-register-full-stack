module.exports = (sequelize, DataTypes) => {
  const Participants = sequelize.define("Participants", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Participants;
};
