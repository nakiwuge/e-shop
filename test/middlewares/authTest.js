const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

chai.use(chaiHttp);
chai.should();

describe('User', () =>{
  it('it should throw unauthorization error if no token',(done) => {
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        if (err) done(err);

        res.should.have.status(403);
        res.body.should.have.property('error').eql('You are not authorized. Please add a token');
        done();
      });
  });

  it('it should throw error if invalid token is provided',(done) => {
    chai.request(app)
      .get('/api/users')
      .set('Authorization', 'Bearer gbduyjhjnoldvd')
      .end((err, res) => {
        if (err) done(err);

        res.should.have.status(403);
        res.body.should.have.property('error');
        done();
      });
  });
});
