const mockData = {

  // Valid user data
  user1: {
    firstname: 'janet',
    lastname: 'teddy',
    email: 'jane5@mail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  user1InvalidDataFirstname: {
    firstname: 1223,
    lastname: 'teddy',
    email: 'jane5@mail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  user1InvalidDataEmptyLastname: {
    firstname: 'George',
    lastname: '',
    email: 'jane5@mail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  user1InvalidDataDigitLastname: {
    firstname: 'George',
    lastname: 123,
    email: 'jane5@mail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },
  user1InvalidData: {
    firstname: 1223,
    lastname: 'teddy',
    email: 'jane5@mail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  user1IncompleteData: {
    firstname: 'shola',
    lastname: '',
    email: 'jane5@mail.com',
    username: '',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  user1IncompleteData2: {
    firstname: 'shola',
    lastname: 'Abbey',
    email: '',
    username: 'gsfgsf',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  user1IncompleteData3: {
    firstname: 'Shola',
    lastname: 'Abbey',
    email: 'dfdfgsfs',
    username: 'adwasadsg',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  user1IncompleteData4: {
    firstname: 'Shola',
    lastname: 'Abbey',
    email: 'deli@gmail.com',
    username: '',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  user1IncompleteData5: {
    firstname: 'Shola',
    lastname: 'Abbey',
    email: 'deli@gmail.com',
    username: 1234,
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  user1IncompleteData6: {
    firstname: 'Shola',
    lastname: 'Abbey',
    email: 'deli@gmail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },
  
  // empty password
  user1IncompleteData7: {
    firstname: 'Shola',
    lastname: 'Abbey',
    email: 'deli@gmail.com',
    username: 'mathew234',
    password: '',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  // too short password
  user1IncompleteData8: {
    firstname: 'Shola',
    lastname: 'Abbey',
    email: 'deli@gmail.com',
    username: 'mathew234',
    password: '123',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  // Valid user data
  userEdit: {
    firstname: 'Biodun',
    lastname: 'Olaoluwa',
    username: 'abbey33333'
  },

  borrowBookData: {
    bookid: 2
  },

  adminData: {
    firstname: 'uadminFirstName',
    lastname: 'adminLastName',
    username: 'userUsername123',
    email: 'adminEmail@gmail.com',
    password: 'adminpassword',
    role: 'admin',
    membership: 'bronze',
    image: 'image1'
  },

  adminSigninData: {
    username: 'adminUsername12',
    password: 'password',
  },

  category: {
    category: 'Test Category'
  },

  invaliduser1Login: {
    email: 'user1Email@gmail.com',
    password: 'user1password',
  },

  user1Login: {
    username: 'abbey33',
    password: 'abbey2',
  },

  user1InvalidLogin: {
    username: 'abbey6433',
    password: 'abbey24554',
  },

  user1ConflictData: {
    firstname: 'user1FirstName',
    lastname: 'user1LastName',
    email: 'user1Email@gmail.com',
    password: 'user1password',
    role: 'user',
    membership: 'bronze'
  },

  adminLogin: {
    username: 'user1Username123',
    password: 'adminpassword'
  },

  invalidadmin: {
    email: 'invalidadminEmailgmail.com',
    password: 'invalidAdminpassword'
  },


  bookdata: {
    isbn: '111111',
    title: 'React for Beginners',
    author: 'Nelson Brook',
    pages: 1080,
    year: 2010,
    description: 'the books does this and that',
    quantity: 3,
    categoryid: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  editBookdata: {
    id: 2,
    isbn: '439275',
    title: 'React for Beginners',
    author: 'Nelson Brook',
    pages: 100,
    year: 2000,
    description: 'the books does this and that',
    quantity: 300,
    categoryid: 5,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  //  Invalid book data isbn
  invalidBookdata1: {
    isbn: '',
    title: 'React for Beginners',
    author: 'Nelson Brook',
    pages: 1080,
    year: 2010,
    description: 'the books does this and that',
    quantity: 3,
    categoryid: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  //  Invalid book data title
  invalidBookdata2: {
    isbn: 123456,
    title: '',
    author: 'Nelson Brook',
    pages: 1080,
    year: 2010,
    description: 'the books does this and that',
    quantity: 3,
    categoryid: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  // Invalid book data author
  invalidBookdata3: {
    isbn: 123456,
    title: 'React for beginners',
    author: '',
    pages: 1080,
    year: 2010,
    description: 'the books does this and that',
    quantity: 3,
    categoryid: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  // Invalid book data pages
  invalidBookdata4: {
    isbn: 123456,
    title: 'React for beginners',
    author: '',
    pages: '',
    year: 2010,
    description: 'the books does this and that',
    quantity: 3,
    categoryid: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  // Invalid book data pages
  invalidBookdata5: {
    isbn: 123456,
    title: 'React for beginners',
    author: 'Dennis',
    pages: 1223,
    year: '',
    description: 'the books does this and that',
    quantity: 3,
    categoryid: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },
  invalidBookdata: {
    isbn: '11164',
    title: 'Abbey owns',
    author: 'Nelson Brook',
    pages: 123,
    year: 1768,
    description: 'The description of the book',
    quantity: 100,
    category: 'Self Growth',
    image: 'images/andela.jpg'
  },

  borrowBook: {
    userid: 1,
    bookid: 1
  },

  failborrowBook: {
    userid: '',
    bookid: ''
  },

  modifyBookData: {
    bookid: 1,
    title: 'Challenges of a bootcamper',
    author: 'Donald Lawrence',
    pages: 453,
    year: 2000,
    description: 'Talks about Andela Bootcamp',
    quantity: 32,
    category: 'Self Growth',
    image: 'images/andela.jpg'
  },

  userID: {
    userid: 1
  }

};

export default mockData;
