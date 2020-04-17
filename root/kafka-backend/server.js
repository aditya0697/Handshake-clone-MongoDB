const {STUDENT_SIGNIN, STUDENT_SIGNUP, GET_STUDENT_DETAILS, UPDATE_STUDENT_PROFILE, GET_STUDENTS,
    EMPLOYER_SIGNIN, EMPLOYER_SIGNUP, GET_EMPLOYER_DETAILS, UPDATE_EMPLOYER_PROFILE,
    CREATE_JOB, UPDATE_JOB, GET_JOBS_EMPLOYER, GET_JOBS_STUDENT, 
    APPLY_JOB, UPDATE_APPLICATION_STATUS, WITHDRAW_APPLICATION, GET_APPLICATIONS_FOR_EMPLOYER, GET_APPLICATIONS_FOR_STUDENT,
    CREATE_CONVERSATION, CREATE_MESSAGE, ADD_MESSAGE_TO_CONVERSATION, GET_CONVERSATIONS, GET_CHAT,
    CREATE_EVENT, GET_EVENT_FOR_EMPLOYRE, GET_EVENT_FOR_STUDENT, UPDATE_EVENT,  REGISTER,
    GET_REGISTRATION_FOR_EMPLOYRE, GET_REGISTRATION_FOR_STUDENT,
 } =  require('./topics/topic_names');

var connection = new require('./kafka/Connection');
const { mongoDB } = require('./Utils/config');
var mongoose = require('mongoose');
var topicsToCreate =  require('./topics/topic'); 
var StudentSignup = require('./services/studentServices/signup');
var GetStudentDetails = require('./services/studentServices/getStudentDetails');
var UpdateStudentProfile = require('./services/studentServices/updateProfile');
var EmployerSignup = require('./services/employerServices/signup');
var GetEmployerDetails = require('./services/employerServices/getEmployerDetails');
var UpdateEmployerDetails = require('./services/employerServices/updateProfile');
var CreateJob = require('./services/jobServices/createJob');
var UpdateJob = require('./services/jobServices/updateJob');
var GetJobsForStudent = require('./services/jobServices/getJobsStudent');
var GetJobsForEmployer = require('./services/jobServices/getJobsEmployer');
var GetStudents = require('./services/studentServices/getStudents');
var ApplyJob = require('./services/applicationServices/applyJob');
var UpdateApplicationStatus = require('./services/applicationServices/updateApplicationStatus');
var WithdrawApplication = require('./services/applicationServices/withdrawApplication');
var GetApplicationsForStudent = require('./services/applicationServices/getApplicationsForStudent');
var GetApplicationsForEmployer = require('./services/applicationServices/getApplicationsForEmployer');
var CreateConversation = require('./services/messageServices/createConversation');
var GetConversations = require('./services/messageServices/getConversations');
var GetChat = require('./services/messageServices/getChat');
var AddMessageToConversation = require('./services/messageServices/addMessagesToConversations');
var CreateEvent = require('./services/eventServices/createEvent');
var GetEventForStudent = require('./services/eventServices/getEventForStudent');
var GetEventsForEmployer = require('./services/eventServices/getEventsForEmployer');
var UpdateEvent = require('./services/eventServices/updateEvent');

var Register = require('./services/registratitonServices/registerForEvent');
var GetRegistrationsForStudent = require('./services/registratitonServices/getRegistrationsForStudent');
var GetRegistrationsForEmployer = require('./services/registratitonServices/getRegistrationsForEmployer');


// const producer = connection.getProducer(); 
// const consumer = connection.getConsumer();
const client = connection.getClient();
var options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 400,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        
        console.log(`MongoDB Connected`);
    }
});
 

// Create Topics 

// var topicsToCreate = [{ 
//     topic: 'test-4',
//     partitions: 1,
//     replicationFactor: 0,
//   }];

// console.log("Topics: ",JSON.stringify(topicsToCreate));
client.createTopics(topicsToCreate, true, function (err, data) { 
    if(err){
        console.log("In Topic Creation: ",err);
        return;
    } 
    console.log("Topics are created: ");
    console.log(data);
});


function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}  

handleTopicRequest(STUDENT_SIGNUP,StudentSignup);
handleTopicRequest(GET_STUDENT_DETAILS, GetStudentDetails);
handleTopicRequest(UPDATE_STUDENT_PROFILE, UpdateStudentProfile);
handleTopicRequest(EMPLOYER_SIGNUP,EmployerSignup);
handleTopicRequest(GET_EMPLOYER_DETAILS, GetEmployerDetails);
handleTopicRequest(UPDATE_EMPLOYER_PROFILE, UpdateEmployerDetails); 
handleTopicRequest(CREATE_JOB, CreateJob);
handleTopicRequest(UPDATE_JOB, UpdateJob);
handleTopicRequest(GET_JOBS_STUDENT, GetJobsForStudent);
handleTopicRequest(GET_JOBS_EMPLOYER, GetJobsForEmployer)
handleTopicRequest(GET_STUDENTS,GetStudents);
handleTopicRequest(APPLY_JOB,ApplyJob);
handleTopicRequest(UPDATE_APPLICATION_STATUS,UpdateApplicationStatus);
handleTopicRequest(WITHDRAW_APPLICATION,WithdrawApplication);
handleTopicRequest(GET_APPLICATIONS_FOR_EMPLOYER,GetApplicationsForEmployer); 
handleTopicRequest(GET_APPLICATIONS_FOR_STUDENT,GetApplicationsForStudent);
handleTopicRequest(CREATE_CONVERSATION, CreateConversation);
handleTopicRequest(GET_CONVERSATIONS, GetConversations);
handleTopicRequest(GET_CHAT,GetChat);
handleTopicRequest(ADD_MESSAGE_TO_CONVERSATION, AddMessageToConversation);
handleTopicRequest(CREATE_EVENT, CreateEvent);
handleTopicRequest(GET_EVENT_FOR_EMPLOYRE, GetEventsForEmployer);
handleTopicRequest(GET_EVENT_FOR_STUDENT, GetEventForStudent); 
handleTopicRequest(UPDATE_EVENT, UpdateEvent);
handleTopicRequest(REGISTER, Register);
handleTopicRequest(GET_REGISTRATION_FOR_EMPLOYRE, GetRegistrationsForEmployer);
handleTopicRequest(GET_REGISTRATION_FOR_STUDENT, GetRegistrationsForStudent);
