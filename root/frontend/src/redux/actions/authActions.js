import axios from "axios";
import {HOST_URL} from "./../../config/config";
import { AUTHENTICATE_STUDENT, AUTHENTICATE_EMPLOYER, SIGN_OUT } from './../actionTypes';
import storage from 'redux-persist/lib/storage';
import store from './../store'
const jwt_decode = require('jwt-decode');

// const ROOT_URL = "http://52.8.254.75:3001";
const ROOT_URL = HOST_URL;
export const studentSignIn = (credentials) => dispatch => {
    axios.defaults.withCredentials = true
    axios.post(`${ROOT_URL}/student/signin`, credentials)
        .then(response => {
            console.log("studentSignIn Status:", JSON.stringify(response.data));
            if (response.status === 200) {
                var token = response.data.split(' ')[1];
                var decoded = jwt_decode(token);
                console.log("Data: ", JSON.stringify(decoded));
                localStorage.setItem("token", token);
                console.log("Data in actions")
                dispatch({
                    type: AUTHENTICATE_STUDENT,
                    payload: {
                        'email': decoded.Email,
                        'id':decoded._id,
                        'message': "login successful",
                        'error_message': "",
                    }
                })
            }
        },
            error => {
                console.log("studentSignIn error:", JSON.stringify(error));
                dispatch({
                    type: AUTHENTICATE_STUDENT,
                    payload: {
                        'email': credentials.username,
                        'id': "",
                        'message': "Invalid Username or Password",
                        'error_message': "Invalid Username or Password",
                    }

                })
            });
};

export const studentSignUp = (student_data) => dispatch => {
    axios.defaults.withCredentials = true
    axios.post(`${ROOT_URL}/student_signup`, student_data)
        .then((response) => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                var token = response.data.split(' ')[1];
                var decoded = jwt_decode(token);
                console.log("Data: ", JSON.stringify(decoded));
                localStorage.setItem("token", response.JWT);
                dispatch({
                    type: AUTHENTICATE_STUDENT,
                    payload: {
                        'email': decoded.Email,
                        'id': decoded._id,
                        'message': response.data,
                        'error_message': "",
                    }
                });
            }
        },
            (error) => {
                dispatch({
                    type: AUTHENTICATE_STUDENT,
                    payload: {
                        'email': "",
                        'id': "",
                        'message': "Invalid Username or Password",
                        'error_message': "User already present",

                    }
                });
            });
}

export const employerSignIn = (credentials) => dispatch => {
    axios.defaults.withCredentials = true
    axios.post(`${ROOT_URL}/employer/signin`, credentials)
        .then(response => {
            console.log("employerSignIn Status:", JSON.stringify(response.data))
            if (response.status == 200) {
                var token = response.data.split(' ')[1];
                var decoded = jwt_decode(token);
                console.log("Data: ", JSON.stringify(decoded));
                localStorage.setItem("token", token);
                console.log("Data in actions")
                dispatch({
                    type: AUTHENTICATE_EMPLOYER,
                    payload: {
                        'email': decoded.Email,
                        'id':decoded._id,
                        'message': "login successful",
                        'error_message': "",
                    }
                })
            }
        },
            error => {
                console.log("employerSignIn error:", JSON.stringify(error));
                dispatch({
                    type: AUTHENTICATE_EMPLOYER,
                    payload: {
                        'email': credentials.username,
                        'id':"",
                        'message': "Invalid Username or Password",
                        'error_message': "Invalid Username or Password",
                    }
                })
            });
};


export const employerSignUp = (employer_data) => dispatch => {
    axios.defaults.withCredentials = true
    axios.post(`${ROOT_URL}/employer/signup`, employer_data)
        .then((response) => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                var token = response.data.split(' ')[1];
                var decoded = jwt_decode(token);
                console.log("Data: ", JSON.stringify(decoded));
                localStorage.setItem("token", token);
                dispatch({
                    type: AUTHENTICATE_EMPLOYER,
                    payload: {
                        'email': decoded.Email,
                        'id':decoded._id,
                        'message': response.data,
                        'error_message': "",
                    }
                });
            }
        },
            (error) => {
                dispatch({
                    type: AUTHENTICATE_EMPLOYER,
                    payload: {
                        'email': "",
                        'id':"",
                        'message': "Invalid Username or Password",
                        'error_message': "User already present",
                    }
                });
            });
}

export const signout = () => dispatch => {
    localStorage.clear();
    storage.removeItem('persist:root');
    store.persistor.flush();
    console.log("Signout !!")
    dispatch({
        type: SIGN_OUT
    })
};

