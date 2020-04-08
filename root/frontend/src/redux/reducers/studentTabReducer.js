import update from 'react-addons-update'; // ES6
import { GET_ALL_STUDENTS } from './../actionTypes';

const initialState = {
};
const studentTabReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_STUDENTS:
            return {
                ...state,
                students: action.payload.docs,
                totalDocs:  action.payload.totalDocs,
                limit:  action.payload.limit,
                totalPages:  action.payload.totalPages,
                page:  action.payload.page,
                pagingCounter:  action.payload.pagingCounter,
                hasPrevPage:  action.payload.hasPrevPage,
                hasNextPage:  action.payload.hasNextPage,
                prevPage:  action.payload.prevPage,
                nextPage:  action.payload.nextPage,
            }
        default:
            return state;
    }

}

export default studentTabReducer;