import axios from "axios";
import {HOST_URL} from "./../../config/config";
import {ADD_JOB, UPDATE_JOB, GET_JOBS, FETCH_PROFILE_PICTURE_FOR_JOB} from './../actionTypes';


const ROOT_URL = HOST_URL + "job";
export const fetchJobs = (user,jobData,page,limit, employer_id) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside fetchJobs :", user.email);
    const jobsData = {
        jobs: []
    }
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    if(!page){
        page = 1;
    }
    if(!limit){
        limit = 5;
    }
    if(jobData){
        if (page > jobData.totalPages){
            page = 1;
        }
    }

    if (user.user_type == "student") {
        axios.get(`${ROOT_URL}/student?email=${user.email}&page=${page}&limit=${limit}`,config)
            .then(response => {
                // console.log("job Data in actions", JSON.stringify(response));
                if (response.status == 200) {
                    console.log("job Data in actions")
                    dispatch({
                        type: GET_JOBS,
                        payload: response.data,
                    })
                }
            }, error => {
                console.log(" getJobs error:", JSON.stringify(error));
                dispatch({
                    type: GET_JOBS,
                    payload: jobsData,
                })
            });
    } else {
        axios.get(`${ROOT_URL}/employer?employer_id=${employer_id}&page=${page}&limit=${limit}`,config)
            .then(response => {
                // console.log("job Data in actions", JSON.stringify(response));
                if (response.status == 200) {
                    console.log("job Data in actions")
                    dispatch({
                        type: GET_JOBS,
                        payload: response.data,
                    })
                }
            }, error => {
                console.log(" getJobs error:", JSON.stringify(error));
                dispatch({
                    type: GET_JOBS,
                    payload: jobsData,
                })
            });
    }
};

export const updateJobById = (job, index) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside updateJobById :", JSON.stringify(job));
  
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    axios.post(`${ROOT_URL}/update_job`,config,job)
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

export const addJob = (job, employerData) => dispatch => {
    job.EmployerID = employerData.Email;
    job.EmployerName = employerData.EmployerName;
    job.EmployerProfileUrl = employerData.ProfileUrl;

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    console.log(" Inside addJob :", JSON.stringify(job));

    axios.post(`${ROOT_URL}/add_job`, job, config)
        .then(response => {
            console.log("job Data in actions", JSON.stringify(response));
            if (response.status == 200) {
                job._id = response.data._id;
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




