import models from '../models/index';
import AuthMock from './mocks/authorizationMock';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const User = models.User;
let users;
chai.use(chaiHttp);
chai.should();
let token;
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
  before(async() => { //Before each test we empty the database
    const response = await AuthMock();
    token = response.isSuperAdmin.token;
    buyerToken = response.isBuyer.token;
    await  User.destroy({
      where:{ email: data.email},
      truncate: {cascade: true}
    });

  });

  it('it should register a user', (done) => {
    chai.request(app)
      .post('/api/register')
      .send(data)
      .end((err, res) => {
        if (err) done(err);

        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('email').eql('mim@gmail.com');
        res.body.data.should.have.property('firstName').eql('mim');
        res.body.data.should.have.property('lastName').eql('nak');
        res.body.data.should.have.property('createdAt');
        res.body.data.should.have.property('updatedAt');
        res.body.should.have.property('message').eql('The registration was successful');
        done();
      });
  });

  it('it should throw error if passwords do not match at registration', (done) => {
    data.confirmPassword = '1222';
    chai.request(app)
      .post('/api/register')
      .send(data)
      .end((err, res) => {
        if (err) done(err);

        res.should.have.status(405);
        res.body.should.have.property('error').eql('passwords do not match');
        done();
      });
  });

  it('it should login a user', (done) => {
    chai.request(app)
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send({email:data.email, password: data.password})
      .end((err, res) => {
        if (err) done(err);

        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('email').eql('mim@gmail.com');
        res.body.data.should.have.property('firstName').eql('mim');
        res.body.data.should.have.property('lastName').eql('nak');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('token');
        res.body.should.have.property('message').eql('The login was successful');
        done();
      });
  });

  it('it should get all users',(done) => {
    chai.request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) done(err);
        users = res.body.data;

        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('email');
        res.body.data.should.have.length(2);
        res.body.should.have.property('message').eql('Success');
        done();
      });
  });

  it('it should update user roles',(done) => {
    chai.request(app)
      .put(`/api/users/role/${users[1].id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({isAdmin:true})
      .end((err, res) => {
        if (err) done(err);

        res.should.have.status(201);
        res.body.data.should.have.property('isAdmin').eql(true);
        res.body.should.have.property('message').eql('The role was successfully updated');
        done();
      });
  });
});
