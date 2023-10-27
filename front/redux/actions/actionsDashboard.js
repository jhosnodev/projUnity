import axios from 'axios';
import { ENDPOINT,USER_DASHBOARD, GET_USERS, DELETE_USER, RESTORE_USER, PAYMENT_RECORD  } from '../types';

export const getUserDashboard = (id) => {
    return async (dispatch) => {
        console.log(id)
        try {
            const { data } = await axios.get(`${ENDPOINT}users/${id}/dashboard`);
            dispatch({
                type: USER_DASHBOARD,
                payload: data
            });
        } catch (err) {
            console.log(err);
        }
    
    }
}

export const getUsers = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${ENDPOINT}users`);
            dispatch({
                type: GET_USERS,
                payload: data
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export const deleteUser = (userId) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.delete(`${ENDPOINT}users/${userId}`);
        console.log(userId)
        dispatch({
          type: DELETE_USER,
          payload: data,
        });
      } catch (err) {
        console.log(err);
      }
    };
  }
  
  export const restoreUser = (userId) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.put(`${ENDPOINT}users/restore/${userId}`);
        dispatch({
          type: RESTORE_USER,
          payload: data,
        });
      } catch (err) {
        console.log(err);
      }
    };
  }
  

export const paymentRecord = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${ENDPOINT}payment`);
            dispatch({
                type: PAYMENT_RECORD,
                payload: data
            });
        } catch (err) {
            console.log(err);
        }
    }    

} 
      