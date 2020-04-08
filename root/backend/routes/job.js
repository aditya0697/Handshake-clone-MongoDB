const { CREATE_JOB, UPDATE_JOB, GET_JOBS_STUDENT, GET_JOBS_EMPLOYER } = require('./../kafka/topics/topic_names');

var express = require('express');
var router = express.Router();
var kafka = require('./../kafka/client');
var Job = require('./../models/job/JobModel');
const passport = require('passport');
const { checkAuth, auth } = require('./../utils/passport');
auth();

/* GET users listing. */


router.post('/add_job', function (req, res) {
    console.log("Inside create job");
    const job = req.body;
    job.PostDate = new Date();
    job.Deadline = new Date();
    job.Salary = 120000;
    console.log("--------- Job data: ", JSON.stringify(req.body));

    kafka.make_request(CREATE_JOB, job, function (err, results) {
        console.log('in result');
        console.log(results);
        console.log(err);
        if (err) {
            console.log("Inside err");
            res.status(404);
            res.json({
                status: "error",
                msg: err,
            })
            res.end();
            return;
        } else {
            console.log("Inside data");
            console.log("Data:", JSON.stringify(results));
            res.json(results)
            res.status(200).end();
            res.end();
            return;
        }
    });
});

router.post('/update_job', function (req, res) {
    console.log("data: ", JSON.stringify(req.body));
    kafka.make_request(UPDATE_JOB, req.body, function (err, results) {
        console.log('in result', JSON.stringify(err));
        if (err) {
            console.log("Inside err");
            res.status(404);
            res.json({
                status: "error",
                msg: err,
            })
            res.end();
        } else {
            console.log("Inside data");
            console.log("Data:", JSON.stringify(results));
            res.json(results)
            res.end();
            return;
        }
    });
});

router.get('/employer/:employer_email', function (req, res) {
});

router.get('/student/:student_email', function (req, res) {
});

router.get('/get_profile_picture/:employer_id', function (req, res) {
});



module.exports = router;
