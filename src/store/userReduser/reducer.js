import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            name: "",
            email: "",
            balance: "",
            id: null
        },
    },
    reducers: {
        userData: (state, action) => {
            state.user = action.payload;
        },
    }
})

export const {
    userData,
} = userSlice.actions

export default userSlice.reducer
