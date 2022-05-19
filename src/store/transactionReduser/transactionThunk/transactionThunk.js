import axios from "api/axios";

import { getError, setListUsers, setTransactionData, setLoading } from "store/transactionReduser/transactionReduser";
import { getUserInfoData } from "store/userReduser/thunk";
import { setIsAuth } from "store/authReduser/authReducer";

export const createTransaction = ({name, amount, recipientId, correspondentId}) => async (dispatch) => {
    try {
        await axios.post('protected/transactions', {name, amount, recipientId, correspondentId});
        dispatch(
            getError(false)
        )
        console.log('@createTransaction@@',);
    } catch (error) {
        console.log('@@@statusstatus', error.response.status);
        dispatch(
            getError(error.response.data.message)
        )
    }
};

export const getAllTransactions = () => async (dispatch) => {
    try {
        const response = await axios.get('protected/transactions');
        dispatch(
            setTransactionData(response.data.trans_token),
        );
    } catch (error) {
        if (error.response.status === 500) {
            dispatch(setIsAuth(false))
        }
        console.error('[registerUser]: ', error);
    }
};

export const getListUsers = (text) => async (dispatch) => {
    try {
        const response = await axios.post('/protected/users/list', {filter: text});
        dispatch(
            setListUsers(response.data),
        );
    } catch (error) {
        if (error.response.status === 500) {
            dispatch(setIsAuth(false))
        }
    }
};


export const fetchTransaction = (data) => async (dispatch) => {
    try {
        dispatch(
            setLoading(true)
        )
        await dispatch(createTransaction(data))
        await dispatch(getUserInfoData())
        await dispatch(getAllTransactions())
        dispatch(
            setLoading(false)
        )
    } catch (error) {
        dispatch(
            getError(error.response.data.message)
        )
        if (error.response.status === 500) {
            dispatch(setIsAuth(false))
        }
        console.log('@@@', error);
    }
};
