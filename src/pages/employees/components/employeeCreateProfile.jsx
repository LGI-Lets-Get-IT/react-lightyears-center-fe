import Input from "@/components/shared/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createEmployee } from "@/store/slice/employeeSlice";
import { FiCheck, FiX } from "react-icons/fi";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { isActiveOptions, roleIdOptions } from "@/utils/options";
import { Field, Form, Formik } from "formik";
import { employeeSchema } from "@/schemas/employeeSchema";

const EmployeeCreateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading: createLoading } = useSelector(state => state.employees);

  const isActive = isActiveOptions;
  const roleId = roleIdOptions;
  const handleSubmit = (values, actions) => {
    dispatch(createEmployee(values))
      .unwrap()
      .then(() => {
        actions.resetForm()
        navigate(`/employees`)
      })
      .catch((error) => console.error("handle error", error));
  };

  return (
    <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
      <div className="card-body personal-info">
        <div className="mb-4 d-flex align-items-center justify-content-between">
          <h5 className="fw-bold mb-0 me-4">
            <span className="d-block mb-2">
              Create Employee
            </span>
            {/* <span className="fs-12 fw-normal text-muted text-truncate-1-line">
              Last Edited: {empData?.updatedAt && format(empData.updatedAt, 'dd MMM yyyy, HH:mm aa')}
            </span> */}
          </h5>
        </div>
        <Formik initialValues={{
          fullName: null,
          phoneNumber: null,
          email: null,
          roleId: null,
          isActive: null,
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
                    {...field}
                  // {...getFieldProps('email')}
                  />
                )}
              </Field>
              <div className="row mb-4 align-items-center">
                <div className="col-lg-4">
                  <label className="fw-semibold">Role: </label>
                </div>
                <div className="col-lg-8">
                  <SelectDropdown
                    name={'roleId'}
                    options={roleId}
                    selectedOption={values.roleId}
                    placeholder={"Select Employee Role"}
                    onSelectOption={(option) => setFieldValue('roleId', option.value)}
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
                    placeholder={"Select Employee Status"}
                    onSelectOption={(option) => setFieldValue('isActive', option.value)}
                  />
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
                  <span>Create Employee</span>
                </button>

              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmployeeCreateProfile;
