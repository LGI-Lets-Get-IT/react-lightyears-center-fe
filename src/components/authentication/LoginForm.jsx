import React from 'react'
import { userLogin } from '../../store/slice/authSlice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema } from '../../schemas/authSchema'
import { Field, Form, Formik } from 'formik'

const LoginForm = ({ resetPath }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleUserLogin = async (values, actions) => {
        dispatch(userLogin(values))
            .unwrap()
            .then(() => navigate('/'))
            .catch((error) => console.error("handle error", error));
    }

    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Login</h2>
            <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
            {/* <p className="fs-12 fw-medium text-muted">Thank you for get back <strong>Nelel</strong> web applications, let's access our the best recommendation for you.</p> */}
            <Formik initialValues={{
                email: '',
                password: '',
            }}
                validationSchema={loginSchema}
                onSubmit={handleUserLogin}>
                {({ values }) => (
                    <Form>
                        <div className="w-100 mt-4 pt-2">
                            <Field name="email">
                                {({ field, meta }) => (
                                    <div className="mb-4">
                                        <input
                                            name="email"
                                            id="email"
                                            type="email"
                                            className={`form-control ${meta.error ? "is-invalid" : ""}`}
                                            placeholder="Email"
                                            value={values.email}
                                            required
                                            {...field}
                                        />
                                        {meta.error && (
                                            <div className="text-danger mt-1">
                                                {meta.error}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <div className="mb-3">
                                <Field name="password">
                                    {({ field, meta }) => (
                                        <div className="mb-4">
                                            <input
                                                name="password"
                                                id="password"
                                                type="password"
                                                className={`form-control ${meta.error ? 'is-invalid' : ''}`}
                                                placeholder="Password"
                                                value={values.password}
                                                required
                                                {...field}
                                            />
                                            {meta.error && (
                                                <div className="text-danger mt-1">
                                                    {meta.error}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="rememberMe" />
                                        <label className="custom-control-label c-pointer" htmlFor="rememberMe">Remember Me</label>
                                    </div>
                                </div>
                                <div>
                                    <a href={resetPath} className="fs-11 text-primary">Forgot password?</a>
                                </div>
                            </div>
                            <div className="mt-5">
                                <button type="submit" className="btn btn-lg btn-primary w-100">Login</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

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