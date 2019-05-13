import models from '../../models/index';
import AuthMock from './authorizationMock';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const Category=models.Category;

chai.use(chaiHttp);

const CategoryMock =  async () => {
  await Category.destroy({
    truncate: { cascade: true }
  });
  const authResponse = await AuthMock();
  const response = await chai.request(app)
    .post('/api/categories')
    .set('Authorization', `Bearer ${authResponse.isSuperAdmin.token}`)
    .send({name:'shoes'});

  return { category:response.body.data, authResponse };
};

export default CategoryMock;