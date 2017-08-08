import { expect } from 'chai';
import supertest from 'supertest';
import app from '../server/index';

const testApp = supertest(app);
const userSample1 = { 'firstname': 'abey',
                    'lastname': 'delight',
                    'email': 'shfdelighteddell',
                    'password':'abbey',
                    'membership':'Bronze',
                    'role': 'user',
                    }

const userSample2 = { 'firstname': 'abey1',
                    'lastname': 'delight1',
                    'email': 'delighteddell',
                    'password':'abbey2',
                    'membership':'Bronze11',
                    'confirmpassword': 'abbey1'}

const userSample3 = { 'firstname': '',
                    'lastname': '',
                    'email': '',
                    'password':'abbey2',
                    'membership':'Bronze11',
                    'confirmpassword': 'abbey1'}

describe('User Actions', () => {
  it('it should load the inital route', (done) =>{
    testApp.get('/api').end((error, res) => {

      console.log(error, res.body, res.status);
      done();
    });
  });
});

describe('Signup', () => {
  it('it should return 200', (done) =>{
    testApp.post('/api/users/signup')
    .set('Action', 'Application/json')
    .send(userSample1)
    .end((error, res) => {
    expect(200);
      done();
    });
  });

  it('it should return 409', (done) =>{
    testApp.post('/api/users/signup')
    .send(userSample2)
    .end((error, res) => {
      expect(409)
      done();
    });
  });
});
