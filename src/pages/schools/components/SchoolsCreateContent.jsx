import React from "react";
import Input from "@/components/shared/Input";
import TextArea from "@/components/shared/TextArea";
import { FiCheck, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSchool } from "@/store/slice/schoolSlice";
import { Field, Form, Formik } from "formik";
import { schoolSchema } from "@/schemas/schoolSchema";

const SchoolsCreateContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading: createLoading } = useSelector(state => state.schools);

  const handleSubmit = (values, actions) => {
    console.log('HANDLESUBMIT', values)
    dispatch(createSchool(values))
      .unwrap()
      .then(() => navigate("/schools"))
      .catch((error) => "handle error");
  };
  return (
    <div className="col-lg-12">
      <div className="card border-top-0">
        <Formik
          initialValues={{
            schoolName: '',
            schoolAddress: '',
            schoolPhoneNumber: '',
            schoolEmail: '',
            picName: '',
            picPhoneNumber: '',
            picEmail: '',
          }}
          validationSchema={schoolSchema}
          onSubmit={handleSubmit}>
          {({ values, getFieldProps }) => (
            <Form>
              <div className="card-body personal-info">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                  <h5 className="fw-bold mb-0 me-4">
                    <span className="d-block mb-2">School Information:</span>
                    <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                      Following information is publicly displayed, be careful!{" "}
                    </span>
                  </h5>
                </div>
                <Field name="schoolName">
                  {({ meta }) => (
                    <Input
                      name={"schoolName"}
                      icon="lu-school"
                      label={"School Name"}
                      labelId={"schoolNameInput"}
                      placeholder={"School Name"}
                      value={values.schoolName}
                      meta={meta}
                      {...getFieldProps('schoolName')}
                    />
                  )}
                </Field>
                <Field name="schoolAddress">
                  {({ meta }) => (
                    <TextArea
                      label={"School Address"}
                      icon="feather-map-pin"
                      placeholder={"School Address"}
                      labelId={"schoolAddress"}
                      name={"schoolAddress"}
                      meta={meta}
                      {...getFieldProps('schoolAddress')}
                    />
                  )}
                </Field>

                <Field name="schoolPhoneNumber">
                  {({ meta }) => (
                    <Input
                      icon="feather-phone"
                      label={"School Phone Number"}
                      labelId={"phoneNumberInput"}
                      placeholder={"School Phone Number"}
                      name={"schoolPhoneNumber"}
                      value={values.schoolPhoneNumber}
                      meta={meta}
                      {...getFieldProps('schoolPhoneNumber')}
                    />
                  )}
                </Field>

                <Field name="schoolEmail">
                  {({ meta }) => (
                    <Input
                      icon="feather-mail"
                      label={"School Email"}
                      labelId={"emailInput"}
                      placeholder={"School Email"}
                      name={"schoolEmail"}
                      type={"email"}
                      value={values.schoolEmail}
                      meta={meta}
                      {...getFieldProps('schoolEmail')}
                    />
                  )}
                </Field>
              </div>
              <hr className="my-0" />
              <div className="card-body additional-info">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                  <h5 className="fw-bold mb-0 me-4">
                    <span className="d-block mb-2">PIC Information:</span>
                    <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                      Communication details for us to connect with.
                    </span>
                  </h5>
                </div>
                <Field name="picName">
                  {({ meta }) => (
                    <Input
                      icon="feather-user"
                      label={"PIC Full Name"}
                      labelId={"picFullNameInput"}
                      placeholder={"PIC Full Name"}
                      name={"picName"}
                      value={values.picName}
                      meta={meta}
                      {...getFieldProps('picName')}
                    />
                  )}
                </Field>

                <Field name="picPhoneNumber">
                  {({ meta }) => (
                    <Input
                      icon="feather-phone"
                      label={"PIC Phone Number"}
                      labelId={"picPhoneInput"}
                      placeholder={"PIC Phone Number"}
                      name={"picPhoneNumber"}
                      value={values.picPhoneNumber}
                      meta={meta}
                      {...getFieldProps('picPhoneNumber')}
                    />
                  )}
                </Field>

                <Field name="picEmail">
                  {({ meta }) => (
                    <Input
                      icon="feather-mail"
                      label={"PIC Email"}
                      labelId={"picEmailInput"}
                      placeholder={"PIC Email"}
                      name={"picEmail"}
                      type={"email"}
                      value={values.picEmail}
                      meta={meta}
                      {...getFieldProps('picEmail')}
                    />
                  )}
                </Field>

                <div className="d-flex justify-content-end align-items-center gap-2 page-header-right-items-wrapper">
                  <a href="#" className="btn btn-light-brand">
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
                    <span>Create School</span>
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

export default SchoolsCreateContent;
