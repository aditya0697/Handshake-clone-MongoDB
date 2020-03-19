import axios from "axios";
import {
    STUDENT_DETAILS, UPDATE_EXPERIENCE_BY_ID, UPDATE_EDUCATION_BY_ID, ADD_EDUCATION, ADD_EXPERIENCE, UPDATE_STUDENT_FIRST_NAME, UPDATE_STUDENT_LAST_NAME,
    UPDATE_STUDENT_OBJECTIVE, ADD_SKILL, DELETE_SKILL, UPDATE_STUDENT_PHONENUMBER, UPDATE_STUDENT_PROFILE_PIC
} from './../actionTypes';


const ROOT_URL = "http://52.8.254.75:3001/student";
const HOST_URL = "http://52.8.254.75:3001";

// const ROOT_URL = "http://localhost:3001/student";
// const HOST_URL = "http://localhost:3001";

export const studentDetails = (email) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside studentDetails :", email);
    if (localStorage.getItem("student_data")) {
        console.log("Already have student_data: " + localStorage.getItem("student_data"));
        return;
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
    axios.get(`${ROOT_URL}/${email}`)
        .then(response => {
            console.log("Student Data in actions", JSON.stringify(response));
            if (response.status == 200) {
                localStorage.setItem("student_data", response.data)
                console.log("Student Data in actions")
                dispatch({
                    type: STUDENT_DETAILS,
                    payload: response.data.data
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

export const updateEducationById = (education, index) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside updateEducationById :", JSON.stringify(education));
    axios.post(`${ROOT_URL}/update_education`, education)
        .then(response => {
            console.log("Student Data in actions", JSON.stringify(response));
            if (response.status == 200) {
                dispatch({
                    type: UPDATE_EDUCATION_BY_ID,
                    payload: {
                        "index": parseInt(index),
                        "education": education,
                    }
                })
            }
        },
            error => {
                console.log(" studentDetails error:", JSON.stringify(error));
                dispatch({
                    type: STUDENT_DETAILS,
                    payload: "Server Error!!"
                })
            });
};

export const addEducation = (education, email) => dispatch => {
    console.log(" Inside addEducation :", JSON.stringify(education));
    axios.defaults.withCredentials = true;
    const data = {
        education,
        email,
    }
    console.log(" Inside addEducation :", JSON.stringify(data));
    axios.post(`${ROOT_URL}/add_education`, data)
        .then(response => {
            console.log("Student Data in actions", JSON.stringify(response));
            if (response.status == 200) {
                education.edu_id = response.data.edu_id;
                dispatch({
                    type: ADD_EDUCATION,
                    payload: education,
                })
            }
        },
        error => {
                console.log(" studentDetails error:", JSON.stringify(error));
                dispatch({
                    type: ADD_EDUCATION,
                    payload: education,
                })
        });
}


export const updateExperienceById = (experience, index) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside updateEducationById :", JSON.stringify(experience));
    axios.post(`${ROOT_URL}/update_experience`,experience)
        .then(response => {
            console.log("Student Data in actions",JSON.stringify(response));
            if (response.status == 200) {
                dispatch({
                    type: UPDATE_EXPERIENCE_BY_ID,
                    payload: {
                        "index": parseInt(index),
                        "experience": experience,
                    }
                })
            }
        },
        error => {
            console.log(" updateExperienceById error:", JSON.stringify(error));
            dispatch({
                type: STUDENT_DETAILS,
                payload: "Server Error!!"
            })
        });
}

export const addExperience = (experience, email) => dispatch => {
    console.log(" Inside addExperience :", JSON.stringify(experience));
    axios.defaults.withCredentials = true;
    const data = {
        experience,
        email,
    }
    console.log(" Inside addExperience :", JSON.stringify(data));
    axios.post(`${ROOT_URL}/add_experience`, data)
        .then(response => {
            console.log("Student Data in actions", JSON.stringify(response));
            if (response.status == 200) {
                experience.exp_id = response.data.exp_id;
                dispatch({
                    type: ADD_EXPERIENCE,
                    payload: experience,
                })
            }
        },
        error => {
                console.log(" studentDetails error:", JSON.stringify(error));
                dispatch({
                    type: ADD_EXPERIENCE,
                    payload: experience,
                })
        });
}

export const updateStudentFirstName = (first_name) => dispatch => {
    dispatch({
        type: UPDATE_STUDENT_FIRST_NAME,
        payload: first_name,
    })
}

export const updateStudentLastName = (last_name) => dispatch => {
    dispatch({
        type: UPDATE_STUDENT_LAST_NAME,
        payload: last_name,
    })
}

export const updateObjective = (objective, email) => dispatch => {
    

    dispatch({
        type: UPDATE_STUDENT_OBJECTIVE,
        payload: objective,
    })
}

export const addSkill = (skill) => dispatch => {
    console.log("Inside addSkill: " + skill)
    dispatch({
        type: ADD_SKILL,
        payload: skill,
    })
}
export const deleteSkill = (skill) => dispatch => {
    dispatch({
        type: DELETE_SKILL,
        payload: skill,
    })
}

export const updateStudentPhoneNumber = (phone_number) => dispatch => {
    dispatch({
        type: UPDATE_STUDENT_PHONENUMBER,
        payload: phone_number,
    })
}

export const updateStudentProfilePicture = (file, student_email) => dispatch=> {
    const formData = new FormData();
    formData.append('user_email', student_email);
    formData.append('user_type', "student");
    formData.append('profileImg', file);
    axios.post(`${HOST_URL}/upload-profile`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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