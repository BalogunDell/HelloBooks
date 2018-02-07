module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Categories', [
      {
        category: 'Health'
      },
      {
        category: 'Education',
      },

      {
        category: 'Social',
      },

      {
        category: 'Programming',
      },
      {
        category: 'Comic',
      },

      {
        category: 'Business',
      },
  
    ]);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
