class Validate {
  constructor (...values) {
    this.values = values;
  }

  shouldNotBeEmpty () {
    let message;

    this.values.forEach(value => {
      if(!value || !value.trim()){
        message = 'Please fill in empty fields';
      }});

    return message;
  }
}

module.exports = Validate;