'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoReviewImages = [
  {
    reviewId: 1,
    url: "backend/reviewphotos/1.jpeg"
  },
  {
    reviewId: 2,
    url: "backend/reviewphotos/2.jpeg"
  },
  {
    reviewId: 3,
    url: "backend/reviewphotos/3.jpeg"
  },
  {
    reviewId: 3,
    url: "backend/reviewphotos/4.jpeg"
  },
  {
    reviewId: 4,
    url: "backend/reviewphotos/5.jpeg"
  },
  {
    reviewId: 5,
    url: "backend/reviewphotos/6.jpeg"
  },
  {
    reviewId: 6,
    url: "backend/reviewphotos/7.jpeg"
  },
  {
    reviewId: 7,
    url: "backend/reviewphotos/8.jpeg"
  },
  {
    reviewId: 8,
    url: "backend/reviewphotos/9.jpeg"
  },
  {
    reviewId: 8,
    url: "backend/reviewphotos/10.jpeg"
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(demoReviewImages, {
      validate: true
    });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
    }, {});
  }
};
