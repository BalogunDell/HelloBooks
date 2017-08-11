# Hellobooks

[![Build Status](https://travis-ci.org/BalogunDell/HelloBooks.svg?branch=master)](https://travis-ci.org/BalogunDell/HelloBooks)




Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books and it was built on Postgres, Express, and Node).

## Development
The application leverages Node; Express for routing and sequelize for ORM.

## Installation
- Install `node` and `postgres`
- Clone the repository git clone https://github.com/BalogunDell/HelloBooks.git
- Switch to project directory `cd ../path/to/HelloBooks`
- Install dependencies `npm i`
- Test `npm test`
- Start app `npm start`
- Consume via postman

## Endpoints

### Users
- User Signup  - api/users/signup               - Registers a user
- User Signin  - api/users/signin               - Logs a user in
- Get Book     - api/userid/books               - allows a user to view all books
- Get Book     - api/userid/books?returnd=false - allows a user to view all books that are not  yet returned
- Get Book     - api/userid/books?returnd=true  - allows a user to view all books that have been returned
- Borrow Book  - api/userid/books               - allows a user to borrow books
- Return Book  - api/userid/books               - allows a user to return borrowed books

### Admin
- User Signin  - api/users/signin - Logs an admin in
- Add  Book    - api/books        - allows an admin to add a book
- Modify Book  - api/books        - allows an admin to modify a book
- Delete Book  - api/books        - allows an admin to delete book

## Verbs
- GET
- POST
- PUT
- DELETE

#### Create user
- Endpoint: **POST** `api/users/signup`
- Authorization: NA

```
Request
{
	"firstname": "mike",
	"lastname": "doe",
	  "email": "bbb@gmail.com",,
	"password": "password"
}

Response
{
    "message": "User created",
    "data": {
        "membership": "bronze",
        "role": "user",
        "id": 4,
        "firstname": "mike",
        "lastname": "doe",
        "email": "bbb@gmail.com",
        "password": "$2a$10$rIYAMSou0qvwjr8WgddMZO6eTKPZ.wZ9rAU629EgmtWTogPwwniuS",
        "updatedAt": "2017-08-10T15:35:37.000Z",
        "createdAt": "2017-08-10T15:35:37.000Z",
        "image": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJiYmJAZ21haWwuY29tIiwibWVtYmVyc2hpcCI6ImJyb256ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTAyMzc5MzM3LCJleHAiOjE1MDI0NjU3Mzd9.FjK888IV26y22zW5Lyrjefgs9TeMM2n22GgV_CcW5H4"
}

```

#### Sign in
- Endpoint: **POST** `api/users/signin`
- Authorization: Yes

```
Request
{
	  "email": "bbb@gmail.com",
	"password": "password"
}

Response
{
    "message": "Signed in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJiYmJAZ21haWwuY29tIiwibWVtYmVyc2hpcCI6ImJyb256ZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTAyMzc5MzM3LCJleHAiOjE1MDI0NjU3Mzd9.FjK888IV26y22zW5Lyrjefgs9TeMM2n22GgV_CcW5H4"
}

```
