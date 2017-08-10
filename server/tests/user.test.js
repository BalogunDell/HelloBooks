import supertest from 'supertest';
import { expect } from 'chai';
import faker from 'faker';
import app from '../index';
import Db from '../models/index';
import bookseeds from '../seeds/books';
import userseeds from '../seeds/users';


const users = userseeds.users;
const invalidUsers = userseeds.invalidUsers;

const books = bookseeds.books;
const invalidBooks = bookseeds.invalidBooks;

const server = supertest(app);

 describe('ADMIN REGISTRATION AND AUTHENTICATION', () => {
   before((done) => {
     Db.sequelize.sync({ force: true })
      .then(() => done());
   });
   
  it('should be able to signup - Admin', (done) => {
    server
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(users[1])
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });


  describe('ADMIN LOGIN AND AUTHENTICATION', () => {
    before((done) => {
      Db.sequelize.sync({ force: true })
        .then(() => done());
    });

      before((done) => {
      Db.users.bulkCreate([users[0]], { individualHooks: true })
        .then(() => done());
      });
    });

      it('should not able to signin - ADMIN', (done) => {
      server
        .post('/api/users/signin')
        .set('Accept', 'Application/json')
        .send(invalidUsers[0])
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
  });

  describe('USER LOGIN AND AUTHENTICATION', () => {
    before((done) => {
      Db.sequelize.sync({ force: true })
        .then(() => done());
    });

      before((done) => {
      Db.users.bulkCreate([users[1]], { individualHooks: true })
        .then(() => done());
      });
   
    it('should be able to signin - User', (done) => {
      server
        .post('/api/users/signin')
        .set('Accept', 'Application/json')
        .send(users[1])
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });

    it('should not able to signin - User', (done) => {
    server
      .post('/api/users/signin')
      .set('Accept', 'Application/json')
      .send(invalidUsers[1])
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
});
