'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Runs', [{
      run_distance: 12.6,
      user_user_id: 1,
      run_date: '2017-11-11'
    },
    {
      run_distance: 4.6,
      user_user_id: 1,
      run_date: '2017-11-12'
    },
    {
      run_distance: 3.3,
      user_user_id: 2,
      run_date: '2017-11-03'
    }], {})

  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Runs', null, {});
  }
};
