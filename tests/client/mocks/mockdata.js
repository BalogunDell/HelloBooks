import jwt from 'jsonwebtoken';


  export const userData = {
    firstname: "Test",
    lastname: "Test Lastname",
    username: "TestUsername1",
    email: "delighteddell@gmail.com",
    password: "password"
  }

  

  export const trendingBooksMock = {
  trendingBooks: [
    {
      id: 14,
      isbn: "#949586",
      pages: 4,
      author: "f narar",
      year: 3450,
      title: "ratj rr art",
      description: "fna dfadsfds adf",
      quantity: 342,
      categoryid: 4,
      visibility: true,
      image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513678579/ma2vpijr4kawokqynuty.jpg",
      pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513678580/ytn1ckngz46h4uvatfxy.pdf",
      createdAt: "2017-12-19T10:16:20.630Z",
      updatedAt: "2017-12-19T10:16:20.630Z"
    },
    {
        id: 13,
        isbn: "#999900",
        pages: 4,
        author: "dsfuadsufadsad",
        year: 4385,
        title: "jsadfnsd ",
        description: "fjnadn adsfadf n asdf",
        quantity: 3,
        categoryid: 4,
        visibility: true,
        image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513675078/uadujqhe4gowckqvpb6v.jpg",
        pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513675079/gsstrjoqekidcmtgw3bv.pdf",
        createdAt: "2017-12-19T09:17:58.139Z",
        updatedAt: "2017-12-19T09:17:58.139Z"
    },
    {
        id: 12,
        isbn: "#978676",
        pages: 343,
        author: "thfggdh",
        year: 3535,
        title: "ryhrhygtt",
        description: "ghdgvbghjfbv",
        quantity: 43,
        categoryid: 3,
        visibility: true,
        image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513600279/lv4ql887pytvljhib0wa.jpg",
        pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513600280/wdbtujra487dbn8mujnu.pdf",
        createdAt: "2017-12-18T12:31:20.887Z",
        updatedAt: "2017-12-18T12:31:20.887Z"
    },
    {
        id: 11,
        isbn: "#453576",
        pages: 12,
        author: "Creator",
        year: 1991,
        title: "Testing create",
        description: "Testing the application",
        quantity: 20,
        categoryid: 2,
        visibility: true,
        image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513244706/inyec7xtzydiygdyalbb.jpg",
        pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513244742/tgwvlefw2p3mlutfhzgy.pdf",
        createdAt: "2017-12-14T09:45:43.174Z",
        updatedAt: "2017-12-18T10:55:35.375Z"
    }
  ]
}
  export const mocktrendingBooks = [
  {
    id: 14,
    isbn: "#949586",
    pages: 4,
    author: "f narar",
    year: 3450,
    title: "ratj rr art",
    description: "fna dfadsfds adf",
    quantity: 342,
    categoryid: 4,
    visibility: true,
    image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513678579/ma2vpijr4kawokqynuty.jpg",
    pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513678580/ytn1ckngz46h4uvatfxy.pdf",
    createdAt: "2017-12-19T10:16:20.630Z",
    updatedAt: "2017-12-19T10:16:20.630Z"
  },
  {
      id: 13,
      isbn: "#999900",
      pages: 4,
      author: "dsfuadsufadsad",
      year: 4385,
      title: "jsadfnsd ",
      description: "fjnadn adsfadf n asdf",
      quantity: 3,
      categoryid: 4,
      visibility: true,
      image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513675078/uadujqhe4gowckqvpb6v.jpg",
      pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513675079/gsstrjoqekidcmtgw3bv.pdf",
      createdAt: "2017-12-19T09:17:58.139Z",
      updatedAt: "2017-12-19T09:17:58.139Z"
  },
  {
      id: 12,
      isbn: "#978676",
      pages: 343,
      author: "thfggdh",
      year: 3535,
      title: "ryhrhygtt",
      description: "ghdgvbghjfbv",
      quantity: 43,
      categoryid: 3,
      visibility: true,
      image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513600279/lv4ql887pytvljhib0wa.jpg",
      pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513600280/wdbtujra487dbn8mujnu.pdf",
      createdAt: "2017-12-18T12:31:20.887Z",
      updatedAt: "2017-12-18T12:31:20.887Z"
  },
  {
      id: 11,
      isbn: "#453576",
      pages: 12,
      author: "Creator",
      year: 1991,
      title: "Testing create",
      description: "Testing the application",
      quantity: 20,
      categoryid: 2,
      visibility: true,
      image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513244706/inyec7xtzydiygdyalbb.jpg",
      pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513244742/tgwvlefw2p3mlutfhzgy.pdf",
      createdAt: "2017-12-14T09:45:43.174Z",
      updatedAt: "2017-12-18T10:55:35.375Z"
  }
]


