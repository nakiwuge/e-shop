import models from '../models/index';
import AuthMock from './mocks/authorizationMock';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Category = models.Category;

chai.use(chaiHttp);
chai.should();
let token;
let category;

describe('Category', () =>{
  let data = {
    name: 'shoes',
  };
  before(async () => { //Before each test we empty the database
    await Category.destroy({
      truncate: {cascade: true}});
    const response = await AuthMock();
    token = response.token;
  });

  it('it should create a category', (done) => {
    chai.request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .end((err, res) => {
        if (err) {done(err);}

        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('name').eql('shoes');
        res.body.data.should.have.property('createdAt');
        res.body.data.should.have.property('updatedAt');
        res.body.should.have.property('message').eql('The category was successfully created');
        done();
      });
  });
  it('it throw error if category name is empty', (done) => {

    chai.request(app)
      .post('/api/categories/')
      .set('Authorization', `Bearer ${token}`)
      .send({name:''})
      .end((err, res) => {
        if (err) {done(err);}

        res.should.have.status(403);
        done();
      });
  });

  it('it should fetch all categories', (done) => {
    chai.request(app)
      .get('/api/categories')
      .end((err, res) => {
        if (err) {done(err);}
        category=res.body.data[0];

        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('name').eql('shoes');
        res.body.should.have.property('message').eql('success');
        done();
      });
  });

  it('it should fetch one category', (done) => {

    chai.request(app)
      .get(`/api/categories/${category.id}`)
      .end((err, res) => {
        if (err) {done(err);}

        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.category.should.have.property('name').eql('shoes');
        res.body.should.have.property('status').eql('Success');
        done();
      });
  });

  it('it should fail fetching category if wrong id is provided', (done) => {

    chai.request(app)
      .get('/api/categories/0')
      .end((err, res) => {
        if (err) {done(err);}

        res.should.have.status(404);
        res.body.should.have.property('message').eql('Category not found');
        done();
      });
  });

  it('it throw internal server error', (done) => {

    chai.request(app)
      .get('/api/categories/gfyudgfhu')
      .end((err, res) => {
        if (err) {done(err);}

        res.should.have.status(500);
        done();
      });
  });

  it('it should update category', (done) => {

    chai.request(app)
      .put(`/api/categories/${category.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({name: 'dresses'})
      .end((err, res) => {
        if (err) {done(err);}

        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('name').eql('dresses');
        res.body.should.have.property('message').eql('The category was successfully updated');
        done();
      });
  });
  it('it throw error if category name is empty when updating', (done) => {

    chai.request(app)
      .put(`/api/categories/${category.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({name:''})
      .end((err, res) => {
        if (err) {done(err);}

        res.should.have.status(403);
        done();
      });
  });

  it('it should delete category', (done) => {

    chai.request(app)
      .delete(`/api/categories/${category.id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {done(err);}
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Category been deleted successfully');
        done();
      });
  });
  it('it thro error when  deleting a non existing category', (done) => {

    chai.request(app)
      .delete('/api/categories/0')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {done(err);}
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Category doesnot exist');
        done();
      });
  });
});
