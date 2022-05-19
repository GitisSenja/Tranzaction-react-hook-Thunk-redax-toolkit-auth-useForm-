import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import getIsAuth from "store/authReduser/getterIsAuth";

const RenderPublicRoute = ({children}) => {
    const {isAuth} = useSelector(getIsAuth);

    if (!isAuth) {
        return children
    }
    return <Navigate to='/home'/>
}

export default RenderPublicRoute;
