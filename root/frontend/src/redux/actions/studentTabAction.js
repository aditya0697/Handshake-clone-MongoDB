import axios from "axios";
import { GET_ALL_STUDENTS } from './../actionTypes';
import {HOST_URL} from "./../../config/config";

const ROOT_URL = HOST_URL + "/student";


export const getAllStudents = (allStudents, page,limit) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(" Inside getAllStudents :");
    console.log(" page :",page);
    console.log(" limit :",limit);
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
    if(allStudents){
        if (page > allStudents.totalPages){
            page = 1
        }
    }
    axios.get(`${ROOT_URL}/students?page=${page}&limit=${limit}`,config)
        .then(response => {
            // console.log("All Student", JSON.stringify(response));
            if (response.status == 200) {
                dispatch({
                    type: GET_ALL_STUDENTS,
                    payload: response.data,
                })
            }
        },
            error => {
                console.log(" studentDetails error:", JSON.stringify(error));
            })
}