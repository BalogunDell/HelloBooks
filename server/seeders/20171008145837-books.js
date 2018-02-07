module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Books', [
      {
        isbn: '#111111',
        title: 'React for Beginners',
        author: 'Nelson Brook',
        pages: 1080,
        year: 2010,
        description: 'the books does this and that',
        quantity: 3,
        categoryId: 1,
        visibility: true,
        imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
        PDFUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: '#111112',
        title: 'learn angular 4',
        author: 'Nelson Brook',
        pages: 870,
        year: 2017,
        description: 'the books does this and that',
        quantity: 2,
        categoryId: 6,
        visibility: true,
        imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book22_ase4mm.jpg',
        PDFUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book22_ase4mm.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: '#111113',
        title: 'Tactical Analysis',
        author: 'Bill Gates',
        pages: 700,
        year: 2016,
        description: 'the books does this and that',
        quantity: 32,
        visibility: true,
        categoryId: 3,
        imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book5_zyqyv1.jpg',
        PDFUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book5_zyqyv1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: '#111114',
        title: 'How to Workout',
        author: 'Michael Vazquez',
        pages: 123,
        year: 2014,
        description: 'the books does this and that',
        quantity: 15,
        categoryId: 4,
        visibility: true,
        imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book4_pfdh3s.jpg',
        PDFUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book4_pfdh3s.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: '#111115',
        title: 'Building Relationships',
        author: 'Tom Cruise',
        pages: 300,
        year: 2017,
        description: 'the books does this and that',
        quantity: 5,
        categoryId: 5,
        visibility: true,
        imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295977/book3_thj6nk.jpg',
        PDFUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295977/book3_thj6nk.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: '#111116',
        title: 'Angular Relationships',
        author: 'Tom Cruise',
        pages: 210,
        year: 2009,
        description: 'Learn angular 2 and all of its basics with this wonderful book by Tom Cruise. Move from novice to professional in no time.',
        quantity: 5,
        categoryId: 6,
        visibility: true,
        imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295977/book1_mjwwlq.jpg',
        PDFUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295977/book1_mjwwlq.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { individualHooks: true });
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
