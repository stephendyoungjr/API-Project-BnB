'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // defines schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';  // defines table name in options object
    console.log('Seeding reviews...');

    try {
      await Review.bulkCreate([
        {
          userId: 1,
          spotId: 1,
          review: 'Great place!',
          stars: 5
        },
        {
          userId: 2,
          spotId: 2,
          review: 'Not bad.',
          stars: 4
        }
      ], { validate: true });

      console.log('Reviews seeded successfully.');
    } catch (error) {
      console.error('Error seeding reviews:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';  // defines table name in options object
    const Op = Sequelize.Op;
    console.log('Deleting seeded reviews...');

    try {
      await queryInterface.bulkDelete(options, {
        review: { [Op.in]: ['Great place!', 'Not bad.'] }
      }, {});

      console.log('Reviews deleted successfully.');
    } catch (error) {
      console.error('Error deleting reviews:', error);
    }
  }
};
