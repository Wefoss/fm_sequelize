"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "users_to_groupes",
      "created_at",
      Sequelize.DATE,
      {
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      "users_to_groupes",
      "updated_at",
      Sequelize.DATE,
      {
        allowNull: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
