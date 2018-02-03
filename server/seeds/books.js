const books = [
  {
    isbn: '#111111',
    title: 'learn angular 4',
    author: 'Nelson Brook',
    pages: 870,
    year: 2017,
    description: 'the books does this and that',
    quantity: 6,
    categoryId: 1,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    PDFUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },
  {
    isbn: '#111112',
    title: 'React for Beginners',
    author: 'Nelson Brook',
    pages: 1080,
    year: 2010,
    description: 'the books does this and that',
    quantity: 0,
    categoryId: 2,
    imageUrl: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book22_ase4mm.jpg',
    PDFUrl: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book22_ase4mm.jpg',

  },
  {
    isbn: '#111113',
    title: 'Tactical Analysis',
    author: 'Bill Gates',
    pages: 700,
    year: 2016,
    description: 'the books does this and that',
    quantity: 32,
    categoryId: 3,
    imageUrl: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book5_zyqyv1.jpg',
    PDFUrl: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book5_zyqyv1.jpg',
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
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book4_pfdh3s.jpg',
    PDFUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book4_pfdh3s.jpg',

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
    imageUrl: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295977/book3_thj6nk.jpg',
    PDFUrl: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295977/book3_thj6nk.jpg',

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
    categoryId: 6,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295977/book1_mjwwlq.jpg',
    PDFUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295977/book1_mjwwlq.jpg',

  },
  {
    isbn: '#111117',
    title: '',
    author: 'Nelson Brook',
    pages: 870,
    year: 2017,
    description: 'the books does this and that',
    quantity: 6,
    categoryId: 2,
    imageUrl: 'images/andela.jpg',
    PDFUrl: 'pdf7'
  }
];

export default {
  books,
  invalidBooks
};

