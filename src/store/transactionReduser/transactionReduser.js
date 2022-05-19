import {createSlice} from '@reduxjs/toolkit'

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        transactionList: [],
        usersList: [],
        transactionError: false,
        isLoading: false,
    },
    reducers: {
        setTransactionData: (state, action) => {
            state.transactionList = action.payload
        },
        setListUsers: (state, action) => {
            state.usersList = action.payload
        },
        getError: (state, action) => {
            state.transactionError = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const {
    setListUsers,
    setTransactionData,
    getError,
    setLoading} = transactionSlice.actions

export default transactionSlice.reducer
