class Validate {
  constructor (...fields) {
    this.fields = fields;
  }

  isEmpty () {
    let error;

    this.fields.forEach(field => {
      const fieldName = Object.keys(field)[0];
      const fieldValue = Object.values(field)[0];

      if(!fieldValue || !fieldValue.trim() ){

        error = `${fieldName} should not be empty`;
      }
    });

    return error;
  }

  isInteger(){
    let error;

    this.fields.forEach(field => {
      const fieldName = Object.keys(field)[0];
      const fieldValue = Object.values(field)[0];

      if(Boolean(parseInt(fieldValue))==false){
        error = `${fieldName} should be a number`;
      }
    });

    return error;
  }
}


module.exports = Validate;