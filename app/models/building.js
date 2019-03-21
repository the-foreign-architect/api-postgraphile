export default (sequelize, DataTypes) => {
  const Building = sequelize.define('building', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    },
  });


  return Building;
};