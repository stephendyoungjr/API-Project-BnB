'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    console.log('Seeding spots...');

    try {
      await Spot.bulkCreate([
        {
          ownerId: 1,
          address: '1 Enchanted Path',
          city: 'Rivendell',
          state: 'Eriador',
          country: 'Middle-earth',
          lat: 34.0522,
          lng: -118.2437,
          name: 'Elven Retreat',
          description: 'Nestled among the lush valleys, this Elven Retreat offers tranquility and breathtaking views of the surrounding enchanted forests.',
          price: 200
        },
        {
          ownerId: 2,
          address: '45 Dragonfire Road',
          city: 'Dragonstone',
          state: 'Westeros',
          country: 'The Seven Kingdoms',
          lat: 51.5074,
          lng: -0.1278,
          name: 'Dragonstone Keep',
          description: 'Stay in the heart of Dragonstone, with expansive views of the ocean and a rich history that dates back to the Targaryens.',
          price: 300
        },
        {
          ownerId: 3,
          address: '99 Sandstone Cliffs',
          city: 'Dorne',
          state: 'Westeros',
          country: 'The Seven Kingdoms',
          lat: 36.7783,
          lng: -119.4179,
          name: 'Sunspear Fortress',
          description: 'This ancient fortress offers a unique blend of sun, sand, and history, located on the southernmost tip of Westeros.',
          price: 250
        },
        {
          ownerId: 4,
          address: '88 Dreadfort Road',
          city: 'Winterfell',
          state: 'The North',
          country: 'The Seven Kingdoms',
          lat: 64.2008,
          lng: -149.4937,
          name: 'Northern Stronghold',
          description: 'A stay in the North is not complete without visiting this sturdy stronghold, known for its resilience against harsh winters.',
          price: 220
        },
        {
          ownerId: 5,
          address: '22 Misty Falls',
          city: 'Lothlórien',
          state: 'The Golden Wood',
          country: 'Middle-earth',
          lat: 46.2276,
          lng: 2.2137,
          name: 'Galadriel’s Sanctuary',
          description: 'Located within the enchanting forests of Lothlórien, this sanctuary offers a serene and magical experience.',
          price: 280
        },
        {
          ownerId: 6,
          address: '77 Shadowy Peak',
          city: 'Mordor',
          state: 'The Black Land',
          country: 'Middle-earth',
          lat: 36.7783,
          lng: -119.4179,
          name: 'Dark Tower Refuge',
          description: 'For the adventurous traveler, experience a night within sight of the dark peaks of Mordor, with ominous but unforgettable surroundings.',
          price: 180
        },
        {
          ownerId: 7,
          address: '15 Crystal Lake',
          city: 'Hyrule',
          state: 'Kingdom of Hyrule',
          country: 'The Realm of Hyrule',
          lat: 35.6895,
          lng: 139.6917,
          name: 'Lake Hylia Retreat',
          description: 'Enjoy a peaceful stay on the shores of Lake Hylia, with crystal-clear waters and enchanting natural beauty.',
          price: 240
        },
        {
          ownerId: 8,
          address: '101 Moonlit Hills',
          city: 'Cair Paravel',
          state: 'Narnia',
          country: 'The Kingdom of Narnia',
          lat: 55.3781,
          lng: -3.4360,
          name: 'Narnian Palace',
          description: 'A majestic palace perched on the hills, offering stunning views and a taste of royalty in the land of Narnia.',
          price: 260
        }
      ], { validate: true });

      console.log('Spots seeded successfully.');
    } catch (error) {
      console.error('Error seeding spots:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    console.log('Deleting seeded spots...');

    try {
      await queryInterface.bulkDelete(options, {
        address: { [Op.in]: ['1 Enchanted Path', '45 Dragonfire Road', '99 Sandstone Cliffs', '88 Dreadfort Road', '22 Misty Falls', '77 Shadowy Peak', '15 Crystal Lake', '101 Moonlit Hills'] }
      }, {});

      console.log('Spots deleted successfully.');
    } catch (error) {
      console.error('Error deleting spots:', error);
    }
  }
};
