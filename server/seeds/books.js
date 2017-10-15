const books = [
  {
    isbn: '#7764',
    title: 'learn angular 4',
    author: 'Nelson Brook',
    pages: 870,
    year: 2017,
    description: 'the books does this and that',
    quantity: 6,
    categoryid: 1,
    image: 'images/andela.jpg',
    pdf: 'pdf2'
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
    image: 'images/andela.jpg',
    pdf: 'pdf1'
  },
  {
    isbn: '#7766',
    title: 'Tactical Analysis',
    author: 'Bill Gates',
    pages: 700,
    year: 2016,
    description: 'the books does this and that',
    quantity: 32,
    categoryid: 3,
    image: 'images/andela.jpg',
    pdf: 'pdf3'
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
    image: 'images/andela.jpg',
    pdf: 'pdf4'
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
    image: 'images/andela.jpg',
    pdf: 'pdf5'
  }
];

const invalidBooks = [
  {
    isbn: '#7764',
    title: 'learn angular 4',
    author: 'Nelson Brook',
    pages: 870,
    year: 2017,
    description: 'the books does this and that',
    quantity: 6,
    categoryid: '3',
    image: 'images/andela.jpg',
    pdf: 'pdf6'
  },
  {
    isbn: '#7780',
    title: '',
    author: 'Nelson Brook',
    pages: 870,
    year: 2017,
    description: 'the books does this and that',
    quantity: 6,
    categoryid: 2,
    image: 'images/andela.jpg',
    pdf: 'pdf7'
  }
];

export default {
  books,
  invalidBooks
};

