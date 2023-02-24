'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Areas', [
      {
        id: 1,
        nome: 'Ciencias Exatas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nome: 'Ciencias Humanas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nome: 'Ciencias Biologicas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
