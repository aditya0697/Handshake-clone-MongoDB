var Employer = require('./../../models/employer/EmployerModel');
var EmployerAuth = require('./../../models/employer/EmployerAuthModel');
var bcrypt = require("bcrypt");

function handle_request(msg, callback) {
    console.log("In createCourse kafka backend");
    if (!msg.password) {
        callback("No Password", "no password");
        return;
    }
    const address = {
        Street: msg.street,
        Apt: msg.apt_name,
        City: msg.city,
        State: msg.state,
        Zipcode: msg.zip_code,
    };

    var newEmployer = new Employer({
        Email: msg.email,
        EmployerName: msg.comapnay_name,
        Address: address,
    });
    var newEmployerAuth = new EmployerAuth({
        Email: msg.email,
        Password: bcrypt.hashSync(msg.password, 10),
    })

    Employer.findOne({ "Email": newEmployer.Email }, (error, employer) => {
        if (error) {
            callback(error, error)
        }
        if (employer) {
            console.log("Employer: ", JSON.stringify(employer));
            callback("Employer already exists", "Employer already exists");
        }
        else {
            newEmployer.save((error, employerData) => {
                if (error) {
                    callback(error, error)
                }
                else {
                    newEmployerAuth.save((err, loginData) => {
                        if (err) {
                            callback(err, err)
                        }
                        else {
                            console.log("signup successful");
                            callback(null, loginData);
                        }
                    })
                }
            });
        }
    });
}

exports.handle_request = handle_request;