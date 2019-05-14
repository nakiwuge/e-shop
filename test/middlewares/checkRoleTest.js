import models from '../../models/index';
import AuthMock from '../mocks/authorizationMock';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

const User = models.User;
chai.use(chaiHttp);
chai.should();

let buyerToken;

describe('User', () =>{
  let data = {
    firstName: 'mim',
    lastName: 'nak',
    email:'mim@gmail.com',
    password: '123',
    confirmPassword: '123',
    isBuyer:true
  };
  before(async () => { //Before each test we empty the database
    const response = await AuthMock();
    buyerToken = response.isBuyer.token;
    await  User.destroy({
      where:{ email: data.email},
      truncate: {cascade: true}
    });
  });

  it('it should throw error a buyer accesses the get all users route',(done) => {
    chai.request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${buyerToken}`)
      .end((err, res) => {
        if (err) done(err);

        res.should.have.status(405);
        res.body.should.have.property('error').eql('You have no permmission to perform this action');
        done();
      });
  });
});
