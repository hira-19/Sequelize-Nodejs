const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type: Number
    },
    work:{
        typ: String,
        enum: ['chef','manager','waiter'],
        required:true
    },
    mobile:{
        type: Number,
        required:true
    },
    email:{
        type:String,
        requird: true,
        unique: true
    },
    address:{
        type: String,
    },
    salary:{
        type: Number
    }
})

// now after making schema we will make models then we can perform crud operations on it
const Person = mongoose.model('Person',personSchema)
module.exports = Person;






