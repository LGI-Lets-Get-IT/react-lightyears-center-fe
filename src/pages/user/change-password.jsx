import { changePwdUserSchema } from "@/schemas/passwordSchema";
import { userChangePassword } from "@/store/slice/authSlice";
import { Field, Form, Formik } from "formik";
import { FiCheck, FiKey, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading: updateLoading } = useSelector(state => state.auth)

    const handleChangePassword = (values) => {
        console.log('VALUESES', values)
        dispatch(userChangePassword(values))
        .unwrap()
        .then(() => navigate('/'))
        .catch((err) => console.error('Error: ', err))
    }
    return (
    <div className="main-content">
      <div className="card">
            <div className="card-body pass-info">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold mb-0 me-4">
                        <span className="d-block mb-2">Change Your Password</span>
                    </h5>
                    {/* <a href="#" className="btn btn-sm btn-light-brand">Reset</a> */}
                </div>
                <Formik initialValues={{
                    oldPassword: '',
                    newPassword: '',
                    passwordConfirm: ''
                }}
                    validationSchema={changePwdUserSchema}
                    onSubmit={handleChangePassword}
                >
                    {({ values }) => (
                        <Form>
                            <div className="row mb-4 align-items-center">
                                <div className="col-lg-4">
                                    <label htmlFor="oldPassword" className="fw-semibold">Current Password: </label>
                                </div>
                                <div className="col-lg-8">
                                    <Field name="oldPassword">
                                        {({ field, meta }) => (
                                            <>
                                                <div className="input-group">
                                                    <div className="input-group-text"><FiKey /></div>
                                                    <input
                                                        type="password"
                                                        className={`form-control ${meta.error} ? 'is-invalid' : ''`}
                                                        id="oldPassword"
                                                        placeholder="Current Password"
                                                        value={values.password}
                                                        required
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
                                    <label htmlFor="newPassword" className="fw-semibold">New Password: </label>
                                </div>
                                <div className="col-lg-8">
                                    <Field name="newPassword">
                                        {({ field, meta }) => (
                                            <>
                                                <div className="input-group">
                                                    <div className="input-group-text"><FiKey /></div>
                                                    <input
                                                        type="password"
                                                        className={`form-control ${meta.error} ? 'is-invalid' : ''`}
                                                        id="newPassword"
                                                        placeholder="New Password"
                                                        value={values.newPassword}
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
                                    <label htmlFor="passwordConfirm" className="fw-semibold">Password Confirm: </label>
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
                                    <li className="mb-1">Minimum 8 characters long - the more, the better</li>
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

                                <button type="submit" className="btn btn-primary" disabled={updateLoading}>
                                    {updateLoading ? (
                                        <div
                                            className="spinner-border spinner-border-sm text-white me-2"
                                            role="status"
                                        />
                                    ) : (
                                        <FiCheck size={16} className="me-2" />
                                    )}
                                    <span>Edit Password</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
      </div>
    </div>
    )
}

export default ChangePassword;