import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { registerUser } from "store/userReduser/thunk"
import classes from "components/RegistrationForm/RegistrationForm.module.css";

const DEFAULT_VALUES = {
    username: '',
    password: '',
    email: '',
}

const RegistrationForm = () => {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        setValue,
        watch,
        register,
        formState: {errors},
    } = useForm({
        defaultValues: DEFAULT_VALUES,
        mode: "onBlur"
    })

    const onSubmit = async (userInfo) => {
        await dispatch(registerUser(userInfo))
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
            required: "Field is required",
            minLength: {
                value: 4,
                message: "The password must contain more than 4 symbols",
            }
        })
        register('username', {
            required: "Field is required",
            minLength: {
                value: 4,
                message: "The name must contain more than 4 letters",
            },
            maxLength: {
                value: 12,
                message: "Name must be less than 12 characters"
            },
        })
    }, [register])

    return (
        <div className={classes.content}>
            <form className={classes.formBox} onSubmit={handleSubmit(onSubmit)}>
                <p className={classes.header}>Registration</p>
                <div className={classes.inputBox}>
                    <input
                        type='text'
                        placeholder='Name'
                        className={classes.formBoxInput}
                        value={watch('username')}
                        onChange={(event) => {
                            handleChangeName(event, 'username')
                        }}
                    />
                    {<p className={classes.errorText}>{errors.username && errors?.username?.message}</p>}
                </div>
                <div className={classes.inputBox}>
                    <input
                        placeholder='Password'
                        type='password'
                        className={classes.formBoxInput}
                        value={watch('password')}
                        onChange={(event) => {
                            handleChangeName(event, 'password')
                        }}
                    />
                    {<p className={classes.errorText}>{errors.password && errors?.password?.message}</p>}
                </div>
                <div className={classes.inputBox}>
                    <input
                        placeholder='Email'
                        className={classes.formBoxInput}
                        value={watch('email')}
                        onChange={(event) => {
                            handleChangeName(event, 'email')
                        }}
                    />
                    {<p className={classes.errorText}>{errors.email && errors?.email?.message}</p>}
                </div>
                <div className={classes.buttonBox}>
                    <button type="submit" className={classes.registrationButton}>Sing up</button>
                    <NavLink to='/login' className={classes.loginButton}>
                        Login
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm
