var Job = require('./../../models/job/JobModel');

function handle_request(msg, callback) {
    console.log("In createCourse kafka backend");
    if (!msg) {
        callback("No Job", "no Job");
        return;
    }
    var address = {
        City: msg.Address.City,
        State: msg.Address.State,
        Zipcode: msg.Address.Zipcode,
    };

    var newJob = new Job({
        EmployerID: msg.EmployerID,
        EmployerName: msg.EmployerName,
        EmployerProfileUrl: msg.EmployerProfileUrl,
        Postion: msg.Postion,
        Salary: msg.Salary,
        Type: msg.Type,
        PostDate: msg.PostDate,
        Deadline: msg.Deadline,
        Address: msg.Address,
        Description: msg.Description
    });

    newJob.save((error, jobData) => {  
        if (error) {
            callback(error, error)
        }
        else {
            console.log("creation of job is successful");
            callback(null, jobData);
        }
    });
}

exports.handle_request = handle_request;