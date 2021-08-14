const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const GENDERS = [ "Male" , "Female" , "Others"]

const employeeSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    salary : {
        type : Number,
        required : true,
        validate(salary){
            if(salary < 0){
                throw new Error('Salary can not be negative ')
            }
        }
    },
    gender : {
        type : String,
        enum : GENDERS,
        required : true
    },
    team : {
        type : String
    },
    address : {
        type : String
    }
})

autoIncrement.initialize(mongoose.connection)

employeeSchema.plugin(autoIncrement.plugin,'Employee')



const Employee = mongoose.model('Employee',employeeSchema)


module.exports = Employee