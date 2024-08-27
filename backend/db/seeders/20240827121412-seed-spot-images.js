'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    console.log('Seeding spot images...');

    try {
      await SpotImage.bulkCreate([
        {
          spotId: 1,
          url: '/warbnb1.jpeg',
          preview: true
        },
        {
          spotId: 2,
          url: '/warbnb2.jpeg',
          preview: true
        },
        {
          spotId: 3,
          url: '/warbnb3.jpeg',
          preview: true
        },
        {
          spotId: 4,
          url: '/warbnb4.jpeg',
          preview: true
        },
        {
          spotId: 5,
          url: '/warbnb5.jpeg',
          preview: true
        },
        {
          spotId: 6,
          url: '/warbnb6.jpeg',
          preview: true
        },
        {
          spotId: 7,
          url: '/warbnb7.jpeg',
          preview: true
        },
        {
          spotId: 8,
          url: '/warbnb8.jpeg',
          preview: true
        }
      ], { validate: true });

      console.log('Spot images seeded successfully.');
    } catch (error) {
      console.error('Error seeding spot images:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    console.log('Deleting seeded spot images...');

    try {
      await queryInterface.bulkDelete(options, {
        url: { [Op.in]: [
          '/warbnb1.jpeg',
          '/warbnb2.jpeg',
          '/warbnb3.jpeg',
          '/warbnb4.jpeg',
          '/warbnb5.jpeg',
          '/warbnb6.jpeg',
          '/warbnb7.jpeg',
          '/warbnb8.jpeg'
        ] }
      }, {});

      console.log('Spot images deleted successfully.');
    } catch (error) {
      console.error('Error deleting spot images:', error);
    }
  }
};
