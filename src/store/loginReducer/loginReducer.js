import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loginError: false,
    },
    reducers: {
        getError: (state, action) => {
            state.loginError = action.payload
        },
        deleteError: (state, action) => {
            state.login = false
        }
    }
})

export const {
    getError,
    deleteError,
} = loginSlice.actions

export default loginSlice.reducer
