'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      email: 'aye@gmail.com',
      firstName: 'aye',
      lastName: 'mak',
      password: '$2b$10$hOFB9jEtaodu/.PX2jNnXOJUV/2KgIMnty56Dc.H3CPxcSfQiXRkG',
      isSuperAdmin: true,
      isAdmin: false,
      isSeller: false,
      isBuyer: false,
      createdAt: '2019-05-10T16:12:17.819Z',
      updatedAt: '2019-05-12T19:09:40.506Z'
    }], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
