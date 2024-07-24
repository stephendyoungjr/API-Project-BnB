'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users';  // define your table name in options object
    console.log('Seeding users...');

    try {
      await User.bulkCreate([
        {
          email: 'demo@user.io',
          username: 'Demo-lition',
          firstName: 'Demo',
          lastName: 'Lition',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          email: 'user1@user.io',
          username: 'FakeUser1',
          firstName: 'Fake',
          lastName: 'User1',
          hashedPassword: bcrypt.hashSync('password2')
        },
        {
          email: 'user2@user.io',
          username: 'FakeUser2',
          firstName: 'Fake',
          lastName: 'User2',
          hashedPassword: bcrypt.hashSync('password3')
        }
      ], { validate: true });

      console.log('Users seeded successfully.');
    } catch (error) {
      console.error('Error seeding users:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';  // define your table name in options object
    const Op = Sequelize.Op;
    console.log('Deleting seeded users...');

    try {
      await queryInterface.bulkDelete(options, {
        username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
      }, {});

      console.log('Users deleted successfully.');
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  }
};
