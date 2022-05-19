import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import RenderPrivateRoute from "components/privateRoute/privateRoute";
import RenderPublicRoute from "components/publicRoute/publicRoute";
import LoginPage from "pages/LoginPage/LoginPage";
import HomePage from "pages/HomePage/HomePage";
import RegistrationPage from "pages/RegistrationPage/RegistrationPage";
import { setIsAuth } from "store/authReduser/authReducer";
import getIsAuth from "store/authReduser/getterIsAuth";
import { getToken } from "api/localStorage";

const RootRout = () => {
    const dispatch = useDispatch()
    const {isAuth} = useSelector(getIsAuth)
    const token = getToken()

    const userCheckAuth = () => {
        if (token) {
            dispatch(setIsAuth(true))
        } else {
            dispatch(setIsAuth(false))
        }
    }

    useEffect(() => {
        userCheckAuth()
    }, [])

    return (
        <Routes>
            {isAuth === null ? (<></>) : (
                <>
                    <Route
                        path={'/'}
                        element={<Navigate to='/home'/>}
                    />
                    <Route path='/home' element={
                        <RenderPrivateRoute>
                            <HomePage classname='fonHomPage'/>
                        </RenderPrivateRoute>}/>
                    <Route path='/login' element={
                        <RenderPublicRoute>
                            <LoginPage/>
                        </RenderPublicRoute>}/>
                    <Route path='/registration' element={
                        <RenderPublicRoute>
                            <RegistrationPage/>
                        </RenderPublicRoute>}/>
                </>
            )}
        </Routes>
    );
};

export default RootRout;
