import axios from "axios";
import {ADD_JOB, UPDATE_JOB, GET_JOBS, FETCH_PROFILE_PICTURE_FOR_JOB} from './../actionTypes';

const ROOT_URL = "http://52.8.254.75:3001/job";
// const ROOT_URL = "http://localhost:3001/job";
export const fetchJobs = (user) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside fetchJobs :", user.email);
    const jobData = {
        jobs: []
    }
    if (user.user_type == "student") {
        axios.get(`${ROOT_URL}/student/${user.email}`)
            .then(response => {
                console.log("job Data in actions", JSON.stringify(response));
                if (response.status == 200) {
                    console.log("job Data in actions")
                    dispatch({
                        type: GET_JOBS,
                        payload: response.data.jobs,
                    })
                }
            }, error => {
                console.log(" getJobs error:", JSON.stringify(error));
                dispatch({
                    type: GET_JOBS,
                    payload: jobData,
                })
            });
    } else {
        axios.get(`${ROOT_URL}/employer/${user.email}`)
            .then(response => {
                console.log("job Data in actions", JSON.stringify(response));
                if (response.status == 200) {
                    console.log("job Data in actions")
                    dispatch({
                        type: GET_JOBS,
                        payload: response.data.jobs,
                    })
                }
            }, error => {
                console.log(" getJobs error:", JSON.stringify(error));
                dispatch({
                    type: GET_JOBS,
                    payload: jobData,
                })
            });
    }
};

export const updateJobById = (job, index) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside updateJobById :", JSON.stringify(job));
    axios.post(`${ROOT_URL}/update_job`,job)
        .then(response => {
            console.log("Student Data in actions",JSON.stringify(response));
            if (response.status == 200) {
                dispatch({
                    type: UPDATE_JOB,
                    payload: {
                        "index": parseInt(index),
                        "job": job,
                    }
                })
            }
        },
        error => {
            console.log(" updateJobById error:", JSON.stringify(error));
        });
}

export const addJob = (job, employer_email) => dispatch => {
    console.log(" Inside addJob :", JSON.stringify(job));
    axios.defaults.withCredentials = true;
    const data = {
        job,
        email: employer_email,
    }
    console.log(" Inside addJob :", JSON.stringify(data));
    axios.post(`${ROOT_URL}/add_job`, data)
        .then(response => {
            console.log("job Data in actions", JSON.stringify(response));
            if (response.status == 200) {
                job.job_id = response.data.job_id;
                dispatch({
                    type: ADD_JOB,
                    payload: job,
                })
            }
        },
        error => {
            console.log(" addJob error:", JSON.stringify(error));
        });
}

export const fetchProfileUrlForEmployerForJob = (job_id) => dispatch => {
    console.log(" job_id:", job_id);
    axios.get(`${ROOT_URL}/get_profile_picture/${job_id}`)
    .then(response => {
        console.log("job Data in actions", JSON.stringify(response));
        if (response.status == 200) {
            console.log("job Data in actions")
            dispatch({
                type: FETCH_PROFILE_PICTURE_FOR_JOB,
                payload: {
                    job_id:job_id,
                    profile_picture: response.data.profile_picture,
                }
            })
        }
    }, error => {
        console.log(" getJobs error:", JSON.stringify(error));
    });
}



