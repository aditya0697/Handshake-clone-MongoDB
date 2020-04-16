const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var addressSchema = new Schema({
    City: {type: String, required: true},
    State: {type: String, required: true},
    Zipcode: {type: String, required: true},
});
var eventSchema = new Schema({
    _id: {type: String, required: true},
    EventName:{type: String, required: true},
    EmployerID: {type: String, required: true},
    EmployerName: {type: String, required: true},
    EmployerProfileUrl: {type: String},
    Majors: [{type: String}],
    EventDate: {type: Date, required: false},
    Address: addressSchema,
    Description: {type: String, required: true},
});
var studentSchema = new Schema({
    _id: {type: String, required: true},
    Name: {type: String, required: true},
    ProfileUrl: {type: String},
});

var registrationSchema = new Schema({
    StudentID: {type: String, required: true},
    Student: studentSchema,
    Event: eventSchema,
    Status: {type: String, required: true},
});

registrationSchema.plugin(mongoosePaginate);
const registrationModel = mongoose.model('registration', registrationSchema);
module.exports = registrationModel;