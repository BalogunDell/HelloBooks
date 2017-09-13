module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('books', [
      {
        isbn: '#7764',
        title: 'learn angular 4',
        author: 'Nelson Brook',
        pages: 870,
        year: 2017,
        description: 'the books does this and that',
        quantity: 6,
        category: 'programming',
        categoryid: 1,
        image: 'images/andela.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: '#7765',
        title: 'React for Beginners',
        author: 'Nelson Brook',
        pages: 1080,
        year: 2010,
        description: 'the books does this and that',
        quantity: 3,
        category: 'programming',
        categoryid: 2,
        image: 'images/andela.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: '#7766',
        title: 'Tactical Analysis',
        author: 'Bill Gates',
        pages: 700,
        year: 2016,
        description: 'the books does this and that',
        quantity: 32,
        category: 'business',
        categoryid: 3,
        image: 'images/andela.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: '#7767',
        title: 'How to Workout',
        author: 'Michael Vazquez',
        pages: 123,
        year: 2014,
        description: 'the books does this and that',
        quantity: 15,
        category: 'health',
        categoryid: 4,
        image: 'images/andela.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: '#7768',
        title: 'Building Relationships',
        author: 'Tom Cruise',
        pages: 300,
        year: 2017,
        description: 'the books does this and that',
        quantity: 5,
        category: 'social',
        categoryid: 5,
        image: 'images/andela.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], { individualHooks: true });
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
