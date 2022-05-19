import {configureStore} from '@reduxjs/toolkit'

import userReducer from "store/userReduser/reducer";
import authReducer from "./authReduser/authReducer";
import transactionReducer from "./transactionReduser/transactionReduser";
import loginReducer from "./loginReducer/loginReducer";

export default configureStore({
    reducer: {
        user: userReducer,
        isAuth: authReducer,
        transaction: transactionReducer,
        login: loginReducer
    }
})