export const mockBooks = {
  books:
  [
    {
      id: 1,
      isbn: "#949586",
      pages: 4,
      author: "f narar",
      year: 3450,
      title: "ratj rr art",
      description: "fna dfadsfds adf",
      quantity: 342,
      categoryid: 4,
      visibility: true,
      image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513678579/ma2vpijr4kawokqynuty.jpg",
      pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513678580/ytn1ckngz46h4uvatfxy.pdf",
      createdAt: "2017-12-19T10:16:20.630Z",
      updatedAt: "2017-12-19T10:16:20.630Z"
    },
    {
      id: 2,
      isbn: "#999900",
      pages: 4,
      author: "dsfuadsufadsad",
      year: 4385,
      title: "jsadfnsd ",
      description: "fjnadn adsfadf n asdf",
      quantity: 3,
      categoryid: 4,
      visibility: true,
      image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513675078/uadujqhe4gowckqvpb6v.jpg",
      pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513675079/gsstrjoqekidcmtgw3bv.pdf",
      createdAt: "2017-12-19T09:17:58.139Z",
      updatedAt: "2017-12-19T09:17:58.139Z"
    },
    {
      id: 3,
      isbn: "#978676",
      pages: 343,
      author: "thfggdh",
      year: 3535,
      title: "ryhrhygtt",
      description: "ghdgvbghjfbv",
      quantity: 43,
      categoryid: 3,
      visibility: true,
      image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513600279/lv4ql887pytvljhib0wa.jpg",
      pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513600280/wdbtujra487dbn8mujnu.pdf",
      createdAt: "2017-12-18T12:31:20.887Z",
      updatedAt: "2017-12-18T12:31:20.887Z"
    },
    {
      id: 4,
      isbn: "#453576",
      pages: 12,
      author: "Creator",
      year: 1991,
      title: "Testing create",
      description: "Testing the application",
      quantity: 20,
      categoryid: 2,
      visibility: true,
      image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513244706/inyec7xtzydiygdyalbb.jpg",
      pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513244742/tgwvlefw2p3mlutfhzgy.pdf",
      createdAt: "2017-12-14T09:45:43.174Z",
      updatedAt: "2017-12-18T10:55:35.375Z"
    }
  ]
}
export const signupResponse = {
  responseData: {
      message: "User created",
      username: "example123",
      userID: 4,
      userRole: "user",
      image: null,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJleGFtcGxlQGV4YW1wbGUuY29tIiwibWVtYmVyc2hpcCI6ImJyb256ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTEzMDg4MjEyLCJleHAiOjE1MTMxNzQ2MTJ9.BQK6ITUrUwPqxhGpy1YYwSfQmQjbBJhgzC0rB1XGJjE"
  }
}

export const signinMockData = {
  responseData: {
      message: "signed in",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJkZWxpZ2h0ZWRkZWxsQGdtYWlsLmNvbSIsIm1lbWJlcnNoaXAiOiJicm9uemUiLCJyb2xlIjoidXNlciIsImlhdCI6MTUxMzgxNjI3MywiZXhwIjoxNTEzOTAyNjczfQ.CtLzu3Wvd5kzWkdEDGtQzjYi866PWKcNWBQwrtHrML8",
      username: "Test1",
      userID: 6,
      userRole: "user",
      image: null
  }
}

export const resetPasswordResponse = {
  message: "A link for password reset has been sent to your email",
  url: "jAWgFfUiFTie"
}

export const newUserData = {
  firstname: "Annabel",
  lastname: "Tosin",
  username: "Mike21"
}

export const profile = {
  user: {
      id: 6,
      firstname: "Test",
      lastname: "Test",
      email: "delighteddell@gmail.com",
      username: "Test1",
      password: "$2a$10$TgTcE5TDNnb.nOepUuhaAumi9/79gwUvv0BNjxyValzHmitKbQS1O",
      membership: "bronze",
      role: "user",
      image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1556530447/ubwtgb7pznq5gzayxqzd.jpg",
      passurl: null,
      createdAt: "2017-12-20T20:15:20.937Z",
      updatedAt: "2017-12-22T12:43:20.897Z"
  }
}

