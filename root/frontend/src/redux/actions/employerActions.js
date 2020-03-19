import axios from "axios";
import { EMPLOYER_DETAILS, UPDATE_EMPLOYER_ADDRESS, UPDATE_EMPLOYER_DISCRIPTION, ADD_EMPLOYER_DISCRIPTION, 
    UPDATE_EMPLOYER_PHONENUMBER, UPDATE_EMPLOYER_NAME, UPDATE_EMPLOYER_PROFILE_PIC, FETCH_EMPLOPYER_PROFILE_PIC } from './../actionTypes';

const ROOT_URL = "http://52.8.254.75:3001/employer";
const HOST_URL = "http://52.8.254.75:3001";

// const ROOT_URL = "http://localhost:3001/employer";
// const HOST_URL = "http://localhost:3001";

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


export const updateEmployerPhoneNumber = (phone_number) => dispatch => {
    dispatch({
        type: UPDATE_EMPLOYER_PHONENUMBER,
        payload: phone_number,
    })
}

export const updateEmployerDiscription = (discription) => dispatch => {
    dispatch({
        type: UPDATE_EMPLOYER_DISCRIPTION,
        payload: discription,
    })
}

export const updateEmployerAddress = (address) => dispatch => {
    dispatch({
        type: UPDATE_EMPLOYER_ADDRESS,
        payload: address,
    })
}

export const updateEmployerName = (name) => dispatch => {
    dispatch({
        type: UPDATE_EMPLOYER_NAME,
        payload: name,
    })
}

export const updateEmployerProfilePicture = (file, employer_email) => dispatch=> {
    const formData = new FormData();
    formData.append('user_email', employer_email);
    formData.append('user_type', "employer");
    formData.append('profileImg', file);
    // "http://localhost:3001/public/uploads/profile_pictures/IMAGE-1583906877260.jpg"
    axios.post( `${HOST_URL}` + "/upload-profile", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((response) => {
        dispatch({
            type: UPDATE_EMPLOYER_PROFILE_PIC,
            payload: response.data.profile_url,
        })
    }).catch((error) => {
        console.log("upload-profile error: " + JSON.stringify(error));
        dispatch({
            type: UPDATE_EMPLOYER_PROFILE_PIC,
            payload: "",
        })
    });
}

