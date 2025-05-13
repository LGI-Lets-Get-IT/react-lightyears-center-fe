import React, { useState } from 'react'
import { userLogin } from '../../store/slice/authSlice'
import { FiAlertTriangle, FiFacebook, FiGithub, FiTwitter } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../shared/Input'
import { loginSchema } from '../../schemas/authSchema'
import useFormValidation from '@/hooks/useFormValidation'

const LoginForm = ({ resetPath }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleUserLogin = async () => {
        dispatch(userLogin(values))
        .unwrap()
        .then(() => navigate('/'))
        .catch((error) => console.error("handle error", error));
    }

    const { values, errors, handleInputChange, handleSubmit } = useFormValidation(loginSchema, {
        email: '',
        password: '',
    }, handleUserLogin);

    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Login</h2>
            <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
            {/* <p className="fs-12 fw-medium text-muted">Thank you for get back <strong>Nelel</strong> web applications, let's access our the best recommendation for you.</p> */}
            <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
                <div className="mb-4">
                    <input name="email" id="email" type="email" className={`form-control ${errors.title ? "is-invalid" : ""}`} placeholder="Email" onInput={handleInputChange} required />
                    {errors.email && (
                        <div className="text-danger mt-2">
                            {errors.email}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <input name="password" id="password" type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Password" onInput={handleInputChange} required />
                    {errors.password && (
                        <div className="text-danger mt-2">
                            {errors.password}
                        </div>
                    )}
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="rememberMe" />
                            <label className="custom-control-label c-pointer" htmlFor="rememberMe">Remember Me</label>
                        </div>
                    </div>
                    <div>
                        <Link to={resetPath} className="fs-11 text-primary">Forgot password?</Link>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100" onClick={handleUserLogin}>Login</button>
                </div>
            </form>
            {/* <div className="w-100 mt-5 text-center mx-auto">
                <div className="mb-4 border-bottom position-relative"><span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">or</span></div>
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Login with Facebook">
                        <FiFacebook size={16} />
                    </a>
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Login with Twitter">
                        <FiTwitter size={16} />
                    </a>
                    <a href="#" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Login with Github">
                        <FiGithub size={16} className='text' />
                    </a>
                </div>
            </div> */}
            {/* <div className="mt-5 text-muted">
                <span> Don't have an account?</span>
                <Link to={registerPath} className="fw-bold"> Create an Account</Link>
            </div> */}
        </>
    )
}

export default LoginForm