import { expect } from 'chai';
import { should } from 'chai';
import supertest from 'supertest';
import app from '../server/index';

const testApp = supertest(app);

describe('User Actions', () => {
  it('it should show home page', (done) =>{
    testApp.get('/api').end((error, res) => {
      done();
    });
  });
});

describe('Signup', () => {
  it('it should return 200', (done) =>{
    testApp.get('/api/users/signup')
    .set('Action', 'Application/json')
    .expect(200, done);
  });
});


describe('Signin', () => {
  it('it should return 200', (done) =>{
    testApp.get('/api/users/signin')
    .set('Action', 'Application/json')
    .expect(200, done);
  });
});
