import { FETCH_EMPLOPYER_PROFILE_PIC, FETCH_STUDENT_PROFILE_PIC } from './../actionTypes';
import update from 'react-addons-update'; // ES6

const initialState = {
    "profile_pictures": [{"email":"profile"}],
};

const profilePicturesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMPLOPYER_PROFILE_PIC:
            console.log("State: "+JSON.stringify(state));
            state.profile_pictures = {...state.profile_pictures,"profile_pictures": "profile"}
            return update(state,{
                profile_pictures: {
                    [action.payload.email]: {$set: action.payload.profile_picture } 
                }
            });
        // update(state, {
        //     studentData: 
        //         education: { $push: [action.payload] }
        //     }
        // { $set: action.payload }
        // });

        default:
            return state;
    }
}
export default profilePicturesReducer;