const hompageLogo = 'https://res.cloudinary.com/djvjxp2am/image/upload/v1509980754/hb-logo_fyj92s.png';
const hompageIntro = `Hello books allows you to borrow books that have been gathered from different part of the world. Finding books of your choice just got easier with us`;
const userLoginData = {
  fakeData1: {
      username: 'fakeUsername',
      password: 'fakePassword'
  },
  fakeData2: {
      username: 'Fred1',
      password: 'fakePassword'
  },
  fakeData3: {
      username: 'abbey3',
      password: 'password'
  },
  fakeData4: {
    username: 'adminusername',
    password: 'password'
  }
};

const userNavImage = 'https://res.cloudinary.com/djvjxp2am/image/upload/v1507971952/hellobooks/hb-logo.png';
const userEditData = {
  firstname: 'Fred',
  lastname: 'Hammond',
  username: 'Fred1'
};

const fakeBookData = {
  isbn: 999999,
  title: 'End to end test',
  author: 'Franklin Chieze',
  pages: 32,
  year: 2017,
  description: 'This is an end to end test book and really selenium is interesting to use',
  quantity: 100,
  categoryid: 2
};

const fakeEditBookData = {
  title: 'React for Beginners',
  author: 'Nelson Brook',
  pages: 1080,
  year: 2010,
  description: 'the books does this and that',
  quantity: 1
}

module.exports = {
    hompageLogo,
    hompageIntro,
    userLoginData,
    userNavImage,
    userEditData,
    fakeBookData,
    fakeEditBookData
}