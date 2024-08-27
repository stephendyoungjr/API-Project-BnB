'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoUsers = [
  {
    "firstName": "Thalor",
    "lastName": "Stormblade",
    "email": "thalor.stormblade@elvenrealm.com",
    "username": "ElvenWarrior",
    hashedPassword: bcrypt.hashSync("stormblade456")
  },
  {
    "firstName": "Lyra",
    "lastName": "Moonshadow",
    "email": "lyra.moonshadow@duskwood.org",
    "username": "NightshadeMystic",
    hashedPassword: bcrypt.hashSync("shadowmagic999")
  },
  {
    "firstName": "Baldric",
    "lastName": "Ironfist",
    "email": "baldric.ironfist@dwarvenfortress.net",
    "username": "IronFistChampion",
    hashedPassword: bcrypt.hashSync("hammerstrike123")
  },
  {
    "firstName": "Seraphine",
    "lastName": "Brightstar",
    "email": "seraphine.brightstar@celestialorder.com",
    "username": "LightBearer",
    hashedPassword: bcrypt.hashSync("celestial777")
  },
  {
    "firstName": "Eldric",
    "lastName": "Flameheart",
    "email": "eldric.flameheart@dragonspire.imperium",
    "username": "DragonSorcerer",
    hashedPassword: bcrypt.hashSync("dragonfire456")
  },
  {
    "firstName": "Arwen",
    "lastName": "Silverleaf",
    "email": "arwen.silverleaf@foresthaven.com",
    "username": "WoodlandNightingale",
    hashedPassword: bcrypt.hashSync("forestmelody")
  },
  {
    firstName: "Isolde",
    lastName: "Ravenshade",
    email: "isolde.ravenshade@shadowfell.com",
    username: "DarkAmbassador",
    hashedPassword: bcrypt.hashSync("shadowdiplomacy123")
  },
  {
    "firstName": "Fenrir",
    "lastName": "Bloodfang",
    "email": "fenrir.bloodfang@lycanthrope.com",
    "username": "WolfApostate",
    "hashedPassword": bcrypt.hashSync("moonhunter123")
  },
  {
    "firstName": "Morgana",
    "lastName": "Darkweaver",
    "email": "morgana.darkweaver@example.com",
    "username": "ArcaneEnchanter",
    "hashedPassword": bcrypt.hashSync("arcaneenvy666")
  },
  {
    "firstName": "Gorak",
    "lastName": "Stonecrusher",
    "email": "gorak.stonecrusher@orcstronghold.qun",
    "username": "OrcChieftain",
    "hashedPassword": bcrypt.hashSync("strongestWarrior123")
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate(demoUsers, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ["ElvenWarrior", "NightshadeMystic", "IronFistChampion", "LightBearer", "DragonSorcerer", 'WoodlandNightingale', 'DarkAmbassador', 'WolfApostate', 'ArcaneEnchanter', 'OrcChieftain' ] }
    }, {});
  }
};
