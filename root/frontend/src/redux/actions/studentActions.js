import axios from "axios";
import {
    STUDENT_DETAILS, UPDATE_EXPERIENCE_BY_ID, UPDATE_EDUCATION_BY_ID, ADD_EDUCATION, ADD_EXPERIENCE, UPDATE_STUDENT_FIRST_NAME, UPDATE_STUDENT_LAST_NAME,
    UPDATE_STUDENT_OBJECTIVE, ADD_SKILL, DELETE_SKILL, UPDATE_STUDENT_PHONENUMBER, UPDATE_STUDENT_PROFILE_PIC, UPDATE_STUDENT_PROFILE
} from './../actionTypes';

const jwt_decode = require('jwt-decode');
// const ROOT_URL = "http://52.8.254.75:3001/student";


const ROOT_URL = "http://localhost:3001/student";

export const studentDetails = (email) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside studentDetails :", email);
    if (localStorage.getItem("student_data")) {
        console.log("Already have student_data: " + localStorage.getItem("student_data"));
        return;
    }
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const studentData = {
        "first_name": "",
        "last_name": "",
        "email": email,
        "phone_number": "",
        "profile_picture": "",
        "education": [],
        "experience": [],
        "skills": [],
        "objective": "",
    }
    console.log("Url: ",`${ROOT_URL}`+"/email/"+`${email}`);
    axios.get(`${ROOT_URL}`+"/email/"+`${email}`, config)
        .then(response => {
            console.log("Student Data in actions", JSON.stringify(response));
            if (response.status == 200) {
                localStorage.setItem("student_data", response.data)
                console.log("Student Data in actions")
                dispatch({
                    type: STUDENT_DETAILS,
                    payload: response.data,
                })
            }
        },
            error => {
                console.log(" studentDetails error:", JSON.stringify(error));
                dispatch({
                    type: STUDENT_DETAILS,
                    payload: studentData,
                })
            })
}

export const updateStudentProfile = (studentData, updatedData) => dispatch => {
    console.log("studentData: ", JSON.stringify(studentData));
    console.log("updatedData: ", JSON.stringify(updatedData));
    for (const property in updatedData) {
        studentData[property] = updatedData[property];
    }
    console.log("studentData: ", JSON.stringify(studentData));
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    axios.post(`${ROOT_URL}/update_profile`, { data: studentData }, config)
        .then(response => {
            console.log(" Updated Student Data in actions", JSON.stringify(response));
            if (response.status == 200) {
                console.log("Updated Student Data in actions")
                dispatch({
                    type: UPDATE_STUDENT_PROFILE,
                    payload: response.data
                })
            }
        },
            error => {
                console.log(" Updated Student error:", JSON.stringify(error));
            });
}

export const updateStudentProfilePicture = (file, student_email) => dispatch => {
    const formData = new FormData();
    console.log("In student updateStudentProfilePicture");
    formData.append('email', student_email);
    formData.append('profileImage', file);
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            "Authorization": "Bearer " + token,
            'Content-Type': 'multipart/form-data',
        }
    }
    axios.post(`${ROOT_URL}/upload-profile`, formData, config)
        .then((response) => {
            dispatch({
                type: UPDATE_STUDENT_PROFILE_PIC,
                payload: response.data.profile_url,
            })
        }).catch((error) => {
            console.log("upload-profile error: " + JSON.stringify(error));
            dispatch({
                type: UPDATE_STUDENT_PROFILE_PIC,
                payload: "",
            })
        });
}

// export const getProfilePictureForStudent