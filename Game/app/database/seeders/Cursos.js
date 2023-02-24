'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cursos', [
      {
        id: 1,
        sigla: 'ES01',
        nome: 'Engenharia de Software',
        descricao: 'Curso de Engenharia de Software da UFAM',
        areaId: 1,
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
