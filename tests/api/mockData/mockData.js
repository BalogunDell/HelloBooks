const mockData = {
  invalidUserData: {
    firstname: '',
    lastname: 'teddy',
    email: 'jane5@mail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  invalidFirstnamewithNo: {
    firstname: 43,
    lastname: 'teddy',
    email: 'jane5@mail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  oneCharFirstname: {
    firstname: 'w',
    lastname: 'teddy',
    email: 'jane5@mail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  invalidLastnameWithNo: {
    firstname: 'Ted',
    lastname: 45,
    email: 'jane5@mail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },

  oneCharLastname: {
    firstname: 'whitney',
    lastname: 't',
    email: 'jane5@mail.com',
    username: 'abbey33',
    password: 'abbey2',
    role: 'user',
    membership: 'silver',
    image: 'image2'
  },
}

export default mockData;
