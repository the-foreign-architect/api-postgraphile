export default (sequelize, DataTypes) => {
  const Architect = sequelize.define('architect', {
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

  return Architect;
};