'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';  // define your table name in options object
    console.log('Seeding spots...');

    try {
      await Spot.bulkCreate([
        {
          ownerId: 1,
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          lat: 40.7128,
          lng: -74.0060,
          name: 'Cozy Apartment',
          description: 'A cozy apartment in the heart of the city',
          price: 100
        },
        {
          ownerId: 2,
          address: '456 Elm St',
          city: 'San Francisco',
          state: 'CA',
          country: 'USA',
          lat: 37.7749,
          lng: -122.4194,
          name: 'Modern Condo',
          description: 'A modern condo with great views',
          price: 150
        }
      ], { validate: true });

      console.log('Spots seeded successfully.');
    } catch (error) {
      console.error('Error seeding spots:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';  // define your table name in options object
    const Op = Sequelize.Op;
    console.log('Deleting seeded spots...');

    try {
      await queryInterface.bulkDelete(options, {
        address: { [Op.in]: ['123 Main St', '456 Elm St'] }
      }, {});

      console.log('Spots deleted successfully.');
    } catch (error) {
      console.error('Error deleting spots:', error);
    }
  }
};
