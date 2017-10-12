module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('categories', [
      {
        id: 1,
        category: 'Health'
      },
      {
        id: 2,
        category: 'Education',
      },

      {
        id: 3,
        category: 'Social',
      },

      {
        id: 4,
        category: 'Programming',
      },
      {
        id: 5,
        category: 'Comic',
      },

      {
        id: 6,
        category: 'Business',
      },
  
    ]);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('category', null, {});
  }
};
