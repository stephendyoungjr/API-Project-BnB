'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoSpotImages = [
  {
    spotId: 1,
    url: "/warbnb1.jpeg",
    preview: true
  },
  {
    spotId: 1,
    url: "/warbnb2.jpeg"
  },
  {
    spotId: 7,
    url: "/warbnb3.jpeg",
    preview: true
  },
  {
    spotId: 7,
    url: "/warbnb4.jpeg"
  },
  {
    spotId: 7,
    url: "/warbnb5.jpeg"
  },
  {
    spotId: 6,
    url: "/warbnb6.jpeg",
    preview: true
  },
  {
    spotId: 6,
    url: "/warbnb7.jpeg"
  },
  {
    spotId: 8,
    url: "/warbnb8.jpeg",
    preview: true
  },
  {
    spotId: 8,
    url: "/warbnb9.jpeg"
  },
  {
    spotId: 8,
    url: "/warbnb10.jpeg"
  },
  {
    spotId: 2,
    url: "/warbnb11.jpeg",
    preview: true
  },
  {
    spotId: 2,
    url: "/warbnb12.jpeg"
  },
  {
    spotId: 3,
    url: "/warbnb13.jpeg",
    preview: true
  },
  {
    spotId: 3,
    url: "/warbnb14.jpeg"
  },
  {
    spotId: 4,
    url: "/warbnb15.jpeg",
    preview: true
  },
  {
    spotId: 4,
    url: "/warbnb16.jpeg"
  },
  {
    spotId: 5,
    url: "/warbnb17.jpeg",
    preview: true
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await SpotImage.bulkCreate(demoSpotImages, {
        validate: true
      });
      console.log('Seeding SpotImages completed successfully.');
    } catch (error) {
      console.error('Seeding SpotImages failed:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    try {
      await queryInterface.bulkDelete(options, {
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
      }, {});
      console.log('Rollback of SpotImages seeder completed successfully.');
    } catch (error) {
      console.error('Rollback of SpotImages seeder failed:', error);
    }
  }
};
