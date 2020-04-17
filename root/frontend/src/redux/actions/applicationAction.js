import axios from "axios";
import { HOST_URL } from "./../../config/config";
import { GET_APPLICATIONS, ADD_APPLICATION, UPDATE_APPLICATION, APPLY } from './../actionTypes';

const ROOT_URL = HOST_URL + "/application";


export const applyForJob = (job, resume_file, student) => dispatch => {

    var studentSchema = {
        _id: student._id,
        Name:  student.FirstName + " " + student.LastName,
        ProfileUrl: student.ProfileUrl,
    };

    const formData = new FormData();
    formData.append('Student', JSON.stringify(studentSchema));
    formData.append('Job', JSON.stringify(job));
    formData.append('Status', "Submitted");
    formData.append('resume_file', resume_file);

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'multipart/form-data'
        }
    }


    axios.post(`${ROOT_URL}/apply`, formData, config)
        .then(response => {
            if (response.status === 200) {
                console.log("Application id: " + JSON.stringify(response.data))
                dispatch({
                    type: ADD_APPLICATION,
                    payload: response.data,
                });
            }
        }, error => {
            console.log("Application was not submitted.: " + JSON.stringify(error));
            dispatch({
                type: ADD_APPLICATION,
                payload: "Application already exists",
            })
        }).catch(err => {console.log(err)});
}


export const fetchApplications = (user, applicationData, page, limit) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside fetchApplications :", user.email);

    const applicationsData = {
        applications: []
    }
    if (!page) {
        page = 1;
    }
    if (!limit) {
        limit = 5;
    }
    if (applicationData) {
        if (page > applicationData.totalPages) {
            page = 1
        }
    }
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }

    axios.get(`${ROOT_URL}/get_applications?page=${page}&limit=${limit}&id=${user.id}&type=${user.user_type}`,config)
        .then(response => {
            console.log("application Data in actions", JSON.stringify(response));
            if (response.status == 200) {
                console.log("application Data in actions")
                dispatch({
                    type: GET_APPLICATIONS,
                    payload: response.data,
                })
            }
        }, error => {
            console.log(" get application error:", JSON.stringify(error));
            dispatch({
                type: GET_APPLICATIONS,
                payload: applicationsData,
            })
        });
};

export const changeApplyError = () => dispatch => {
    dispatch({
        type: APPLY,
        payload: "",
    })
}

export const changeApplicationStatus = (application, status) => dispatch => {
    axios.defaults.withCredentials = true;
    if(!application){
        return;
    }
    console.log("Application change status: ",JSON.stringify(application));
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    const data = {
        ApplicationId: application._id,
        Status: status,
    }
    application.Status = status
    console.log("Data change status: ",JSON.stringify(data));

    axios.post(`${ROOT_URL}/update_application_status`, data, config)
    .then((response)=>{
        if (response.status == 200) {
            console.log("application Data in actions")
            dispatch({
                type: UPDATE_APPLICATION,
                payload: application,
            })
        }

    },err=>{
        console.log("Error in application status change",err);
    }).catch(err=>{console.log(err)});

}