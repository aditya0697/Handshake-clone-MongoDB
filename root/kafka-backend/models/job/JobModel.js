const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var addressSchema = new Schema({
    City: {type: String, required: true},
    State: {type: String, required: true},
    Zipcode: {type: String, required: true},
});

var jobSchema = new Schema({
    JobID: {type: String, required: true},
    EmployerID: {type: String, required: true},
    Postion: {type: String, required: true},
    Salary: {type: Number, required: true},
    Type: {type: String, required: true},
    PostDate: {type: Date, required: false},
    Deadline: {type: Date, required: false},
    Address: {addressSchema},
    Description: {type: String, required: true},
});

const jobModel = mongoose.model('job', jobSchema);
module.exports = jobModel;