import axios from 'axios';
import { ENDPOINT,USER_DASHBOARD } from '../types';

export const getUserDashboard = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${ENDPOINT}users/${id}/dashboard`);
            console.log(data)        
            return dispatch({
                type: USER_DASHBOARD,
                payload: data
            });   
        } catch (error) {
            console.log(error.message);
        }
    
    }
}