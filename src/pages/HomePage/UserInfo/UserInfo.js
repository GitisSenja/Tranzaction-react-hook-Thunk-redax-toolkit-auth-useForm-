import React from 'react';
import { useDispatch } from "react-redux";

import Button from "components/Button/Button";
import { deleteToken } from "api/localStorage";
import { setIsAuth } from "store/authReduser/authReducer";
import classes from "pages/HomePage/homePage.module.css";


const UserInfo = ({user}) => {
    const dispatch = useDispatch()

    const outUser = () => {
        deleteToken()
        dispatch(setIsAuth(false))
    }

    return (
        <div className={classes.userCabinet}>
            <div className={classes.contentUserInfo}>
                <p className={classes.infoText}>Name: {user.name}</p>
                <p className={classes.infoText}>Email: {user.email}</p>
                <p className={classes.infoText}>Balance: {user.balance}</p>
            </div>
            <Button onClick={outUser} className={classes.logOutButton} >LOG OUT</Button>
        </div>
    );
};

export default UserInfo;
