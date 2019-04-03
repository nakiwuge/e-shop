class Validate {
    constructor (fieldName) {
        this.fieldName = fieldName
    }

    shouldNotBeEmpty () {
        if(!this.fieldName || !this.fieldName.trim()){
            console.log("jjjj")
            return "This field cannot be empty"
        }
    }
}

module.exports = Validate