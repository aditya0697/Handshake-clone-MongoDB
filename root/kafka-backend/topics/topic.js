let topicsToCreate = [
    {
        topic: 'student_signup',
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: 'employer_signup',
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: 'student_signin',
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: 'employer_signin',
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: 'get_student_details',
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: 'update_student_profile',
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: 'get_employer_details',
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: 'update_employer_profile',
        partitions: 1,
        replicationFactor: 1
    },
    {
        topic: 'get_students',
        partitions: 1,
        replicationFactor: 1
    },
    
];

module.exports = topicsToCreate;