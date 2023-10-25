import { DELETE_USER, GET_USERS, RESTORE_USER, USER_DASHBOARD, PAYMENT_RECORD } from "../types";

const initialState = {
    userDashboardData: {},
    dataUsers: [],
    payments: [],
};

const userDashboardReducer = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case USER_DASHBOARD:
            return {
                ...state,
                userDashboardData: action.payload
            };
        case GET_USERS:
            return {
                ...state,
                dataUsers: action.payload
            }
        case DELETE_USER:
            return {
                ...state,
                dataUsers: action.payload
            }
        case RESTORE_USER:
            return {
                ...state,
                dataUsers: action.payload
            }
        case PAYMENT_RECORD:
            return {
                ...state,
                payments: action.payload
            }
        default:
            return state;
    }
};

export default userDashboardReducer;