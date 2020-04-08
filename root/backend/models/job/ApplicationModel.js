const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var applicationSchema = new Schema({
    JobID: {type: String, required: true},
    StudentID: {type: String, required: true},
    EmployerID: {type: String, required: true},
    ResumeURL: {type: String, required: true},
    Status: {type: String, required: true},
});

const applicationModel = mongoose.model('application', applicationSchema);
module.exports = applicationModel;