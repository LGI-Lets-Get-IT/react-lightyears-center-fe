import React, { useEffect, useState } from "react";
import Input from "@/components/shared/Input";
import TextArea from "@/components/shared/TextArea";
import { FiCheck, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { createTreatmentType } from "@/store/slice/treatmentTypeSlice";
import { treatmentTypeSchema } from "@/schemas/treatmentTypeSchema";

const TreatmentTypesCreateContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading: createLoading } = useSelector(state => state.treatmentTypes);

  const handleSubmit = (values, actions) => {
    // console.log('KJSFKAJSKASFJKJ', values)
    dispatch(createTreatmentType(values))
      .unwrap()
      .then(() => navigate("/treatment-types"))
      .catch((error) => "handle error");
  };
  return (
    <div className="col-lg-12">
      <div className="card border-top-0">
        <Formik initialValues={{
          treatmentName: null,
          treatmentDescription: null
        }} validationSchema={treatmentTypeSchema} onSubmit={handleSubmit}>
          <Form>
            <div className="card-body personal-info">
              <div className="mb-4 d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-0 me-4">
                  <span className="d-block mb-2">Create Treatment Type</span>
                  <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                    Information regarding the treatment type
                  </span>
                </h5>
              </div>
              <Field name="treatmentName">
                {({ field, meta }) => (
                  <Input
                    label={"Treatment Name"}
                    labelId={"treatmentName"}
                    placeholder={"Treatment Name"}
                    name={"treatmentName"}
                    meta={meta}
                    {...field}
                  />
                )}
              </Field>
              <Field name="treatmentDescription">
                {({ field, meta }) => (
                  <TextArea
                    row={4}
                    label={"Treatment Description"}
                    placeholder={"Treatment Description"}
                    labelId={"treatmentDescription"}
                    name={"treatmentDescription"}
                    meta={meta}
                    {...field}
                  />
                )}
              </Field>

            </div>
            <hr className="my-0" />
            <div className="card-body additional-info">
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
                  <span>Create Treatment</span>
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div >
  );
};

export default TreatmentTypesCreateContent;
