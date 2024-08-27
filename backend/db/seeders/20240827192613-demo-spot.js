'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoSpots = [
  {
    "ownerId": 1,
    "address": "1500 Mossy Hollow",
    "city": "Everwood",
    "state": "Elder Grove",
    "country": "Eldoria",
    "lat": 42.5301,
    "lng": -76.4663,
    "name": "Enchanted Cottage",
    "description": "A magical cottage nestled in the heart of Everwood, surrounded by ancient trees and glowing flora. Ideal for those seeking solitude and the whispers of the forest.",
    "price": 200
  },
  {
    "ownerId": 3,
    "address": "7 Forgefire Way",
    "city": "Emberforge",
    "state": "Ironclad Highlands",
    "country": "Vulcar",
    "lat": 42.9408,
    "lng": -78.8655,
    "name": "Forgefire Hall",
    "description": "A grand hall with an ever-burning hearth, perfect for warriors and blacksmiths. The warmth and glow of the forge create an inviting atmosphere for travelers.",
    "price": 300
  },
  {
    "ownerId": 5,
    "address": "8 Obsidian Peak",
    "city": "Drakenspire",
    "state": "Ashen Wastes",
    "country": "Drakor",
    "lat": 40.7128,
    "lng": -74.006,
    "name": "Drakenspire Fortress",
    "description": "An imposing fortress carved into the black rock of Obsidian Peak. Once home to ancient dragonlords, now a haven for adventurers and scholars of the arcane.",
    "price": 500
  },

  {
    "ownerId": 1,
    "address": "10 Ashen Valley",
    "city": "Cinderhold",
    "state": "Scorched Plains",
    "country": "Emberfall",
    "lat": 53.3498,
    "lng": -6.2603,
    "name": "Cinderhold Encampment",
    "description": "A rugged encampment set amidst the smoldering remains of ancient battles. Perfect for those who thrive in the harsh and unforgiving landscape of the Scorched Plains.",
    "price": 150
  },
  {
    "ownerId": 9,
    "address": "11 Moonshadow Glade",
    "city": "Silverstream",
    "state": "Verdant Vale",
    "country": "Sylvara",
    "lat": 45.5017,
    "lng": -73.5673,
    "name": "Silverstream Sanctuary",
    "description": "A serene sanctuary by the cascading waters of Silverstream Falls. Ideal for meditation, reflection, and communion with nature.",
    "price": 250
  },
  {
    "ownerId": 8,
    "address": "4 Wolfsbane Hollow",
    "city": "Nightfall",
    "state": "Shadewood",
    "country": "Lunaris",
    "lat": 37.7749,
    "lng": -122.4194,
    "name": "Wolfsbane Manor",
    "description": "A mysterious manor hidden deep within the shadowy woods of Nightfall. Rumored to be haunted, it offers a perfect retreat for those seeking the thrill of the unknown.",
    "price": 180
  },
  {
    "ownerId": 4,
    "address": "1300 Frostfire Summit",
    "city": "Frostpeak",
    "state": "Glacier Heights",
    "country": "Nordheim",
    "lat": 53.505,
    "lng": -2.217,
    "name": "Frostfire Keep",
    "description": "A towering keep perched high on Frostfire Summit. With sweeping views of the icy tundra, this stronghold offers both protection and a majestic panorama.",
    "price": 400
  },
  {
    "ownerId": 5,
    "address": "6 Shadowspire Terrace",
    "city": "Shadowspire",
    "state": "Gloomshade",
    "country": "Nyxara",
    "lat": 39.9042,
    "lng": 116.4074,
    "name": "Shadowspire Bastion",
    "description": "An enigmatic bastion enveloped in eternal twilight. This fortress is known for its otherworldly beauty and the strange, haunting melodies that drift through the halls.",
    "price": 350
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(demoSpots, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      country: 'Eldoria'
    }, {});
  }
};
