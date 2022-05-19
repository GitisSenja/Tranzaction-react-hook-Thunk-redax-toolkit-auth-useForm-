import axios from "api/axios";

import { setToken } from "api/localStorage";
import {  userData } from "store/userReduser/reducer";
import { setIsAuth } from "store/authReduser/authReducer";
import { deleteError, getError } from "store/loginReducer/loginReducer";

export const registerUser = ({username, password, email}) => async (dispatch) => {
    try {
        const response = await axios.post('/auth/register', {username, password, email});
        setToken('accessToken', response.data.id_token);
        dispatch(setIsAuth(true))
    } catch (error) {
        console.error('[registerUser]: ', error);
    }
};

export const loginUser = ({email, password}) => async (dispatch) => {
    try {
        const response = await axios.post('/auth/login', {email, password});
        setToken('accessToken', response.data.id_token);
        dispatch(setIsAuth(true))
        dispatch(deleteError())
    } catch (error) {
        console.error('[registerUser]: ', error.message);
        dispatch(getError(error.response.data.message))
    }
};

export const getUserInfoData = () => async (dispatch) => {
    try {
        const response = await axios.get('/protected/user-info');
        dispatch(userData(response.data.user_info_token));
    } catch (error) {
        console.error('[registerUser]: ', error);
    }
};
