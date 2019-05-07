const Category = require('../models').Category;
const Validate = require('../helpers/validation');


let doValidation;

//get a category
module.exports.getCategory = (req, res) => {
  Category.findAll().then(categories => {
    res.status(200).json({
      data: categories,
      message: 'success'});
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Some error occurred, please try again later.'
    });
  });
};

//add a category
module.exports.addCategory = (req, res) => {
  const data = { name: req.body.name };

  doValidation = new Validate(data.name);

  if(doValidation.shouldNotBeEmpty()){
    return res.status(403).send({
      message: doValidation.shouldNotBeEmpty()});
  }

  Category.create(data).then(category => {
    res.status(201).send({
      data: category,
      message: 'The category was successfully created'});
  }).catch(errors => {
    res.status(500).send({
      message: errors.message || 'Some error occurred, please try again later.'
    });
  });
};

//get single category
module.exports.getOneCategory = (req, res) => {
  Category.findOne({ where: {id: req.params.id}}).then(category => {
    if (category){
      return res.send({category, status: 'Success'});
    }
    res.status(404).send({
      message: 'Category not found'
    });
  }).catch(errors => {
    res.status(500).send({
      message: errors.message || 'Some error occurred, please try again later.'
    });
  });
};

//update category
module.exports.updateCategory = (req, res) => {
  const data = { name: req.body.name };
  doValidation = new Validate(data.name);

  if(doValidation.shouldNotBeEmpty()){
    return res.status(403).send({
      message: doValidation.shouldNotBeEmpty()});
  }

  Category.update(
    { name: data.name },
    { returning:true,
      plain: true,
      where: {id: req.params.id
      }}).then(category => {
    res.status(201).send({
      data: category[1],
      message: 'The category was successfully updated'});
  }).catch(errors => {
    res.status(500).send({
      message: errors.message || 'Some error occurred, please try again later.'
    });
  });
};
// delete category
module.exports.deleteCategory = (req, res) => {
  Category.destroy({
    where:{
      id: req.params.id
    }
  }).then((rowDeleted) => {
    if (rowDeleted==1){
      return res.status(200).send({
        message: 'Category been deleted successfully'});

    }
    return res.status(404).send({
      message: 'Category doesnot exist'});

  }).catch(errors => {
    res.status(500).send({
      message: errors.message || 'Some error occurred, please try again later.'
    });
  });
};

