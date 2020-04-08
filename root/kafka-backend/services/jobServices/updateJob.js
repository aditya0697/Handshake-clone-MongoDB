var Job = require('./../../models/job/JobModel');

function handle_request(msg, callback) {
    console.log("In Update student profile backend");
    console.log("msg: ",JSON.stringify(msg));
    if(!msg){
        callback("Job not found null", "Job Not Found");
        return;
    }
    Job.findOneAndUpdate({ "_id": msg._id },msg,{new: true, upsert: true, setDefaultsOnInsert: true}).exec((error, job) => {
        if (error) {
            callback(error, error)
        }if(job) {
            console.log("Employer: ", JSON.stringify(job));
            callback(null, job);
        }else{
            callback("job not found", "job Not Found");
        }
    });
}

exports.handle_request = handle_request