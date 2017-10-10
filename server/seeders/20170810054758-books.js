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
        categoryid: 1,
        visibility: true,
        image: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book22_ase4mm.jpg',
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
        categoryid: 2,
        visibility: true,
        image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
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
        visibility: true,
        categoryid: 3,
        image: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book5_zyqyv1.jpg',
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
        categoryid: 4,
        visibility: true,
        image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book4_pfdh3s.jpg',
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
        categoryid: 5,
        visibility: true,
        image: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295977/book3_thj6nk.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: '#7769',
        title: 'Angular Relationships',
        author: 'Tom Cruise',
        pages: 210,
        year: 2009,
        description: 'Learn angular 2 and all of its basics with this wonderful book by Tom Cruise. Move from novice to professional in no time.',
        quantity: 5,
        categoryid: 6,
        visibility: true,
        image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295977/book1_mjwwlq.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { individualHooks: true });
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('books', null, {});
  }
};
