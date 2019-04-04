class Validate {
    constructor (...values) {
        this.values = values
    }

    shouldNotBeEmpty () {
        let message;

        this.values.forEach(value => {
            if(!value || !value.trim()){
               message = "This field cannot be empty"
        }})

        return message
    }
}

module.exports = Validate