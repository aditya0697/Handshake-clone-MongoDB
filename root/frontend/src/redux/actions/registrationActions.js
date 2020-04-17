import axios from "axios";
import { HOST_URL } from "./../../config/config";
import { REGISTER_FOR_EVENT, GET_REGISTRATIONS, ADD_REGISTRATION } from './../actionTypes';

const ROOT_URL = HOST_URL + "/registration";

export const getRegistrations = (user, registrationData, page, limit) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside fetchApplications :", user.email);

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
    if(registrationData){
        if (page > registrationData.totalPages){
            page = 1;
        }
    }

    if (user.user_type == "student") {
        axios.get(`${ROOT_URL}/student?student_id=${user.id}&page=${page}&limit=${limit}`,config)
            .then(response => {
                console.log("events Data in actions", JSON.stringify(response));
                if (response.status == 200) {
                    console.log("events Data in actions")
                    dispatch({
                        type: GET_REGISTRATIONS,
                        payload: response.data,
                    })
                }
            }, error => {
                console.log(" get events error:", JSON.stringify(error));
                // dispatch({
                //     type: GET_EVENTS,
                //     payload: eventData.events,
                // })
            });
    } else {
        axios.get(`${ROOT_URL}/employer?employer_id=${user.id}&page=${page}&limit=${limit}`,config)
            .then(response => {
                console.log("events Data in actions", JSON.stringify(response));
                if (response.status == 200) {
                    console.log("events Data in actions")
                    dispatch({
                        type: GET_REGISTRATIONS,
                        payload: response.data,
                    })
                }
            }, error => {
                console.log(" fetchEvents error:", JSON.stringify(error));
                // dispatch({
                //     type: GET_EVENTS,
                //     payload: eventData.events,
                // })
            });
    }
};

export const registerEvent = (event, student) => dispatch => {
    axios.defaults.withCredentials = true;
    if (!event) {
        return;
    }
    console.log("registerEvent change status: ", JSON.stringify(event));
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    var studentSchema = {
        _id: student._id,
        Name:  student.FirstName + " " + student.LastName,
        ProfileUrl: student.ProfileUrl,
    };
    const data = {
        Event: event,
        Student: studentSchema,
    }

    console.log("Data change status: ", JSON.stringify(data));

    axios.post(`${ROOT_URL}/register`, data, config)
        .then((response) => {
            if (response.status == 200) {
                console.log("REGISTER_FOR_EVENT Data in actions")
                dispatch({
                    type: ADD_REGISTRATION,
                    payload: data,
                })
            }
        }, err => {
            console.log("Error in REGISTER_FOR_EVENT status change", err);
            dispatch({
                type: REGISTER_FOR_EVENT,
                payload: data,
            })
        }).catch(err => { console.log(err) });

}

