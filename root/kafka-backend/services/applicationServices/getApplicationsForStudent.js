var Application = require('./../../models/job/ApplicationModel');

function handle_request(msg, callback) {
    console.log("In Get Students kafka backend");
    const options = {
        page: msg.page,
        limit: msg.limit,
    };
    console.log("msg: ", JSON.stringify(msg));
    Application.paginate({ "Student._id" : msg.id}, options, function (err, result) {
        if (err) {
            console.log("Error: ", err);
            callback(err, err)
        }
        else {
            console.log("Students found");
            callback(null, result);
        }
    });
}

exports.handle_request = handle_request;