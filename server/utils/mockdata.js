const mockData = {

  // Valid user data
  user1: {
    firstname: 'user1FirstName',
    lastname: 'user1LastName',
    email: 'user1Email',
    password: 'user1password',
    role: 'user',
    membership: 'bronze'
  },

  adminData: {
    firstname: 'uadminFirstName',
    lastname: 'adminLastName',
    email: 'adminEmail',
    password: 'adminpassword',
    role: 'admin',
    membership: 'bronze'
  },

  invaliduser1Login: {
    email: 'user1Email',
    password: 'user1password',
  },

  user1Login: {
    email: 'user1Email',
    password: 'user1password',
  },

  user1ConflictData: {
    firstname: 'user1FirstName',
    lastname: 'user1LastName',
    email: 'user1Email',
    password: 'user1password',
    role: 'user',
    membership: 'bronze'
  },

  user2: {
    firstname: 'user2FirstName',
    lastname: 'user2LastName',
    email: 'user2Email',
    password: 'user2password',
    role: 'user',
    membership: 'silver'
  },

  user3: {
    firstname: 'user3FirstName',
    lastname: 'user3LastName',
    email: 'user3Email',
    password: 'user3password',
    role: 'user',
    membership: 'gold'
  },

  adminLogin: {
    email: 'adminEmail',
    password: 'adminpassword'
  },


  // Inalid user data
  invalidUser1: {
    firstname: '',
    lastname: 'invaliduser1LastName',
    email: 'invaliduser1Email',
    password: 'user1password',
    role: 'user',
    membership: 'bronze'
  },

  invaliduser2: {
    firstname: 'invaliduser2FirstName',
    lastname: 'invaliduser2LastName',
    email: 'invaliduser2Email',
    password: 'invaliduser2password',
    role: 'user',
    membership: 'silver'
  },

  invaliduser3: {
    firstname: 'invaliduser3FirstName',
    lastname: 'invaliduser3LastName',
    email: 'invalidUser3Email',
    password: 'invaliduser3password',
    role: 'user',
    membership: 'gold'
  },

  invalidadmin: {
    email: 'invalidadminEmail',
    password: 'invalidAdminpassword',
    role: 'Admin',
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

  borrowBook: {
    userid: 1,
    bookid: 1
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
