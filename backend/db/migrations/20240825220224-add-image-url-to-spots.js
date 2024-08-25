'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Spots', 'imageUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    }, options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Spots', 'imageUrl', options);
  }
};
