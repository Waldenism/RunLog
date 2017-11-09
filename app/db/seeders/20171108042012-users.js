var bcrypt = require('bcrypt');

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.bulkInsert('Users', [{
      user_name: "Test User",
      user_alias: "test",
      user_email: "test@test.com",
      password_hash: bcrypt.hashSync("test", 10)
    },
    {
      user_name: "Test User 2",
      user_alias: "test2",
      user_email: "test2@test.com",
      password_hash: bcrypt.hashSync("test", 10)
    }], {})

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});
  }
};
