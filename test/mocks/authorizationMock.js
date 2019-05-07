import models from '../../models/index';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const User =models.User;

chai.use(chaiHttp);
const data = {
  firstName: 'mim',
  lastName: 'nak',
  email:'mim@gmail.com',
  password: '123',
  confirmPassword: '123'
};

const AuthMock =  async () => {
  await User.destroy({
    truncate: { cascade: true }
  });

  await chai.request(app)
    .post('/api/register')
    .set('Content-Type', 'application/json')
    .send(data);

  const response = await chai.request(app)
    .post('/api/login')
    .send(data);

  return response.body.data;
};

export default AuthMock;