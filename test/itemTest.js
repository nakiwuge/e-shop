import models from '../models/index';
import AuthMock from './mocks/authorizationMock';
import CategoryMock from './mocks/categoryMock';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Item = models.Item;

chai.use(chaiHttp);
chai.should();
let token;
let item;
let user;
// let category;
describe('Item', () =>{
  let data = {
    title:'brown shoes',
    description:null,
    price:'1000',
    CategoryId:null,
    imageUrl: null,
  };

  before(async () => { //Before each test we empty the database
    await Item.destroy({
      truncate: {cascade: true}});

    const categoryResponse = await CategoryMock();
    token = categoryResponse.authResponse.token;
    user =categoryResponse.authResponse.id;
    data.CategoryId = categoryResponse.category.id;
  });

  describe('Create Item', () => {
    it('it should create an item', (done) => {
      chai.request(app)
        .post('/api/items')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .end((err, res) => {
          if (err) {done(err);}
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.should.have.property('title').eql(data.title);
          res.body.data.should.have.property('owner').eql(user);
          res.body.data.should.have.property('createdAt');
          res.body.data.should.have.property('updatedAt');
          res.body.should.have.property('message').eql('The Item was successfully added');
          done();
        });
    });

    it('it should throw error if required fields are missing', (done) => {
      chai.request(app)
        .post('/api/items')
        .set('Authorization', `Bearer ${token}`)
        .send({title:'some thing'})
        .end((err, res) => {
          if (err) {done(err);}

          res.should.have.status(403);
          res.body.should.have.property('message').eql('Please fill in empty fields');
          done();
        });
    });
  });

  describe('Fetch Items', () => {
    it('it should fetch all Items', (done) => {
      chai.request(app)
        .get('/api/items')
        .end((err, res) => {
          if (err) {done(err);}
          item = res.body.data[0];
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data[0].should.have.property('title').eql(data.title);
          res.body.data[0].should.have.property('owner').eql(user);
          res.body.data[0].should.have.property('createdAt');
          res.body.should.have.property('message').eql('Success');
          done();
        });
    });

    it('it should fetch one category', (done) => {
      chai.request(app)
        .get(`/api/items/${item.id}`)
        .end((err, res) => {
          if (err) {done(err);}

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('title').eql(item.title);
          res.body.should.have.property('message').eql('Success');
          done();
        });
    });

    it('should throw error if item doesnot exist', (done) => {
      chai.request(app)
        .get('/api/items/0')
        .end((err, res) => {
          if (err) {done(err);}

          res.should.have.status(404);
          res.body.should.have.property('message').eql('Item not found');
          done();
        });
    });
  });

  describe('Update Items', () => {
    it('it should update an item', (done) => {
      chai.request(app)
        .put(`/api/items/${item.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title:'red boots', CategoryId:data.CategoryId, price:data.price})
        .end((err, res) => {
          if (err) {done(err);}

          res.should.have.status(201);
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('title').eql('red boots');
          res.body.data.should.have.property('owner').eql(user);
          res.body.should.have.property('message').eql('The Item was successfully updated');
          done();
        });
    });

    it('it should throw error if required fields are missing', (done) => {
      chai.request(app)
        .put(`/api/items/${item.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({title:'some thing'})
        .end((err, res) => {
          if (err) {done(err);}

          res.should.have.status(403);
          res.body.should.have.property('message').eql('Please fill in empty fields');
          done();
        });
    });
  });

  describe('Delete Items', () => {
    it('it should delete an item', (done) => {
      chai.request(app)
        .delete(`/api/items/${item.id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {done(err);}

          res.should.have.status(200);
          res.body.should.have.property('message').eql('Item was successfully deleted');
          done();
        });
    });
  });
});
