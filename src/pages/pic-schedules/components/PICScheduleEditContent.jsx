import React, { useEffect, useState } from 'react'
import SelectDropdown from '@/components/shared/SelectDropdown'
import { Field, Form, Formik } from 'formik';
import { assessmentSchema } from '@/schemas/assessmentSchema';
import { FiCheck, FiX } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllClients } from '@/store/slice/clientSlice';
import { fetchAllPsychologists } from '@/store/slice/employeeSlice';
import { fetchAppointmentForAssessments } from '@/store/slice/appointmentSlice';
import { fetchAllTestTypes } from '@/store/slice/testTypeSlice';
import { updateAssessmentById } from '@/store/slice/assessmentSlice';
import format from 'date-fns/format';

const PICScheduleEditContent = ({ assessmentData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoading: updateLoading } = useSelector(state => state.assessments)
    const { clients } = useSelector(state => state.clients)
    const { testTypes } = useSelector(state => state.testTypes)
    const { appointments } = useSelector(state => state.appointments)
    const { psychologists } = useSelector(state => state.employees)

    const handleSubmit = (values) => {
        dispatch(updateAssessmentById({
            assessmentId: id,
            data: values
        })).unwrap()
            .then(() => navigate(`/assessments/${id}`))
            .catch((error) => console.error('Error', error))
    }

    useEffect(() => {
        dispatch(fetchAllClients());
        dispatch(fetchAllPsychologists());
        dispatch(fetchAllTestTypes())
    }, [])

    useEffect(() => {
        if (assessmentData?.client?.id) {
            dispatch(fetchAppointmentForAssessments({
                params: {
                    clientId: assessmentData.client.id
                }
            }));
        }
    }, [assessmentData?.client?.id]);
    return (
        <>
            <div className="col-lg-12">
                <div className="card stretch stretch-full">
                    <div className="card-body lead-status">
                        <div className="mb-5 d-flex align-items-center justify-content-between">
                            <h5 className="fw-bold mb-0 me-4">
                                <span className="d-block mb-2">Edit Client Assessment</span>
                                <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                                    Last Edited: {assessmentData?.updatedAt && format(assessmentData.updatedAt, 'dd MMM yyyy, HH:mm aa')}
                                </span>
                            </h5>
                        </div>
                        <Formik initialValues={{
                            clientId: assessmentData?.client?.id,
                            appointmentId: assessmentData?.appointment?.id,
                            psychologistId: assessmentData?.psychologist?.id,
                            testId: assessmentData?.testType?.id,
                            result: assessmentData?.result,
                        }}
                            validationSchema={assessmentSchema}
                            enableReinitialize
                            onSubmit={handleSubmit}>
                            {({ values, setFieldValue }) => (
                                <Form>
                                    <div className="row">
                                        <div className="col-lg-6 mb-4">
                                            <label className="form-label">
                                                Client Name <span className="text-danger">*</span>
                                            </label>
                                            <SelectDropdown
                                                name={'clientId'}
                                                isDisabled={true}
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
                                            <label className="form-label">
                                                Psychologist Name <span className="text-danger">*</span>
                                            </label>
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
                                            <label htmlFor="appointmentId" className="form-label">
                                                Assessed On <span className="text-danger">*</span>
                                            </label>
                                            <SelectDropdown
                                                name={'appointmentId'}
                                                options={appointments.map(appointment => ({
                                                    value: 12,
                                                    label: `[${appointment.appointmentType}] ${appointment.title}`,
                                                }))}
                                                placeholder={'Select Appointment'}
                                                selectedOption={values.appointmentId}
                                                onSelectOption={(option) => setFieldValue('appointmentId', option.value)}
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <label className="form-label">
                                                Test Name  <span className="text-danger">*</span>
                                            </label>
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
                                        <a
                                            className="btn btn-light-brand"
                                            onClick={() => navigate(-1)}
                                            type="button"
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
                                            <span>Edit Assessment</span>
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

export default PICScheduleEditContent