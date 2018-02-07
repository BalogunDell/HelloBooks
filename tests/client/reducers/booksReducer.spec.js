import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import renderer from 'react-test-renderer';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';

// Import reducer
import booksReducer from '../../../client/src/reducers/booksReducer';

// Import actions

import {
  getAllBooks,
  getBookId,
  borrowBookAction,
  userBooks,
  createBookAction,
  returnBookAction,
  getAdminEditBookId,
  modifyBookAction,
  deleteBookAction,
  getborrowedbooksAction,
  borrowBook,
  adminGetAllBooksAction,
  publishBookAction,
  trendingBooksAction,
  trendingBooks,
} from '../../../client/src/actions/booksAction';

import {
  signupResponse,
  resetPasswordResponse,
  mockBooks,
  borrowBookResponse,
  borrowedBook,
  createdBookResponse,
  editBookResponse,
  unpublishedBooks,
  publishedBooks,
  mocktrendingBooks,
  profile,
  updatedProfile,
  saveImagerResponse,
  categories,
  sampleCats,
  trendingBooksMock
} from '../mock/mockdata';


// Configure necessary libs
const expect = chai.expect;
chai.use(jestSnapshot);
configure({ adapter: new Adapter() });

// Declare global variable
const initialState = {};

describe('Books Reducer', () => {
  it('should return a new state when GET ALL BOOKS action is dispatched', 
  () => {
    const newState = booksReducer(initialState, getAllBooks(mockBooks));
    expect(newState.books[0].id).to.equal(mockBooks.books[0].id);
    expect(newState.books[0].author).to.equal(mockBooks.books[0].author);
    expect(newState.books[0].title).to.equal(mockBooks.books[0].title);
    expect(newState.books[0].isbn).to.equal(mockBooks.books[0].isbn);
    expect(newState.books[0].quantity).to.equal(mockBooks.books[0].quantity);
    expect(newState.books[0].id).to.equal(mockBooks.books[0].id);
    expect(newState.books[0].description).to
    .equal(mockBooks.books[0].description);
    expect(newState.books[0].pages).to.equal(mockBooks.books[0].pages);
    expect(newState.books[0].year).to.equal(mockBooks.books[0].year);
    expect(newState.books[0].image).to.equal(mockBooks.books[0].image);
    expect(newState.books[0].pdf).to.equal(mockBooks.books[0].pdf);
  });

  it('should return a new state when GET BOOK ID action is dispatched', () => {
    const newState = booksReducer(initialState, getBookId(3));
    expect(newState.currentBookId).to.equal(3);
    
  });

  it('should return a new state when BORROW BOOK action is dispatched', () => {
    const newState = booksReducer(initialState,  
      borrowBookAction(borrowBookResponse));
    expect(newState.fetchedBooks
    ).to.be.an('array');
    expect(newState.fetchedBooks.returnDate).to
      .equal(borrowBookResponse.bookBorrowed.returnDate);
    expect(newState.fetchedBooks[0].userId).to
      .equal(borrowBookResponse.bookBorrowed.userId);
    expect(newState.fetchedBooks[0].bookId).to
      .equal(borrowBookResponse.bookBorrowed.bookId);
    expect(newState.fetchedBooks[0].returnStatus).to
      .equal(borrowBookResponse.bookBorrowed.returnStatus);
  });

  it('should return a new state when FETCH USER BOOKS action is dispatched',
   () => {
    const newState = booksReducer(initialState, userBooks(borrowedBook));
    expect(newState.fetchedBooks).to.equal(borrowedBook.response);
    expect(newState.fetchedBooks.id).to.equal(borrowedBook.response.id);
    expect(newState.fetchedBooks.userId).to
      .equal(borrowedBook.response.userId);
    expect(newState.fetchedBooks.bookId).to
      .equal(borrowedBook.response.bookId);
    expect(newState.fetchedBooks.dateborrowed)
    .to.equal(borrowedBook.response.dateborrowed);
    expect(newState.fetchedBooks.expectedreturndate)
    .to.equal(borrowedBook.response.expectedreturndate);
    expect(newState.fetchedBooks.returnStatus)
    .to.equal(borrowedBook.response.returnStatus);
    expect(newState.fetchedBooks.book).to.equal(borrowedBook.response.book);
  });

  it('should return a new state when CREATE BOOK action is dispatched', () => {
    const newState = booksReducer(initialState,
      createBookAction(createdBookResponse));
    expect(newState.createbook).to.equal(createdBookResponse);
    expect(newState.createbook).to.have.property('message');
    expect(newState.createbook.message)
    .to.equal(createdBookResponse.message);
    expect(newState.createbook.payload).to.be.an('object');
    expect(newState.createbook.payload.visibility)
    .to.equal(createdBookResponse.payload.visibility);
    expect(newState.createbook.payload.isbn)
    .to.equal(createdBookResponse.payload.isbn);
    expect(newState.createbook.payload.id)
    .to.equal(createdBookResponse.payload.id);
    expect(newState.createbook.payload.title)
    .to.equal(createdBookResponse.payload.title);
    expect(newState.createbook.payload.author)
    .to.equal(createdBookResponse.payload.author);
    expect(newState.createbook.payload.pages)
    .to.equal(createdBookResponse.payload.pages);
    expect(newState.createbook.payload.year)
    .to.equal(createdBookResponse.payload.year);
    expect(newState.createbook.payload.description)
    .to.equal(createdBookResponse.payload.description);
    expect(newState.createbook.payload.quantity)
    .to.equal(createdBookResponse.payload.quantity);
    expect(newState.createbook.payload.categoryId)
    .to.equal(createdBookResponse.payload.categoryId);
    expect(newState.createbook.payload.image)
    .to.equal(createdBookResponse.payload.image);
    expect(newState.createbook.payload.pdf)
    .to.equal(createdBookResponse.payload.pdf);
    expect(newState.createbook.payload.updatedAt)
    .to.equal(createdBookResponse.payload.updatedAt);
    expect(newState.createbook.payload.createdAt)
    .to.equal(createdBookResponse.payload.createdAt);
  });

  it('should return a new state when RETURN BOOK action is dispatched', () => {
    const newState = booksReducer(initialState,
      returnBookAction({message: 'Book has been returned'}));
    expect(newState.returnBookData).to
      .equal('Book has been returned');
  });

  it('should return a new state when EDIT BOOK action is dispatched', () => {
    const newState = booksReducer(mockBooks, modifyBookAction(publishedBooks));
    expect(newState.books[0].id).to.equal(publishedBooks.id);
    expect(newState.books[0].author).to.equal(publishedBooks.author);
    expect(newState.books[0].pages).to.equal(publishedBooks.pages);
    expect(newState.books[0].title).to.equal(publishedBooks.title);
    expect(newState.books[0].quantity).to.equal(publishedBooks.quantity);
    expect(newState.books[0].visibility).to.equal(publishedBooks.visibility);
    expect(newState.books[0].categoryId).to.equal(publishedBooks.categoryId);
    expect(newState.books[0].description).to.equal(publishedBooks.description);
    expect(newState.books[0].image).to.equal(publishedBooks.image);
    expect(newState.books[0].pdf).to.equal(publishedBooks.pdf);
    expect(newState.books[0].isbn).to.equal(publishedBooks.isbn);
    expect(newState.books[0].updatedAt).to.equal(publishedBooks.updatedAt);
  });

  it('should return a new state when DELETE BOOK action is dispatched', () => {
    const newState = booksReducer(mockBooks, deleteBookAction({updatedBooks: 
      mockBooks.books}));
    expect(newState.books[0]).to.equal(mockBooks.books[0]);
  });
  
  it('should return a new state when admin tries to GET BORROWED BOOKS',
  () => {
    const newState = booksReducer(initialState,
      getborrowedbooksAction(borrowedBook));
    expect(newState.allborrowedbooks).to.equal(borrowedBook);
    expect(newState.allborrowedbooks.response.id).to
    .equal(borrowedBook.response.id);
    expect(newState.allborrowedbooks.response.userId).to
      .equal(borrowedBook.response.userId);
    expect(newState.allborrowedbooks.response.bookId).to
      .equal(borrowedBook.response.bookId);
    expect(newState.allborrowedbooks.response.dateborrowed)
    .to.equal(borrowedBook.dateborrowed);
    expect(newState.allborrowedbooks.response.expectedreturndate)
    .to.equal(borrowedBook.response.expectedreturndate);
    expect(newState.allborrowedbooks.response.returnstatus)
    .to.equal(borrowedBook.response.returnstatus);
    expect(newState.allborrowedbooks.response.approvedreturn)
    .to.equal(borrowedBook.response.approvedreturn);
    expect(newState.allborrowedbooks.response.book).to
    .equal(borrowedBook.response.book);
  });

  it('should return a new state with TRENDING_BOOKS action', () => {
    const newState = booksReducer(initialState,
      trendingBooksAction(trendingBooksMock));
     const booksLength = newState.books.length;
    expect(booksLength).to.equal(4);
    expect(newState.books[0].id).to
    .equal(trendingBooksMock.trendingBooks[0].id);
    expect(newState.books[0].title).to
    .equal(trendingBooksMock.trendingBooks[0].title);
    expect(newState.books[0].author).to
    .equal(trendingBooksMock.trendingBooks[0].author);
    expect(newState.books[0].pages).to
    .equal(trendingBooksMock.trendingBooks[0].pages);
    expect(newState.books[0].year).to
    .equal(trendingBooksMock.trendingBooks[0].year);
    expect(newState.books[0].quantity).to
    .equal(trendingBooksMock.trendingBooks[0].quantity);
    expect(newState.books[0].image).to
    .equal(trendingBooksMock.trendingBooks[0].image);
  });

  it('should return the state when no action is passed', () => {
    const newState = booksReducer(initialState, 'default');
    expect(newState).to.be.an('object');
    expect(newState).to.be.empty;
  });
});