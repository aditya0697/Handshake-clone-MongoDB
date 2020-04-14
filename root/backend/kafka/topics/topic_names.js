const CREATE_JOB = "create_job";
const UPDATE_JOB = "update_job";
const GET_JOBS_STUDENT = "get_jobs_student";
const GET_JOBS_EMPLOYER = "get_jobs_employer";

const STUDENT_SIGNUP = "student_signup";
const EMPLOYER_SIGNUP = "employer_signup";
const STUDENT_SIGNIN = "student_signin";
const UPDATE_STUDENT_PROFILE = "update_student_profile";

const EMPLOYER_SIGNIN = "employer_signin";
const GET_STUDENT_DETAILS = "get_student_details";
const GET_EMPLOYER_DETAILS = "get_employer_details";
const UPDATE_EMPLOYER_PROFILE = "update_employer_profile";

const GET_STUDENTS = "get_students";

const APPLY_JOB = "apply_job";
const UPDATE_APPLICATION_STATUS = "upadte_application_status";
const WITHDRAW_APPLICATION = "withdraw_application";
const GET_APPLICATIONS_FOR_STUDENT = "get_applications_for_student";
const GET_APPLICATIONS_FOR_EMPLOYER = "get_applications_for_employer";

const CREATE_CONVERSATION = "create_conversation";
const ADD_MESSAGE_TO_CONVERSATION = "add_message_to_conversation";
const CREATE_MESSAGE = "create_message";
const GET_CONVERSATIONS = "get_conversations";
const GET_CHAT = "get_chat";


module.exports = {STUDENT_SIGNIN, STUDENT_SIGNUP, GET_STUDENT_DETAILS, UPDATE_STUDENT_PROFILE, GET_STUDENTS,
    EMPLOYER_SIGNIN, EMPLOYER_SIGNUP, GET_EMPLOYER_DETAILS, UPDATE_EMPLOYER_PROFILE,
    CREATE_JOB, UPDATE_JOB, GET_JOBS_EMPLOYER, GET_JOBS_STUDENT, APPLY_JOB, UPDATE_APPLICATION_STATUS, WITHDRAW_APPLICATION,
    GET_APPLICATIONS_FOR_EMPLOYER, GET_APPLICATIONS_FOR_STUDENT, CREATE_CONVERSATION, ADD_MESSAGE_TO_CONVERSATION, CREATE_CONVERSATION,
    CREATE_MESSAGE, GET_CONVERSATIONS, GET_CHAT };