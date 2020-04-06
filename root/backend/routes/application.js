var express = require('express');
var router = express.Router();


// router.post('/apply', resumeUpload, (req, res, next) => {
// });

router.get("/employer/get_applications/:employer_email", function (req, res) {
});

router.get("/student/get_applications/:student_email", function (req, res) {
});


module.exports = router;
