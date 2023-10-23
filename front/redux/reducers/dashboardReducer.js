import { USER_DASHBOARD } from "../types";

const initialState = {
    userDashboardData: {}
};

const userDashboardReducer = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case USER_DASHBOARD:
            return {
                ...state,
                userDashboardData: action.payload
            };
        default:
            return state;
    }
};

export default userDashboardReducer;