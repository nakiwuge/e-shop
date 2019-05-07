//process.env.NODE_ENV = 'test';

import models from '../models/index';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const User =models.User

chai.use(chaiHttp)

describe('User', () =>{
    let data = {
        firstName: "mim",
         lastName: "nak",
         email:"mim@gmail.com",
         password: "123",
         confirmPassword: "123"
     }
    beforeEach((done) => { //Before each test we empty the database
        User.destroy({
            truncate: {cascade: true}

          }).then(()=>{
            done()
          })
        })
    it('it should register a user', (done) => {
        chai.request(app)
            .post('/api/register')
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.data.should.have.property('email').eql('mim@gmail.com');
                res.body.data.should.have.property('firstName').eql('mim');
                res.body.data.should.have.property('lastName').eql('nak');
                res.body.data.should.have.property('createdAt')
                res.body.data.should.have.property('updatedAt')
                res.body.should.have.property('message').eql('The registration was successful');
                done();
            });
    });
});
