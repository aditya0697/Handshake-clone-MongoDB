var connection = new require('./kafka/Connection');
const { mongoDB } = require('./Utils/config');
var mongoose = require('mongoose');
var topicsToCreate =  require('./topics/topic');
var StudentSignup = require('./services/studentServices/signup');
var GetStudentDetails = require('./services/studentServices/getStudentDetails');
var UpdateStudentProfile = require('./services/studentServices/updateProfile');
var EmployerSignup = 

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
//     topic: 'student_signup',
//     partitions: 1,
//     replicationFactor: 2
//   }];
  
client.createTopics(topicsToCreate, function (err, data) {
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


handleTopicRequest("student_signup",StudentSignup);
handleTopicRequest("get_student_details", GetStudentDetails);
handleTopicRequest("update_student_profile", UpdateStudentProfile);