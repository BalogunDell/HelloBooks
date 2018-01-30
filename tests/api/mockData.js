const mockData = {

  // Valid user data
  user1: {
    firstname: 'janet',
    lastname: 'teddy',
    email: 'jane5@mail.com',
    username: 'abbey',
    password: 'abbey2',
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

  user1InvalidDataFirstnameEmpty: {
    firstname: '',
    lastname: 'teddy',
    email: 'jane5@mail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  user1InvalidDataFirstnamellength: {
    firstname: 'r',
    lastname: 'teddy',
    email: 'jane5@mail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  user1InvalidDataLastnamellength: {
    firstname: 'rfwdf',
    lastname: 'y',
    email: 'jane5@mail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  user1InvalidDataNoEmail: {
    firstname: 'rfwdf',
    lastname: 'ydfdfd',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  user1InvalidEmail: {
    firstname: 'Ola',
    lastname: 'teddy',
    email: 'janemail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  user1EmptyEmail: {
    firstname: 'Ola',
    lastname: 'teddy',
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

  user1InvalidDataLastnameLen: {
    firstname: 'George',
    lastname:'r',
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

  user1IncompleteDataMissingUsername: {
    firstname: 'Shola',
    lastname: 'Abbey',
    email: 'deli@gmail.com',
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
    username: 'adminusername',
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


  user1IncompleteDataMissingPass: {
    firstname: 'Shola',
    lastname: 'Abbey',
    email: 'deli@gmail.com',
    username: 'mathew234',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  // Valid user data
  userEdit: {
    firstname: 'janet',
    lastname: 'teddy',
    email: 'jane@mail.com',
    username: 'abbey3',
    imageUrl: 'gsvdgb',
  },

  


  BadUserEditData: {
    firstname: '',
    lastname: 'Olaoluwa',
    username: 'abbey33333'
  },

  BadUserEditDataDS: {
    firstname: '',
    lastname: 'Olaoluwa',
    username: 'abbey33333'
  },


  BadUserEditDataD6: {
    firstname: 'fdf',
    lastname: 'Olaoluwa',
    username: 'abbey33'
  },


  borrowBookData: {
    bookId: 2
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
    username: 'adminusername',
    password: 'password',
  },

  Category: {
    category: 'Test Category'
  },

  invaliduser1Login: {
    email: 'user1Email@gmail.com',
    password: 'user1password',
  },

  user1Login: {
    username: 'abbey',
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
    isbn: 545674,
    title: 'React for Beginners',
    author: 'Nelson Brook',
    pages: 1080,
    year: 2010,
    description: 'the books does this and that',
    quantity: 3,
    categoryId: 2,
    visibility: true,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  editBookdata: {
    id: 3,
    isbn: '439275',
    title: 'React for Beginners',
    author: 'Nelson Brook',
    pages: 100,
    year: 2000,
    description: 'the books does this and that',
    quantity: 300,
    categoryId: 5,
    visibility: true,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  foundBook: {
    id: 3,
     isbn: '#111113',
     pages: 700,
     author: 'Bill Gates',
     year: 2016,
     title: 'Tactical Analysis',
     description: 'the books does this and that',
     quantity: 32,
     categoryId: 3,
     visibility: true,
     imageUrl: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book5_zyqyv1.jpg',
     pdfUrl: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book5_zyqyv1.jpg',
     createdAt: '2018-01-29T19:01:15.413Z',
     updatedAt: '2018-01-29T19:01:15.413Z'
  },

  editBookdataAuthorError: {
    id: 2,
    title: 'React for Beginners',
    author: '',
    pages: 100,
    year: 2000,
    description: 'the books does this and that',
    quantity: 300,
    categoryId: 5,
    visibility: true,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  editBookdataAuthorformat: {
    id: 2,
    title: 'React for Beginners',
    author: 'gf   dfgf  df',
    pages: 100,
    year: 2000,
    description: 'the books does this and that',
    quantity: 300,
    categoryId: 5,
    visibility: true,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  editBookdataTitleError: {
    id: 2,
    title: '',
    author: 'Test Author',
    pages: 100,
    year: 2000,
    description: 'the books does this and that',
    quantity: 300,
    categoryId: 5,
    visibility: true,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  editBookdataPageError: {
    id: 2,
    title: 'Test Title',
    author: 'Test Author',
    pages: '',
    year: 2000,
    description: 'the books does this and that',
    quantity: 300,
    categoryId: 5,
    visibility: true,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  editBookdataYearError: {
    id: 2,
    title: 'Test Title',
    author: 'Test Author',
    pages: 4039,
    year: '',
    description: 'the books does this and that',
    quantity: 300,
    categoryId: 5,
    visibility: true,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  editBookdataDescriptionError: {
    id: 2,
    title: 'Test Title',
    author: 'Test Author',
    pages: 4039,
    year: 5634,
    description: '',
    quantity: 300,
    categoryId: 5,
    visibility: true,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  editBookdataDescriptionFormat: {
    id: 2,
    title: 'Test Title',
    author: 'Test Author',
    pages: 4039,
    year: 5634,
    description: 'gdf  dgdg  gdfg  ',
    quantity: 300,
    categoryId: 5,
    visibility: true,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  editBookdataQty: {
    id: 2,
    title: 'Test Title',
    author: 'Test Author',
    pages: 4039,
    year: 5634,
    description: 'gdgdggdfg',
    quantity: '',
    categoryId: 5,
    visibility: true,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  editBookdataImageUrlFormatError: {
    id: 2,
    title: 'Test Title',
    author: 'Test Abbey',
    pages: 4039,
    year: 5634,
    description: 'gdgdggdfg',
    quantity: 56,
    categoryId: 5,
    visibility: true,
    imageUrl: 'https:/ /res.cloudina  ry.com/djvjx p2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  editBookdataPdfUrlFormatError: {
    id: 2,
    title: 'Test Title',
    author: 'Test Ola',
    pages: 4039,
    year: 5634,
    description: 'gdgdggdfg',
    quantity: 56,
    categoryId: 5,
    visibility: true,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudin  ary.com/djv jxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  editBookdataYearlengthError: {
    id: 2,
    title: 'Testitle',
    author: 'Test Author',
    pages: 4039,
    year: 997347,
    description: 'the books does this and that',
    quantity: 300,
    categoryId: 5,
    visibility: true,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  editBookdata2: {
    id: 2,
    title: 'React for Beginners',
    author: 'Nelson Brook',
    pages: 100,
    year: 2000,
    description: 'the books does this and that',
    quantity: 300,
    categoryId: 5,
    visibility: true,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
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
    categoryId: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },


   //  Invalid book data isbn
   invalidBookdata2: {
    isbn: 545545,
    title: '',
    author: 'Nelson Brook',
    pages: 1080,
    year: 2010,
    description: 'the books does this and that',
    quantity: 3,
    categoryId: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  //  Invalid book data title
  invalidBookdataTheee: {
    isbn: '' ,
    title: 'dffdsfdg',
    author: 'Nelson Brook',
    pages: 1080,
    year: 2010,
    description: 'the books does this and that',
    quantity: 3,
    categoryId: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  invalidBookdataInvalidAuthor: {
    isbn: 123456,
    title: 'rgergerg',
    author: 'rrtrt     ttttt',
    pages: 1080,
    year: 2010,
    description: 'the books does this and that',
    quantity: 3,
    categoryId: 2,
    visibility: true,
    imageUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdfUrl: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  invalidBookdataInvalidIsbn: {
    isbn: 1456,
    title: '',
    author: 'Nelson Brook',
    pages: 1080,
    year: 2010,
    description: 'the books does this and that',
    quantity: 3,
    categoryId: 2,
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
    categoryId: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  // Invalid book data pages
  invalidBookdata4: {
    isbn: 123456,
    title: 'React for beginners',
    author: 'sdgsdgs',
    pages: '',
    year: 2010,
    description: 'the books does this and that',
    quantity: 3,
    categoryId: 2,
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
    categoryId: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  invalidBookdataYearLength: {
    isbn: 123456,
    title: 'React for beginners',
    author: 'Dennis',
    pages: 1223,
    year: '9999999999',
    description: 'the books does this and that',
    quantity: 3,
    categoryId: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  tooManySpaceDescription: {
    isbn: 123456,
    title: 'React for beginners',
    author: 'Dennis',
    pages: 1223,
    year: 6775,
    description: 'ffe   erefdf  dfef  ',
    quantity: 3,
    categoryId: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  emptyDescription: {
    isbn: 123456,
    title: 'React for beginners',
    author: 'Dennis',
    pages: 1223,
    year: 6775,
    description: '',
    quantity: 3,
    categoryId: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  emptyQty: {
    isbn: 123456,
    title: 'React for beginners',
    author: 'Dennis',
    pages: 1223,
    year: 6775,
    description: 'sffgfgsfg sfd',
    quantity: '',
    categoryId: 2,
    visibility: true,
    image: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  emptyImageUrl: {
    isbn: 123456,
    title: 'React for beginners',
    author: 'Dennis',
    pages: 1223,
    year: 6775,
    description: 'sffgfgsfg',
    quantity: 3,
    categoryId: 2,
    visibility: true,
    imageUrl: '',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },

  invalidImageUrl: {
    isbn: 123456,
    title: 'React for beginners',
    author: 'Dennis',
    pages: 1223,
    year: 6775,
    description: 'sffgfgsfg',
    quantity: 3,
    categoryId: 2,
    visibility: true,
    imageUrl: 'fdfd   dfdfdf   ddff',
    pdf: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg',
  },
 
  emptyPdfUrl: {
    isbn: 123456,
    title: 'React for beginners',
    author: 'Dennis',
    pages: 1223,
    year: 6775,
    description: 'sffgfgsfg',
    quantity: 3,
    categoryId: 2,
    visibility: true,
    imageUrl: 'fdfddfdfdfddff',
    pdfUrl: '',
  },

  invalidPdfUrl: {
    isbn: 123456,
    title: 'React for beginners',
    author: 'Dennis',
    pages: 1223,
    year: 6775,
    description: 'sffgfgsfg',
    quantity: 3,
    categoryId: 2,
    visibility: true,
    imageUrl: 'fdfdddff',
    pdfUrl: 'fdfd  dfdfdf  ddff',
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
    userId: 1,
    bookId: 1
  },

  failborrowBook: {
    userId: '',
    bookId: ''
  },

  modifyBookData: {
    bookId: 1,
    title: 'Challenges of a bootcamper',
    author: 'Donald Lawrence',
    pages: 453,
    year: 2000,
    description: 'Talks about Andela Bootcamp',
    quantity: 32,
    category: 'Self Growth',
    imageUrl: 'images/andela.jpg'
  },

  userID: {
    userId: 1
  }

};

export default mockData;
