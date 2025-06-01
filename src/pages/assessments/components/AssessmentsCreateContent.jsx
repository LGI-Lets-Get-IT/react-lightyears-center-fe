import React, { useEffect, useState } from 'react'
import SelectDropdown from '@/components/shared/SelectDropdown'
import { Field, Form, Formik } from 'formik';
import { assessmentSchema } from '@/schemas/assessmentSchema';
import { FiCheck, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllClients } from '@/store/slice/clientSlice';
import { fetchAllPsychologists } from '@/store/slice/employeeSlice';
import { fetchAppointmentForAssessments } from '@/store/slice/appointmentSlice';
import { fetchAllTestTypes } from '@/store/slice/testTypeSlice';
import { createAssessment } from '@/store/slice/assessmentSlice';

const AssessmentsCreateContent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading: createLoading } = useSelector(state => state.assessments)
    const { clients } = useSelector(state => state.clients)
    const { testTypes } = useSelector(state => state.testTypes)
    const { appointments } = useSelector(state => state.appointments)
    const { psychologists } = useSelector(state => state.employees)

    const handleSubmit = (values, actions) => {
        dispatch(createAssessment(values)).unwrap()
            .then(() => navigate('/assessments'))
            .catch(error => console.error('handle error', error))
    }

    useEffect(() => {
        dispatch(fetchAllClients());
        dispatch(fetchAllPsychologists());
        dispatch(fetchAllTestTypes())
    }, [])
    return (
        <>
            <div className="col-lg-12">
                <div className="card stretch stretch-full">
                    <div className="card-body lead-status">
                        <div className="mb-5 d-flex align-items-center justify-content-between">
                            <h5 className="fw-bold mb-0 me-4">
                                <span className="d-block mb-2">Create Client Assessment</span>
                                <span className="fs-12 fw-normal text-muted text-truncate-1-line">Typically refers to adding a new potential customer or sales prospect</span>
                            </h5>
                        </div>
                        <Formik initialValues={{
                            clientId: null,
                            appointmentId: null,
                            psychologistId: null,
                            testId: null,
                            result: null,
                        }}
                            validationSchema={assessmentSchema}
                            onSubmit={handleSubmit}>
                            {({ values, setFieldValue }) => (
                                <Form>
                                    <div className="row">
                                        <div className="col-lg-6 mb-4">
                                            <label className="form-label">Client Name</label>
                                            <SelectDropdown
                                                name={'clientId'}
                                                options={clients.map(client => ({
                                                    value: client.id,
                                                    label: client.fullName
                                                }))}
                                                selectedOption={values.clientId}
                                                placeholder={'Select Client'}
                                                onSelectOption={(option) => {
                                                    setFieldValue('clientId', option.value)
                                                    dispatch(fetchAppointmentForAssessments({
                                                        params: {
                                                            clientId: option.value
                                                        }
                                                    }));
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <label className="form-label">Psychologist Name</label>
                                            <SelectDropdown
                                                name={'psychologistId'}
                                                options={psychologists.map(psychologist => ({
                                                    value: psychologist.id,
                                                    label: psychologist.fullName,
                                                }))}
                                                placeholder={'Select Psychologist'}
                                                selectedOption={values.psychologistId}
                                                onSelectOption={(option) => setFieldValue('psychologistId', option.value)}
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <label htmlFor="appointmentId" className="form-label">Assessed On</label>
                                            <SelectDropdown
                                                isDisabled={!values.clientId}
                                                name={'appointmentId'}
                                                options={appointments.map(appointment => ({
                                                    value: appointment.id,
                                                    label: `[${appointment.appointmentType}] ${appointment.title}`,
                                                }))}
                                                placeholder={'Select Appointment'}
                                                selectedOption={values.appointmentId}
                                                onSelectOption={(option) => setFieldValue('appointmentId', option.value)}
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <label className="form-label">Test Name</label>
                                            <SelectDropdown
                                                name={'testId'}
                                                options={testTypes.map(test => ({
                                                    value: test.id,
                                                    label: test.name,
                                                }))}
                                                placeholder={'Select Test Name'}
                                                selectedOption={values.testId}
                                                onSelectOption={(option) => setFieldValue('testId', option.value)}
                                            />
                                        </div>
                                        <div className="col-lg-12 mb-4">
                                            <label htmlFor="result" className="form-label">
                                                Test Result <span className="text-danger">*</span>
                                            </label>
                                            <Field name="result">
                                                {({ field, meta }) => (
                                                    <>
                                                        <textarea
                                                            id="result"
                                                            rows={6}
                                                            className={`form-control ${meta.error ? "is-invalid" : ""
                                                                }`}
                                                            placeholder="Please specify the result here"
                                                            defaultValue={""}
                                                            {...field}
                                                        />
                                                        {meta.error && (
                                                            <div className="mt-1 text-danger">{meta.error}</div>
                                                        )}
                                                    </>
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end align-items-center gap-2 page-header-right-items-wrapper">
                                        <a className="btn btn-light-brand" onClick={() => navigate(-1)}>
                                            <FiX size={16} className="me-2" />
                                            <span>Cancel</span>
                                        </a>
                                        <button type="submit" className="btn btn-primary" disabled={createLoading}>
                                            {createLoading ? (
                                                <div
                                                    className="spinner-border spinner-border-sm text-white me-2"
                                                    role="status"
                                                />
                                            ) : (
                                                <FiCheck size={16} className="me-2" />
                                            )}
                                            <span>Create Assessment</span>
                                        </button>

                                    </div>
                                </Form>
                            )}
                        </Formik>

                    </div>
                </div>
            </div >
        </>
    )
}

export default AssessmentsCreateContent