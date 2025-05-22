import { changePwdAdminSchema } from '@/schemas/passwordSchema'
import { updateEmployeePassword } from '@/store/slice/employeeSlice'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { FiCheck, FiKey, FiX } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const TabPassword = ({ id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { isLoading: updateLoading } = useSelector(state => state.employees)
    const handleChangePassword = (values, actions) => {
        dispatch(updateEmployeePassword({
            id: id,
            data: values,
        }))
            .unwrap()
            .then(() => navigate(`/employees/${id}`))
            .catch((error) => console.error("handle error", error));
    }
    return (
        <div className="tab-pane fade" id="passwordTab" role="tabpanel">
            <div className="card-body pass-info">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0 me-4">
                        <span className="d-block mb-2">Password Information</span>
                        <span className="fs-12 fw-normal text-muted text-truncate-1-line">You can only change your password once within 24 hours! </span>
                    </h5>
                    {/* <a href="#" className="btn btn-sm btn-light-brand">Reset</a> */}
                </div>
                <Formik initialValues={{
                    password: '',
                    passwordConfirm: ''
                }}
                    validationSchema={changePwdAdminSchema}
                    onSubmit={handleChangePassword}
                >
                    {({ values }) => (
                        <Form>
                            <div className="row mb-4 align-items-center">
                                <div className="col-lg-4">
                                    <label htmlFor="password" className="fw-semibold">Password: </label>
                                </div>
                                <div className="col-lg-8">
                                    <Field name="password">
                                        {({ field, meta }) => (
                                            <>
                                                <div className="input-group">
                                                    <div className="input-group-text"><FiKey /></div>
                                                    <input
                                                        type="password"
                                                        className={`form-control ${meta.error} ? 'is-invalid' : ''`}
                                                        id="password"
                                                        placeholder="Password"
                                                        value={values.password}
                                                        {...field}
                                                    />
                                                </div>
                                                {meta.error && (
                                                    <div className="text-danger mt-1">
                                                        {meta.error}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className="row mb-4 align-items-center">
                                <div className="col-lg-4">
                                    <label htmlFor="Input" className="fw-semibold">Password Confirm: </label>
                                </div>
                                <div className="col-lg-8 generate-pass">
                                    <Field name="passwordConfirm">
                                        {({ field, meta }) => (
                                            <>
                                                <div className="input-group field">
                                                    <div className="input-group-text"><FiKey /></div>
                                                    <input
                                                        type="password"
                                                        className={`form-control password ${meta.error ? 'is-invalid' : ''}`}
                                                        id="passwordConfirm"
                                                        placeholder="Password Confirm"
                                                        value={values.passwordConfirm}
                                                        {...field}
                                                    />
                                                </div>
                                                {meta.error && (
                                                    <div className="text-danger mt-1">
                                                        {meta.error}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className="pass-hint">
                                <p className="fw-bold">Password Requirements:</p>
                                <ul className="fs-12 ps-1 ms-2 text-muted">
                                    <li className="mb-1">At least one lowercase character</li>
                                    <li className="mb-1">Minimum 8 characters long - the more, the better</li>
                                    <li>At least one number, symbol, or whitespace character</li>
                                </ul>
                            </div>

                            <div className="d-flex justify-content-end align-items-center gap-2 page-header-right-items-wrapper">
                                <a
                                    className="btn btn-light-brand"
                                    onClick={() => navigate(-1)}
                                >
                                    <FiX size={16} className="me-2" />
                                    <span>Cancel</span>
                                </a>

                                <button type="submit" className="btn btn-primary">
                                    {updateLoading ? (
                                        <div
                                            className="spinner-border spinner-border-sm text-white me-2"
                                            role="status"
                                        />
                                    ) : <FiCheck size={16} className="me-2" />
                                    }
                                    <span>Edit Password</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <hr className="my-0" />
            {/* <div className="card-body pass-security">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0 me-4">
                        <span className="d-block mb-2">Security preferences:</span>
                        <span className="fs-12 fw-normal text-muted text-truncate-1-line">Keep your account more secure with following preferences. </span>
                    </h5>
                    <a href="#" className="btn btn-sm btn-light-brand">Check Auth</a>
                </div>
                <Card
                    icon={FiEye}
                    title={"Enable 2-step authentication"}
                    description={"Protects you against password theft by requesting an authentication code via SMS on every login."}
                    isChecked={false}
                    id="one"
                />
                <Card
                    icon={FiShield}
                    title={"Ask to change password on every 6 months"}
                    description={"A simple but an effective way to be protected against data leaks and password theft."}
                    isChecked={false}
                    id="two"
                />
            </div> */}
        </div >
    )
}

export default TabPassword

const Card = ({ icon: Icon, title, description, isChecked, id }) => {
    return (
        <div className="hstack justify-content-between p-4 mb-3 border border-dashed border-gray-3 rounded-1">
            <div className="hstack me-4">
                <div className="avatar-text">
                    <Icon />
                </div>
                <div className="ms-4">
                    <a href="#" className="fw-bold mb-1 text-truncate-1-line">{title}</a>
                    <div className="fs-12 text-muted text-truncate-1-line">{description}</div>
                </div>
            </div>
            <div className="form-check form-switch form-switch-sm">
                <label className="form-check-label fw-500 text-dark c-pointer" htmlFor={id}></label>
                <input className="form-check-input c-pointer" type="checkbox" id={id} defaultChecked={isChecked} />
            </div>
        </div>
    )
}