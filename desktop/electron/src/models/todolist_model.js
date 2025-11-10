module.exports = (sequelize, Sequelize) => {
  const todolist = sequelize.define(
    'todolist',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      libelle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      done: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rang: {
        type: Sequelize.STRING,
        allowNull: false,
      }
      // desktop_update_at: {
      //   type: Sequelize.STRING,
      //   defaultValue: Sequelize.NOW,
      //   allowNull: false,
      // },
      // is_deleted: {
      //   type: Sequelize.INTEGER,
      //   defaultValue: 0,
      //   allowNull: false,
      // },
      // is_dirty: {
      //   type: Sequelize.INTEGER,
      //   defaultValue: 0,
      //   allowNull: false,
      // },
      // last_sync_time: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: false,
    }
  );

  return todolist;
};
