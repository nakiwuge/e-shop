'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('Users', 'isSuperAdmin', {
        type: Sequelize.BOOLEAN,
        after: 'password',
        defaultValue: false
      });
      await queryInterface.addColumn('Users', 'isAdmin', {
        type: Sequelize.BOOLEAN,
        after: 'isSuperAdmin',
        defaultValue: false
      });

      await queryInterface.addColumn('Users', 'isSeller', {
        type: Sequelize.BOOLEAN,
        after: 'isAdmin',
        defaultValue: false
      });

      await queryInterface.addColumn('Users', 'isBuyer', {
        type: Sequelize.BOOLEAN,
        after: 'isSeller',
        defaultValue: false
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Users', 'isSuperAdmin');
      await queryInterface.removeColumn('Users', 'isAdmin');
      await queryInterface.removeColumn('Users', 'isSeller');
      await queryInterface.removeColumn('Users', 'isBuyer');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
