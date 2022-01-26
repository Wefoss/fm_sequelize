'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users_to_groupes', 
    {  id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
     userId: {
       field: 'user_id',
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
       model: 'users',
       key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
     },
     gropeId: {
      field: 'grope_id',
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
       model: 'groupes',
       key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
     }
  });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('users');
  }
};
