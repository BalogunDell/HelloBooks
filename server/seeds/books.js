const books = [
  {
    isbn: '#111111',
    title: 'learn angular 4',
    author: 'Nelson Brook',
    pages: 870,
    year: 2017,
    description: 'the books does this and that',
    quantity: 6,
    categoryid: 1,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },
  {
    isbn: '#111112',
    title: 'React for Beginners',
    author: 'Nelson Brook',
    pages: 1080,
    year: 2010,
    description: 'the books does this and that',
    quantity: 0,
    categoryid: 2,
    imageUrl: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book22_ase4mm.jpg',
    pdfUrl: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book22_ase4mm.jpg',

  },
  {
    isbn: '#111113',
    title: 'Tactical Analysis',
    author: 'Bill Gates',
    pages: 700,
    year: 2016,
    description: 'the books does this and that',
    quantity: 32,
    categoryid: 3,
    imageUrl: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book5_zyqyv1.jpg',
    pdfUrl: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book5_zyqyv1.jpg',
  },
  {
    isbn: '#111114',
    title: 'How to Workout',
    author: 'Michael Vazquez',
    pages: 123,
    year: 2014,
    description: 'the books does this and that',
    quantity: 15,
    categoryid: 4,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book4_pfdh3s.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book4_pfdh3s.jpg',

  },
  {
    isbn: '#111115',
    title: 'Building Relationships',
    author: 'Tom Cruise',
    pages: 300,
    year: 2017,
    description: 'the books does this and that',
    quantity: 5,
    categoryid: 5,
    imageUrl: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295977/book3_thj6nk.jpg',
    pdfUrl: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295977/book3_thj6nk.jpg',

  }
];

const invalidBooks = [
  {
    isbn: '#111116',
    title: 'learn angular 4',
    author: 'Nelson Brook',
    pages: 870,
    year: 2017,
    description: 'the books does this and that',
    quantity: 3,
    categoryid: '3',
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295977/book1_mjwwlq.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295977/book1_mjwwlq.jpg',

  },
  {
    isbn: '#111117s',
    title: '',
    author: 'Nelson Brook',
    pages: 870,
    year: 2017,
    description: 'the books does this and that',
    quantity: 6,
    categoryid: 2,
    imageUrl: 'images/andela.jpg',
    pdfUrl: 'pdf7'
  }
];

export default {
  books,
  invalidBooks
};

