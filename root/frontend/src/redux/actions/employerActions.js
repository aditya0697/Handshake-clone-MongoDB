import axios from "axios";
import { EMPLOYER_DETAILS, UPDATE_EMPLOYER_PROFILE, UPDATE_EMPLOYER_PROFILE_PIC } from './../actionTypes';

// const ROOT_URL = "http://52.8.254.75:3001/employer";


const ROOT_URL = "http://localhost:3001/employer";

export const employerDetails = (email) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside studentDetails :", email);
    if (localStorage.getItem("student_data")) {
        console.log("Already have student_data: " + localStorage.getItem("student_data"));
        return;
    }
    const employerData = {
        "comapnay_name": "",
        "email": email,
        "phone_number": "",
        "profile_picture": "",
        "address": "",
        "discription": "",
    }
    axios.get(`${ROOT_URL}/${email}`)
        .then(response => {
            console.log("Employer Data in actions", JSON.stringify(response));
            if (response.status == 200) {
                localStorage.setItem("employer_data", response.data)
                console.log("Employer Data in actions")
                dispatch({
                    type: EMPLOYER_DETAILS,
                    payload: response.data.data
                })
            }
        },
            error => {
                console.log(" studentDetails error:", JSON.stringify(error));
                dispatch({
                    type: EMPLOYER_DETAILS,
                    payload: employerData,
                })
            })
}

export const updateEmployerProfile = (employerData, updatedData) => dispatch => {
    console.log("EmployerData: ", JSON.stringify(employerData));
    console.log("updatedData: ", JSON.stringify(updatedData));
    for (const property in updatedData) {
        employerData[property] = updatedData[property];
    }
    console.log("employerData: ", JSON.stringify(employerData));
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    axios.post(`${ROOT_URL}/update_profile`, { data: employerData }, config)
        .then(response => {
            console.log(" Updated Student Data in actions", JSON.stringify(response));
            if (response.status == 200) {
                console.log("Updated Student Data in actions")
                dispatch({
                    type: UPDATE_EMPLOYER_PROFILE,
                    payload: response.data
                })
            }
        },
            error => {
                console.log(" Updated Student error:", JSON.stringify(error));
            });
}

export const updateEmployerProfilePicture = (file, employer_email) => dispatch=> {
    const formData = new FormData();
    formData.append('email', employer_email);
    formData.append('user_type', "employer");
    formData.append('profileImage', file);
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            "Authorization": "Bearer " + token,
            'Content-Type': 'multipart/form-data',
        }
    }
    axios.post( `${ROOT_URL}` + "/upload-profile", formData, config)
    .then((response) => {
        dispatch({
            type: UPDATE_EMPLOYER_PROFILE_PIC,
            payload: response.data.ProfileUrl,
        })
    }).catch((error) => {
        console.log("upload-profile error: " + JSON.stringify(error));
        dispatch({
            type: UPDATE_EMPLOYER_PROFILE_PIC,
            payload: "",
        })
    });
}

