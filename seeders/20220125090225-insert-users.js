'use strict';

const generateUser = key => ({
  first_name: `John${key+1}`,
  last_name:`Snow${key+1}`,
  email: `email${key+1}@gmai.com`,
  password_hash: 'John123',
  birthday: new Date(1950,0,key*10),
  is_male: Math.random()>0.5,
  created_at: new Date(),
  updated_at: new Date()
})

const generateUsers = (amound=50) => {
  return new Array(amound).fill(null).map((_, i) => generateUser(i))
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', generateUsers(70), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
