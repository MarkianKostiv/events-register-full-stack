// models/Events.js
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define("Events", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Events.associate = (models) => {
    Events.hasMany(models.Participants, {
      onDelete: "cascade",
    });
  };

  return Events;
};
