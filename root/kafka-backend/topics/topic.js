const {STUDENT_SIGNIN, STUDENT_SIGNUP, GET_STUDENT_DETAILS, UPDATE_STUDENT_PROFILE, GET_STUDENTS,
    EMPLOYER_SIGNIN, EMPLOYER_SIGNUP, GET_EMPLOYER_DETAILS, UPDATE_EMPLOYER_PROFILE,
    CREATE_JOB, UPDATE_JOB, GET_JOBS_EMPLOYER, GET_JOBS_STUDENT,  } =  require('./topic_names');

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
];

module.exports = topicsToCreate;