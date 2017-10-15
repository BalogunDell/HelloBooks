const mockData = {

  // Valid user data
  user1: {
    firstname: 'user1FirstName',
    lastname: 'user1LastName',
    username: 'user1Username',
    email: 'user1Email@gmail.com',
    password: 'user1password',
    role: 'user',
    membership: 'bronze',
    image: 'image1'
  },

  adminData: {
    firstname: 'uadminFirstName',
    lastname: 'adminLastName',
    username: 'user1Username',
    email: 'adminEmail@gmail.com',
    password: 'adminpassword',
    role: 'admin',
    membership: 'bronze'
  },

  adminSigninData: {
    username: 'user1Username',
    password: 'adminpassword',
  },

  invaliduser1Login: {
    email: 'user1Email@gmail.com',
    password: 'user1password',
  },

  user1Login: {
    username: 'user1Username',
    password: 'user1password',
  },

  user1ConflictData: {
    firstname: 'user1FirstName',
    lastname: 'user1LastName',
    email: 'user1Email@gmail.com',
    password: 'user1password',
    role: 'user',
    membership: 'bronze'
  },

  user2: {
    firstname: 'user2FirstName',
    lastname: 'user2LastName',
    username: 'user2Username',
    email: 'user2Email@gmail.com',
    password: 'user2password',
    role: 'user',
    membership: 'silver'
  },

  user3: {
    firstname: 'user3FirstName',
    lastname: 'user3LastName',
    email: 'user3Email@gmail.com',
    username: 'user3Username',
    password: 'user3password',
    role: 'user',
    membership: 'gold'
  },

  adminLogin: {
    username: 'adminUsername',
    password: 'adminpassword'
  },


  // Inalid user data
  invalidUser1: {
    firstname: '',
    lastname: 'invaliduser1LastName',
    email: 'invaliduser1Email@gmail.com',
    password: 'user1password',
    role: 'user',
    membership: 'bronze'
  },

  invaliduser2: {
    firstname: 'invaliduser2FirstName',
    lastname: 'invaliduser2LastName',
    email: 'invaliduser2Email@gmail.com',
    password: 'invaliduser2password',
    role: 'user',
    membership: 'silver'
  },

  invaliduser3: {
    firstname: 'invaliduser3FirstName',
    lastname: 'invaliduser3LastName',
    email: 'invalidUser3Email@gmail.com',
    password: 'invaliduser3password',
    role: 'user',
    membership: 'gold'
  },

  invalidadmin: {
    email: 'invalidadminEmailgmail.com',
    password: 'invalidAdminpassword'
  },

  invaliduser: {
    username: '',
    password: ''
  },

  emptyCredence: {
    username: '',
    password: ''
  },

  bookdata: {
    isbn: '#7764',
    title: 'learn angular 4',
    author: 'Nelson Brook',
    pages: 123,
    year: 1977,
    description: 'the books does this and that',
    quantity: 32,
    category: 'Self Growth',
    image: 'images/andela.jpg'
  },

  invalidBookdata: {
    isbn: '#7764',
    title: '',
    author: 'Nelson Brook',
    pages: 123,
    year: 1977,
    description: 'the books does this and that',
    quantity: 32,
    category: 'Self Growth',
    image: 'images/andela.jpg'
  },

  invalidBookdata2: {
    isbn: '#7764',
    title: 'Abbey owns',
    author: 'Nelson Brook',
    pages: '',
    year: '',
    description: 'the books does this and that',
    quantity: 32,
    category: 'Self Growth',
    image: 'images/andela.jpg'
  },

  invalidBookdata3: {
    isbn: '11164',
    title: 'Abbey owns',
    author: 'Nelson Brook',
    pages: 123,
    year: 1768,
    description: '',
    quantity: '',
    category: 'Self Growth',
    image: 'images/andela.jpg'
  },

  invalidBookdata4: {
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

  borrowBookData: {
    userid: 1,
    bookid: 2
  },

  userID: {
    userid: 1
  }

};

export default mockData;
