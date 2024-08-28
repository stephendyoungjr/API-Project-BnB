'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoSpotImages = [
  {
    spotId: 1,
    url: "backend/spotphotos/warbnb1.jpeg",
    preview: true
  },
  {
    spotId: 1,
    url: "backend/spotphotos/warbnb2.jpeg"
  },
  {
    spotId: 7,
    url: "backend/spotphotos/warbnb3.jpeg",
    preview: true
  },
  {
    spotId: 7,
    url: "backend/spotphotos/warbnb4.jpeg"
  },
  {
    spotId: 7,
    url: "backend/spotphotos/warbnb5.jpeg"
  },
  {
    spotId: 6,
    url: "backend/spotphotos/warbnb6.jpeg",
    preview: true
  },
  {
    spotId: 6,
    url: "backend/spotphotos/warbnb7.jpeg"
  },
  {
    spotId: 8,
    url: "backend/spotphotos/warbnb8.jpeg",
    preview: true
  },
  {
    spotId: 8,
    url: "backend/spotphotos/warbnb9.jpeg"
  },
  {
    spotId: 8,
    url: "backend/spotphotos/warbnb10.jpeg"
  },
  {
    spotId: 2,
    url: "backend/spotphotos/warbnb11.jpeg",
    preview: true
  },
  {
    spotId: 2,
    url: "backend/spotphotos/warbnb12.jpeg"
  },
  {
    spotId: 3,
    url: "backend/spotphotos/warbnb13.jpeg",
    preview: true
  },
  {
    spotId: 3,
    url: "backend/spotphotos/warbnb14.jpeg"
  },
  {
    spotId: 4,
    url: "backend/spotphotos/warbnb15.jpeg",
    preview: true
  },
  {
    spotId: 4,
    url: "backend/spotphotos/warbnb16.jpeg"
  },
  {
    spotId: 5,
    url: "backend/spotphotos/warbnb17.jpeg",
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
