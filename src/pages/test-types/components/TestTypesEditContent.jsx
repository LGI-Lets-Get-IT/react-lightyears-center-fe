import React, { useEffect, useState } from "react";
import Input from "@/components/shared/Input";
import TextArea from "@/components/shared/TextArea";
import { FiCheck, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTestTypeById } from "@/store/slice/testTypeSlice";
import { Field, Form, Formik } from "formik";
import { testTypeSchema } from "@/schemas/testTypeSchema";
import { format } from "date-fns";

const TestTypesEditContent = ({ id, testData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading: updateLoading } = useSelector(state => state.testTypes)

  const handleSubmit = (values, actions) => {
    dispatch(updateTestTypeById({ testTypeId: id, data: values }))
      .unwrap()
      .then(() => navigate(`/test-types`))
      .catch((error) => "handle error");
  };
  return (
    <div className="col-lg-12">
      <div className="card border-top-0">
        <Formik initialValues={{
          testName: testData?.name,
          testDescription: testData?.description
        }}
          enableReinitialize
          validationSchema={testTypeSchema}
          onSubmit={handleSubmit}>
          {({ values }) => (
            <Form>
              <div className="card-body personal-info">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                  <h5 className="fw-bold mb-0 me-4">
                    <span className="d-block mb-2">Edit {testData?.name}</span>
                    <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                      Last Edited: {testData?.updatedAt ? format(testData.updatedAt, 'dd MMM yyyy, HH:mm aa') : '-'}
                    </span>
                  </h5>
                </div>
                <Field name="testName">
                  {({ field, meta }) => (
                    <Input
                      label={"Test Name"}
                      labelId={"nameInput"}
                      placeholder={"Test Name"}
                      name={"testName"}
                      values={values.testName}
                      meta={meta}
                      {...field}
                    />
                  )}
                </Field>
                <Field name="testDescription">
                  {({ field, meta }) => (
                    <TextArea
                      row={4}
                      label={"Test Description"}
                      placeholder={"Test Description"}
                      labelId={"description"}
                      name={"testDescription"}
                      value={values.testDescription}
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
                  <button type="submit" className="btn btn-primary" disabled={updateLoading}>
                    {updateLoading ? (
                      <div
                        className="spinner-border spinner-border-sm text-white me-2"
                        role="status"
                      />
                    ) : (
                      <FiCheck size={16} className="me-2" />
                    )}
                    <span>Edit Test</span>
                  </button>
                </div>
              </div>
            </Form>
          )}

        </Formik>
      </div>
    </div>
  );
};

export default TestTypesEditContent;
