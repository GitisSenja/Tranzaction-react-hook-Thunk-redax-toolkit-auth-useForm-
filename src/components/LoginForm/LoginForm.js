import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { NavLink } from "react-router-dom";

import { loginUser } from "store/userReduser/thunk";
import getLoginError from "store/loginReducer/getterLoginError";
import classes from "components/LoginForm/LoginForm.module.css";

const DEFAULT_VALUES = {
    email: '',
    password: '',
}

const LoginForm = () => {
    const dispatch = useDispatch()
    const {loginError} = useSelector(getLoginError)

    const {
        handleSubmit,
        setValue,
        watch,
        register,
        formState: {errors},
    } = useForm({
        defaultValues: DEFAULT_VALUES,
        mode: "onTouched",
    })

    const onSubmit = (userInfo) => {
        dispatch(loginUser(userInfo))
    }

    const handleChangeName = (event, fieldName) => {
        const text = event.target.value
        setValue(fieldName, text, {shouldValidate: true})
    }

    useEffect(() => {
        register('email', {
            required: "Field is required",
            pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
                message: "Invalid email address"
            }
        })
        register('password', {
            required: "Field is required"
        })
    }, [register])

    return (
        <div className={classes.content}>
            <form className={classes.formBox} onSubmit={handleSubmit(onSubmit)}>
                <p className={classes.header}>Login</p>
                <div className={classes.emailBox}>
                    {loginError ?
                        <p className={classes.loginError}>{loginError}</p> : null}
                    <input
                        placeholder='Email'
                        className={classes.formBoxInput}
                        value={watch('email')}
                        onChange={(event) => {
                            handleChangeName(event, 'email')
                        }}
                    />
                    {<p className={classes.errorText}>{errors?.email && errors?.email?.message}</p>}
                </div>
                <div className={classes.passwordBox}>
                    <input
                        type='password'
                        placeholder='Password'
                        className={classes.formBoxInput}
                        value={watch('password')}
                        onChange={(event) => {
                            handleChangeName(event, 'password')
                        }}
                    />
                    {<p className={classes.errorText}>{errors?.password && errors?.password?.message}</p>}

                </div>
                <div className={classes.buttonBox}>
                    <button type="submit" className={classes.loginButton}>Sing in</button>
                    <NavLink to='/registration' className={classes.registrationButton}>
                        Registration
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default LoginForm
