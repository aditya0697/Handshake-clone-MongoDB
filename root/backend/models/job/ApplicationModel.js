const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var addressSchema = new Schema({
    City: {type: String, required: true},
    State: {type: String, required: true},
    Zipcode: {type: String, required: true},
});

var applicationSchema = new Schema({
    JobID: {type: String, required: true},
    StudentID: {type: String, required: true},
    EmployerID: {type: String, required: true},
    ResumeURL: {type: String, required: true},
    Status: {type: String, required: true},
});

const applicationModel = mongoose.model('application', applicationSchema);
module.exports = applicationModel;