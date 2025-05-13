import { useEffect, useState } from "react";
import Input from "@/components/shared/Input";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateEmployeeById } from "@/store/slice/employeeSlice";
import { FiCheck, FiX } from "react-icons/fi";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { isActiveOptions, roleIdOptions } from "@/utils/options";
import { Form, Formik } from "formik";
import { employeeSchema } from "@/schemas/employeeSchema";

const EmployeeEdit = ({ empData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isActive = isActiveOptions;
  const roleId = roleIdOptions;

  const handleSubmit = (values, actions) => {
    console.log('ID', id)
    console.log('HANDLESUBMIT', values, actions);

    dispatch(updateEmployeeById({ id, ...values }))
      .unwrap()
      .then(() => {
        actions.resetForm()
        navigate(`/employees/${id}`)
      })
      .catch((error) => console.error("handle error", error));
  };

  return (
    <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
      <div className="card-body personal-info">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <h5 className="fw-bold mb-0 me-4">
            <span className="d-block mb-2">
              {empData?.fullName}&apos;s Information Edit:
            </span>
            <span className="fs-12 fw-normal text-muted text-truncate-1-line">
              Last Edited: {empData?.updatedAt}.{" "}
            </span>
          </h5>
        </div>
        <Formik initialValues={{
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
          {({ values, setFieldValue, getFieldProps }) => (
            <Form>
              <Input
                icon="feather-user"
                label={"Full Name"}
                labelId={"nameInput"}
                placeholder={"Full Name"}
                name={"fullName"}
                value={values.fullName}
                {...getFieldProps('fullName')}
              />
              <Input
                icon="feather-phone"
                label={"Phone Number"}
                labelId={"phoneNumberInput"}
                placeholder={"Employee's Phone Number"}
                name={"phoneNumber"}
                value={values.phoneNumber}
                {...getFieldProps('phoneNumber')}
              />
              <Input
                icon="feather-mail"
                label={"Email"}
                type="email"
                labelId={"emailInput"}
                placeholder={"Employee's Email"}
                name={"email"}
                value={values.email}
                {...getFieldProps('email')}
              />
              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label className="fw-semibold">Role: </label>
                </div>
                <div className="col-lg-8">
                  <SelectDropdown
                    name={'roleId'}
                    options={roleId}
                    selectedOption={values.roleId}
                    placeholder={values.roleId}
                    onSelectOption={(option) => setFieldValue('roleId', option)}
                  />
                </div>
              </div>
              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label className="fw-semibold">Employee Status : </label>
                </div>
                <div className="col-lg-8">
                  <SelectDropdown
                    name={'isActive'}
                    options={isActive}
                    selectedOption={values.isActive}
                    placeholder={values.isActive}
                    onSelectOption={(option) => setFieldValue('isActive', option)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center gap-2 page-header-right-items-wrapper">
                <a className="btn btn-light-brand" onClick={() => navigate(-1)}>
                  <FiX size={16} className="me-2" />
                  <span>Cancel</span>
                </a>

                <button type="submit" className="btn btn-primary">
                  <FiCheck size={16} className="me-2" />
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
