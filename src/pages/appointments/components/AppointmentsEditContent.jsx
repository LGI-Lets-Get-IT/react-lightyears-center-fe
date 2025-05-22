import React, { useEffect, useState } from "react";
import SelectDropdown from "@/components/shared/SelectDropdown";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllPsychologists,
    fetchAllTherapists,
} from "@/store/slice/employeeSlice";
import { fetchAllClients } from "@/store/slice/clientSlice";
import { FiCheck, FiX } from "react-icons/fi";
import { Field, FieldArray, Form, Formik } from "formik";
import { treatmentPlanSchema } from "@/schemas/treatmentPlanSchema";
import { createPlan } from "@/store/slice/treatmentPlanSlice";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllTreatmentTypes } from "@/store/slice/treatmentTypeSlice";
import { format } from "date-fns";
import { appointmentTypeOptions } from "@/utils/options";
import { appointmentSchema } from "@/schemas/appointmentSchema";
import { updateAppointmentById } from "@/store/slice/appointmentSlice";

const AppointmentsEditContent = ({ appointmentData }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { clients } = useSelector((state) => state.clients);
    const { isLoading: updateLoading } = useSelector((state) => state.appointments);
    const { psychologists, therapists } = useSelector((state) => state.employees);

    const appointmentTypes = appointmentTypeOptions;

    const onSubmit = async (values, actions) => {
        console.log("ASFASFS", values, actions);
        dispatch(updateAppointmentById({
            appointmentId: id,
            data: values
        }))
            .unwrap()
            .then(() => navigate(`/appointments/${id}`))
            .catch(error => console.log('Error', error));
    };

    useEffect(() => {
        dispatch(fetchAllClients());
        if (appointmentData?.appointmentType === 'Assessment') {
            dispatch(fetchAllTherapists());
        } else {
            dispatch(fetchAllPsychologists());
        }
    }, []);
    return (
        <>
            <div className="col-lg-12">
                <div className="card stretch stretch-full">
                    <div className="card-body">
                        <div className="mb-5 d-flex align-items-center justify-content-between">
                            <h5 className="fw-bold mb-0 me-4">
                                <span className="d-block mb-2">Edit Appointment</span>
                                <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                                    Last Edited: {appointmentData && format(new Date(appointmentData?.updatedAt), "dd MMM yyyy, HH:mm aa")}
                                </span>
                            </h5>
                        </div>
                        <Formik
                            initialValues={{
                                title: appointmentData?.title,
                                clientId: appointmentData?.clientId,
                                picId: appointmentData?.picId,
                                picType: appointmentData?.picType,
                                appointmentType: appointmentData?.appointmentType,
                                appointmentDate: appointmentData?.appointmentDate,
                                timeStart: appointmentData?.appointmentTime.split(' - ')[0],
                                timeEnd: appointmentData?.appointmentTime.split(' - ')[1],
                            }}
                            validationSchema={appointmentSchema}
                            enableReinitialize
                            onSubmit={onSubmit}
                        >
                            {({ values, setFieldValue, errors }) => (
                                <Form>
                                    <div className="row">
                                        {console.log('errors', errors)}
                                        <div className="col-lg-12 mb-4">
                                            <label className="form-label">
                                                Appointment Title <span className="text-danger">*</span>
                                            </label>
                                            <Field name="title">
                                                {({ field, meta }) => (
                                                    <>
                                                        <input
                                                            type="text"
                                                            className={`form-control`}
                                                            name="title"
                                                            placeholder="Enter Appointment Title"
                                                            value={values.title}
                                                            {...field} />
                                                        {meta.error && (
                                                            <div className="mt-1 text-danger">{meta.error}</div>
                                                        )}
                                                    </>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <label className="form-label">
                                                Client Name <span className="text-danger">*</span>
                                            </label>
                                            <SelectDropdown
                                                isDisabled={true}
                                                name="clientId"
                                                options={clients.map((item) => ({
                                                    label: item.fullName,
                                                    value: item.id,
                                                }))}
                                                selectedOption={values.clientId}
                                                placeholder={"Select Client"}
                                                onSelectOption={(option) => {
                                                    setFieldValue('clientId', option)
                                                    setFieldValue('presentProblem', 'test')
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            {appointmentData?.appointmentType === 'Treatment' ? (
                                                <>
                                                    <label className="form-label">
                                                        Therapist Name <span className="text-danger">*</span>
                                                    </label>
                                                    <SelectDropdown
                                                        name="picId"
                                                        options={therapists.map((item) => ({
                                                            label: item.fullName,
                                                            value: item.id,
                                                        }))}
                                                        selectedOption={values.picId}
                                                        placeholder={"Select Therapist"}
                                                        onSelectOption={(option) => {
                                                            setFieldValue('picId', option)
                                                        }}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <label className="form-label">
                                                        Psychologist Name <span className="text-danger">*</span>
                                                    </label>
                                                    <SelectDropdown
                                                        name="picId"
                                                        options={psychologists.map((item) => ({
                                                            label: item.fullName,
                                                            value: item.id,
                                                        }))}
                                                        selectedOption={values.picId}
                                                        placeholder={"Select Psychologist"}
                                                        onSelectOption={(option) => {
                                                            setFieldValue('picId', option)
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <label className="form-label">
                                                Appointment Type <span className="text-danger">*</span>
                                            </label>
                                            <SelectDropdown
                                                name="appointmentType"
                                                options={appointmentTypes}
                                                isDisabled={true}
                                                selectedOption={values.appointmentType}
                                                placeholder={"Select Appointment Type"}
                                                onSelectOption={(option) => {
                                                    if (option.value.toLowerCase() === 'assessment') {
                                                        console.log('OPTION 2', option)
                                                        setFieldValue('picType', 'Therapist')
                                                    } else {
                                                        console.log('OPTION 3', option)
                                                        setFieldValue('picType', 'Psychologist')
                                                    }
                                                    console.log('VALUES', values)
                                                }}
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <label className="form-label">
                                                Appointment Date <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group date flex-column">
                                                <Field name="appointmentDate">
                                                    {({ meta }) => (
                                                        <>
                                                            <DatePicker
                                                                name="appointmentDate"
                                                                placeholderText="YYYY-MM-DD"
                                                                dateFormat={"yyyy-MM-dd"}
                                                                showPopperArrow={false}
                                                                selected={values.appointmentDate}
                                                                onChange={(date) => {
                                                                    setFieldValue(
                                                                        "appointmentDate",
                                                                        date
                                                                        // format(date, "yyyy-MM-dd")
                                                                    );
                                                                }}
                                                                className={`form-control ${meta.error ? "is-invalid" : ""
                                                                    }`}
                                                                popperPlacement="bottom-start"
                                                                calendarContainer={({ children }) => (
                                                                    <div className="bg-white react-datepicker">
                                                                        {children}
                                                                    </div>
                                                                )}
                                                            />
                                                            {meta.error && (
                                                                <div className="mt-1 text-danger">{meta.error}</div>
                                                            )}
                                                        </>
                                                    )}
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="timeStart" className="form-label">
                                                Start Time <span className="text-danger">*</span>
                                            </label>
                                            <Field name="timeStart">
                                                {({ field, meta }) => (
                                                    <>
                                                        <input
                                                            type="time"
                                                            id="timeStart"
                                                            name="timeStart"
                                                            value={values.timeStart}
                                                            className={`form-control ${meta.error ? "is-invalid" : ""}`}
                                                            required
                                                            {...field}
                                                        />
                                                        {meta.error && (
                                                            <div className="mt-1 text-danger">{meta.error}</div>
                                                        )}
                                                    </>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="timeEnd" className="form-label">
                                                End Time <span className="text-danger">*</span>
                                            </label>
                                            <Field name="timeEnd">
                                                {({ field, meta }) => (
                                                    <>
                                                        <input
                                                            type="time"
                                                            id="timeEnd"
                                                            name="timeEnd"
                                                            value={values.endTime}
                                                            className={`form-control ${meta.error ? "is-invalid" : ""}`}
                                                            required
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
                                        <button
                                            className="btn btn-light-brand"
                                            onClick={() => navigate(-1)}
                                        >
                                            <FiX size={16} className="me-2" />
                                            <span>Cancel</span>
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            {updateLoading ? (
                                                <div
                                                    className="spinner-border spinner-border-sm text-white me-2"
                                                    role="status"
                                                />
                                            ) : (
                                                <FiCheck size={16} className="me-2" />
                                            )}
                                            <span>Edit Appointment</span>
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div >
            {/* <AddProposal previtems={previtems} /> */}
        </>
    );
};

export default AppointmentsEditContent;