export const updatedProfile = {
  user: {
      id: 6,
      firstname: "Test Test",
      lastname: "Test Testing",
      email: "delighteddell@gmail.com",
      username: "Test11",
      password: "$2a$10$TgTcE5TDNnb.nOepUuhaAumi9/79gwUvv0BNjxyValzHmitKbQS1O",
      membership: "gold",
      role: "user",
      image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1556530447/ubwtgb7pznq5gzayxqzd.jpg",
      passurl: null,
      createdAt: "2017-12-20T20:15:20.937Z",
      updatedAt: "2017-12-22T12:43:20.897Z"
  }
}

export const borrowBookResponse = {
  message: "Book Added",
  returnDate: "2017-12-25"
}

export const borrowedBook = {
  id: 2,
  userid: 2,
  bookid: 2,
  dateborrowed: "2017-12-24",
  expectedreturndate: "2017-12-25",
  returnstatus: false,
  approvedreturn: false,
  createdAt: "2017-12-24T12:26:07.401Z",
  updatedAt: "2017-12-24T12:26:07.401Z",
  book: {
      id: 2,
      isbn: "##7766",
      pages: 100,
      author: "Nelson Brook",
      year: 2000,
      title: "React for Beginners",
      description: "the books does this and that",
      quantity: 299,
      categoryid: 3,
      visibility: false,
      image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg",
      pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg",
      createdAt: "2017-12-23T11:13:07.025Z",
      updatedAt: "2017-12-24T12:26:07.424Z"
  }
}


export const borrowedBookMirror = {
  books: [{
    id: 2,
    userid: 2,
    bookid: 2,
    dateborrowed: "2017-12-24",
    expectedreturndate: "2017-12-25",
    returnstatus: false,
    approvedreturn: false,
    createdAt: "2017-12-24T12:26:07.401Z",
    updatedAt: "2017-12-24T12:26:07.401Z",
    book: {
        id: 2,
        isbn: "##7766",
        pages: 100,
        author: "Nelson Brook",
        year: 2000,
        title: "React for Beginners",
        description: "the books does this and that",
        quantity: 299,
        categoryid: 3,
        visibility: false,
        image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg",
        pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg",
        createdAt: "2017-12-23T11:13:07.025Z",
        updatedAt: "2017-12-24T12:26:07.424Z"
      }
    }]
}


export const borrowedBookSample = [
  {
    id: 2,
    userid: 2,
    bookid: 2,
    dateborrowed: "2017-12-24",
    expectedreturndate: "2017-12-25",
    returnstatus: false,
    approvedreturn: false,
    createdAt: "2017-12-24T12:26:07.401Z",
    updatedAt: "2017-12-24T12:26:07.401Z",
    book: {
      id: 2,
      isbn: "##7766",
      pages: 100,
      author: "Nelson Brook",
      year: 2000,
      title: "React for Beginners",
      description: "the books does this and that",
      quantity: 299,
      category: {
        id: 1,
        category: 'Programmoing'
      },
      categoryid: 3,
      visibility: false,
      image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg",
      pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1507295978/book8_yy9efp.jpg",
      createdAt: "2017-12-23T11:13:07.025Z",
      updatedAt: "2017-12-24T12:26:07.424Z"
    }
  }
]

export const unpublishedBooks = {
  id: 4,
  isbn: "#453576",
  pages: 12,
  author: "Creator",
  year: 1991,
  title: "Testing create",
  description: "Testing the application",
  quantity: 20,
  categoryid: 2,
  visibility: false,
  image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513244706/inyec7xtzydiygdyalbb.jpg",
  pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513244742/tgwvlefw2p3mlutfhzgy.pdf",
  createdAt: "2017-12-14T09:45:43.174Z",
  updatedAt: "2017-12-18T10:55:35.375Z"
}

export const publishedBooks = {
  id: 1,
  isbn: "#453576",
  pages: 12,
  author: "Creator",
  year: 6000,
  title: "Testing create",
  description: "Testing the application",
  quantity: 20000,
  categoryid: 2,
  visibility: true,
  image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513244706/inyec7xtzydiygdyalbb.jpg",
  pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513244742/tgwvlefw2p3mlutfhzgy.pdf",
  createdAt: "2017-12-14T09:45:43.174Z",
  updatedAt: "2017-12-18T10:55:35.375Z"
}

