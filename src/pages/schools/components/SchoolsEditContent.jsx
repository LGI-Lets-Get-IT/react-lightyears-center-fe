import React from "react";
import Input from "@/components/shared/Input";
import TextArea from "@/components/shared/TextArea";
import { FiCheck, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSchoolById } from "@/store/slice/schoolSlice";
import { Field, Form, Formik } from "formik";
import { schoolSchema } from "@/schemas/schoolSchema";

const SchoolsEditContent = ({ id, schoolData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading: updateLoading } = useSelector((state) => state.schools);

  const handleSubmit = (values, actions) => {
    dispatch(
      updateSchoolById({
        schoolId: id,
        data: values,
      })
    )
      .unwrap()
      .then(() => navigate(`/schools/${id}`))
      .catch((error) => "handle error");
  };
  return (
    <div className="col-lg-12">
      <div className="card border-top-0">
        <Formik
          initialValues={{
            schoolName: schoolData?.name,
            schoolAddress: schoolData?.address,
            schoolPhoneNumber: schoolData?.phoneNumber,
            schoolEmail: schoolData?.email,
            picName: schoolData?.picFullName,
            picPhoneNumber: schoolData?.picPhoneNumber,
            picEmail: schoolData?.picEmail,
          }}
          enableReinitialize
          validationSchema={schoolSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <div className="card-body personal-info">
                <div className="mb-4 d-flex align-items-center justify-content-between">
                  <h5 className="fw-bold mb-0 me-4">
                    <span className="d-block mb-2">
                      Edit {schoolData?.name} Data
                    </span>
                    <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                      {schoolData?.updatedAt}
                    </span>
                  </h5>
                </div>
                <Field name="schoolName">
                  {({ meta, field }) => (
                    <Input
                      name={"schoolName"}
                      icon="lu-school"
                      label={"School Name"}
                      labelId={"schoolNameInput"}
                      placeholder={"School Name"}
                      value={values.schoolName}
                      meta={meta}
                      {...field}
                    />
                  )}
                </Field>
                <Field name="schoolAddress">
                  {({ field, meta }) => (
                    <TextArea
                      label={"School Address"}
                      icon="feather-map-pin"
                      placeholder={"School Address"}
                      labelId={"schoolAddress"}
                      name={"schoolAddress"}
                      value={values.schoolAddress}
                      meta={meta}
                      {...field}
                    />
                  )}
                </Field>

                <Field name="schoolPhoneNumber">
                  {({ field, meta }) => (
                    <Input
                      icon="feather-phone"
                      label={"School Phone Number"}
                      labelId={"phoneNumberInput"}
                      placeholder={"School Phone Number"}
                      name={"schoolPhoneNumber"}
                      value={values.schoolPhoneNumber}
                      meta={meta}
                      {...field}
                    />
                  )}
                </Field>

                <Field name="schoolEmail">
                  {({ field, meta }) => (
                    <Input
                      icon="feather-mail"
                      label={"School Email"}
                      labelId={"emailInput"}
                      placeholder={"School Email"}
                      name={"schoolEmail"}
                      type={"email"}
                      value={values.schoolEmail}
                      meta={meta}
                      {...field}
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
                  {({ field, meta }) => (
                    <Input
                      icon="feather-user"
                      label={"PIC Full Name"}
                      labelId={"picFullNameInput"}
                      placeholder={"PIC Full Name"}
                      name={"picName"}
                      value={values.picName}
                      meta={meta}
                      {...field}
                    />
                  )}
                </Field>

                <Field name="picPhoneNumber">
                  {({ field, meta }) => (
                    <Input
                      icon="feather-phone"
                      label={"PIC Phone Number"}
                      labelId={"picPhoneInput"}
                      placeholder={"PIC Phone Number"}
                      name={"picPhoneNumber"}
                      value={values.picPhoneNumber}
                      meta={meta}
                      {...field}
                    />
                  )}
                </Field>

                <Field name="picEmail">
                  {({ field, meta }) => (
                    <Input
                      icon="feather-mail"
                      label={"PIC Email"}
                      labelId={"picEmailInput"}
                      placeholder={"PIC Email"}
                      name={"picEmail"}
                      type={"email"}
                      value={values.picEmail}
                      meta={meta}
                      {...field}
                    />
                  )}
                </Field>

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
                    ) : (
                      <FiCheck size={16} className="me-2" />
                    )}
                    <span>Edit School</span>
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

export default SchoolsEditContent;
