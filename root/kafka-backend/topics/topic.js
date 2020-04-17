const {STUDENT_SIGNIN, STUDENT_SIGNUP, GET_STUDENT_DETAILS, UPDATE_STUDENT_PROFILE, GET_STUDENTS,
    EMPLOYER_SIGNIN, EMPLOYER_SIGNUP, GET_EMPLOYER_DETAILS, UPDATE_EMPLOYER_PROFILE,
    CREATE_JOB, UPDATE_JOB, GET_JOBS_EMPLOYER, GET_JOBS_STUDENT,
    APPLY_JOB, UPDATE_APPLICATION_STATUS, WITHDRAW_APPLICATION, GET_APPLICATIONS_FOR_EMPLOYER, GET_APPLICATIONS_FOR_STUDENT,
    CREATE_CONVERSATION, ADD_MESSAGE_TO_CONVERSATION,
    CREATE_MESSAGE, GET_CONVERSATIONS, GET_CHAT,
    CREATE_EVENT, GET_EVENT_FOR_EMPLOYRE, GET_EVENT_FOR_STUDENT, UPDATE_EVENT,  REGISTER,
    GET_REGISTRATION_FOR_EMPLOYRE, GET_REGISTRATION_FOR_STUDENT } =  require('./topic_names');

    // let topicsToCreate = [STUDENT_SIGNIN, STUDENT_SIGNUP, GET_STUDENT_DETAILS, UPDATE_STUDENT_PROFILE, GET_STUDENTS,
    //     EMPLOYER_SIGNIN, EMPLOYER_SIGNUP, GET_EMPLOYER_DETAILS, UPDATE_EMPLOYER_PROFILE,
    //     CREATE_JOB, UPDATE_JOB, GET_JOBS_EMPLOYER, GET_JOBS_STUDENT,
    //     APPLY_JOB, UPDATE_APPLICATION_STATUS, WITHDRAW_APPLICATION, GET_APPLICATIONS_FOR_EMPLOYER, GET_APPLICATIONS_FOR_STUDENT,
    //     CREATE_CONVERSATION, ADD_MESSAGE_TO_CONVERSATION,
    //     CREATE_MESSAGE, GET_CONVERSATIONS, GET_CHAT,
    //     CREATE_EVENT, GET_EVENT_FOR_EMPLOYRE, GET_EVENT_FOR_STUDENT, UPDATE_EVENT,  REGISTER,
    //     GET_REGISTRATION_FOR_EMPLOYRE, GET_REGISTRATION_FOR_STUDENT];
let topicsToCreate = [
    {
        topic: STUDENT_SIGNUP,
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: EMPLOYER_SIGNUP,
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: STUDENT_SIGNIN,
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: EMPLOYER_SIGNIN,
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: GET_STUDENT_DETAILS,
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: UPDATE_STUDENT_PROFILE,
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: GET_EMPLOYER_DETAILS,
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: UPDATE_EMPLOYER_PROFILE,
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: GET_STUDENTS,
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: CREATE_JOB,
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: UPDATE_JOB,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: GET_JOBS_STUDENT,
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: GET_JOBS_EMPLOYER,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: APPLY_JOB,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: UPDATE_APPLICATION_STATUS,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: WITHDRAW_APPLICATION,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: GET_APPLICATIONS_FOR_STUDENT,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: GET_APPLICATIONS_FOR_EMPLOYER,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: CREATE_CONVERSATION,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: CREATE_MESSAGE,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: GET_CONVERSATIONS,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: GET_CHAT,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: ADD_MESSAGE_TO_CONVERSATION,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: CREATE_EVENT,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: GET_EVENT_FOR_EMPLOYRE,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: GET_EVENT_FOR_STUDENT,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: UPDATE_EVENT,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: REGISTER,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: GET_REGISTRATION_FOR_EMPLOYRE,
        partitions: 1,
        replicationFactor: 1 
    },
    {
        topic: GET_REGISTRATION_FOR_STUDENT,
        partitions: 1,
        replicationFactor: 1 
    },
];


module.exports = topicsToCreate;