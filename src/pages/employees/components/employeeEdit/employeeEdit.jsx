import { useEffect, useState } from "react";
import Input from "@/components/shared/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateEmployeeById } from "@/store/slice/employeeSlice";
import { FiCheck, FiX } from "react-icons/fi";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { isActiveOptions, roleIdOptions } from "@/utils/options";
import { Field, Form, Formik } from "formik";
import { employeeSchema } from "@/schemas/employeeSchema";
import { format } from "date-fns";

const EmployeeEdit = ({ empData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading: updateLoading } = useSelector((state) => state.employees);

  const isActive = isActiveOptions;
  const roleId = roleIdOptions;
  const handleSubmit = (values, actions) => {
    dispatch(updateEmployeeById({ id, data: values }))
      .unwrap()
      .then(() => {
        actions.resetForm();
        navigate(`/employees/${id}`);
      })
      .catch((error) => console.error("handle error", error));
  };

  return (
    <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
      <div className="card-body personal-info">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <h5 className="fw-bold mb-0 me-4">
            <span className="d-block mb-2">Edit {empData?.fullName}</span>
            <span className="fs-12 fw-normal text-muted text-truncate-1-line">
              Last Edited:{" "}
              {empData?.updatedAt &&
                format(empData.updatedAt, "dd MMM yyyy, HH:mm aa")}
            </span>
          </h5>
        </div>
        <Formik
          initialValues={{
            fullName: empData?.fullName,
            phoneNumber: empData?.phoneNumber,
            email: empData?.email,
            roleId: empData?.roleId,
            isActive: empData?.isActive,
          }}
          enableReinitialize
          validationSchema={employeeSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Field name="fullName">
                {({ field, meta }) => (
                  <Input
                    icon="feather-user"
                    label={"Full Name"}
                    labelId={"nameInput"}
                    placeholder={"Full Name"}
                    name={"fullName"}
                    // value={values.fullName}
                    meta={meta}
                    isMandatory
                    {...field}
                  />
                )}
              </Field>

              <Field name="phoneNumber">
                {({ field, meta }) => (
                  <Input
                    icon="feather-phone"
                    label={"Phone Number"}
                    labelId={"phoneNumberInput"}
                    placeholder={"Employee's Phone Number"}
                    name={"phoneNumber"}
                    // value={values.phoneNumber}
                    meta={meta}
                    isMandatory
                    {...field}
                  />
                )}
              </Field>
              <Field name="email">
                {({ field, meta }) => (
                  <Input
                    icon="feather-mail"
                    label={"Email"}
                    type="email"
                    labelId={"emailInput"}
                    placeholder={"Employee's Email"}
                    name={"email"}
                    // value={values.email}
                    meta={meta}
                    isMandatory
                    {...field}
                    // {...getFieldProps('email')}
                  />
                )}
              </Field>
              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label htmlFor="roleId" className="fw-semibold">
                    Role <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-lg-8">
                  <SelectDropdown
                    name={"roleId"}
                    options={roleId}
                    selectedOption={values.roleId}
                    placeholder={values.roleId}
                    onSelectOption={(option) =>
                      setFieldValue("roleId", option.value)
                    }
                  />
                </div>
              </div>
              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label htmlFor="isActive" className="fw-semibold">
                    Employee Status <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-lg-8">
                  <SelectDropdown
                    name={"isActive"}
                    options={isActive}
                    selectedOption={values.isActive}
                    placeholder={values.isActive}
                    onSelectOption={(option) =>
                      setFieldValue("isActive", option.value)
                    }
                  />
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

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-white me-2"
                      role="status"
                    />
                  ) : (
                    <FiCheck size={16} className="me-2" />
                  )}
                  <span>Edit Employee</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmployeeEdit;
