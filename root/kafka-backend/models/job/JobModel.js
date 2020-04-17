const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

var addressSchema = new Schema({
    City: {type: String, required: true},
    State: {type: String, required: true},
    Zipcode: {type: String, required: true},
});

var jobSchema = new Schema({
    EmployerID: {type: String, required: true},
    EmployerName: {type: String, required: true},
    EmployerProfileUrl: {type: String},
    Postion: {type: String, required: true},
    Salary: {type: Number, required: true},
    Type: {type: String, required: true},
    PostDate: {type: Date, required: false},
    Deadline: {type: Date, required: false},
    Address: addressSchema,
    Description: {type: String, required: true},
});

jobSchema.plugin(mongoosePaginate);
const jobModel = mongoose.model('job', jobSchema);
module.exports = jobModel;