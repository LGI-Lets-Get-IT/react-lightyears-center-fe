import React, { useEffect, useState } from "react";
import TabProfile from "../../../components/customersCreate/TabProfile";
import TabPassword from "../../../components/customersCreate/TabPassword";
import TabBilling from "../../../components/customersCreate/TabBilling";
import TabNotificationsContent from "../../../components/customersView/TabNotificationsContent";
import TabConnections from "../../../components/customersView/TabConnections";
import TabBillingContent from "../../../components/customersView/TabBillingContent";
import Input from "@/components/shared/Input";
import TextArea from "@/components/shared/TextArea";
import { FiCalendar, FiCheck, FiLayers, FiUserPlus, FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";
import useDatePicker from "@/hooks/useDatePicker";
import useLocationData from "@/hooks/useLocationData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { genderOptions, relationshipOptions } from "@/utils/options";
import { createSchool, fetchAllSchools } from "@/store/slice/schoolSlice";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { createTestType } from "@/store/slice/testTypeSlice";
import { Field, Form, Formik } from "formik";
import { testTypeSchema } from "@/schemas/testTypeSchema";

const TestTypesCreateContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    // console.log('KJSFKAJSKASFJKJ', values)
    dispatch(createTestType(values))
      .unwrap()
      .then(() => navigate("/test-types"))
      .catch((error) => "handle error");
  };
  return (
    <div className="col-lg-12">
      <div className="card border-top-0">
        <Formik initialValues={{
          name: null,
          description: null
        }} validationSchema={testTypeSchema} onSubmit={handleSubmit}>
          <Form>
            <div className="card-body personal-info">
              <div className="mb-4 d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-0 me-4">
                  <span className="d-block mb-2">Test Type Information:</span>
                  <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                    Information regarding the test type
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
                <button type="submit" className="btn btn-primary">
                  <FiCheck size={16} className="me-2" />
                  <span>Create Test</span>
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default TestTypesCreateContent;