export const publishedBooksSample = [
  {
    id: 4,
    isbn: "#453576",
    pages: 12,
    author: "Creator",
    year: 1991,
    title: "Testing create",
    description: "Testing the application",
    quantity: 20,
    category: {
      id: 2,
      category: 'Programming'
    },
    categoryid: 2,
    visibility: true,
    image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513244706/inyec7xtzydiygdyalbb.jpg",
    pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513244742/tgwvlefw2p3mlutfhzgy.pdf",
    createdAt: "2017-12-14T09:45:43.174Z",
    updatedAt: "2017-12-18T10:55:35.375Z"
  }
]


export const publishedBooksSample2 = {
  data: [
    {
      id: 4,
      isbn: "#453576",
      pages: 12,
      author: "Creator",
      year: 1991,
      title: "Testing create",
      description: "Testing the application",
      quantity: 20,
      category: {
        id: 2,
        category: 'Programming'
      },
      categoryid: 2,
      visibility: true,
      image: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513244706/inyec7xtzydiygdyalbb.jpg",
      pdf: "https://res.cloudinary.com/djvjxp2am/image/upload/v1513244742/tgwvlefw2p3mlutfhzgy.pdf",
      createdAt: "2017-12-14T09:45:43.174Z",
      updatedAt: "2017-12-18T10:55:35.375Z"
    }
  ]
}

export const createdBookResponse = {
  message: "Book created",
  data: {
      visibility: true,
      id: 8,
      isbn: "#437765",
      title: "React for Beginners",
      author: "Nelson Brook",
      pages: 1080,
      year: 2010,
      description: "the books does this and that",
      quantity: 3,
      categoryid: 1,
      image: "images/andela.jpg",
      pdf: "randadfa",
      updatedAt: "2017-12-12T15:30:17.144Z",
      createdAt: "2017-12-12T15:30:17.144Z"
  }
}

export const initialData = { 
  isbn: '', 
  title:'', 
  author: '', 
  pages: '', 
  year: '', 
  description: '', 
  quantity: '',
  categoryid: '', 
  image: '',
  pdf: '' }

export const editBookResponse = {
  message: "Book modified",
  data: {
      visibility: true,
      id: 8,
      isbn: "#477765",
      title: "Java for Beginners",
      author: "Nelson Brook",
      pages: 1080,
      year: 2010,
      description: "the books does this and that",
      quantity: 3,
      categoryid: 1,
      image: "images/andela.jpg",
      pdf: "randadfa",
      updatedAt: "2017-12-12T15:30:17.144Z",
      createdAt: "2017-12-12T15:30:17.144Z"
  }
}

export const saveImagerResponse = {
  data: {
    public_id: 'qpzstpk6hpkljrg1t9vt',
    version: 1515674221,
    signature: 'c8878bc1123fa6af91729b89f6195412f295c6ad',
    width: 960,
    height: 960,
    format: 'pdf',
    resource_type: 'image',
    created_at: '2018-01-11T12:37:01Z',
    tags: [],
    bytes: 129758,
    type: 'upload',
    etag: '76c617e26159bf44a40aabaf9ed7844c',
    placeholder: false,
    url: 'http://res.cloudinary.com/djvjxp2am/image/upload/v1515674221/sample.pdf',
    secure_url: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1515674221/sample.pdf',
    original_filename: 'sample.pdf'
  }
}

export const categories = [
  {
    id: 1,
    category: 'Programming'
  },
  {
    id: 2,
    category: 'Education'
  },
  {
    id: 3,
    category: 'Self-Growth'
  }
]


export const sampleCats = {
categories: [
  {
    id: 1,
    category: 'Programming'
  },
  {
    id: 2,
    category: 'Education'
  },
  {
    id: 3,
    category: 'Self-Growth'
  }
]
}

export const token = jwt.sign({
  id: 5,
  email: 'example@example.com',
  membership: 'bronze',
  role: 'user'
},
'abcdsefd', 
{ expiresIn: 24 * 60 * 60} );

// COMPONENT DATA

export const homeParagraph = `Hello books allows you to borrow books that have been gathered from different part of the  world. Finding books of your choice just got easier with us.`