import { useEffect, useState } from "react";
import Input from "@/components/shared/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { updateEmployeeById } from "@/store/slice/employeeSlice";
import { FiCheck, FiX } from "react-icons/fi";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { isActiveOptions, roleIdOptions } from "@/utils/options";
import { is } from "date-fns/locale";

const EmployeeEdit = ({ empData }) => {
  const [userInput, setEmployeeInput] = useState({});
  const [selectedOption, setSelectedOption] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isActive = isActiveOptions;
  const roleId = roleIdOptions;

  useEffect(() => {
    setEmployeeInput({
      fullName: empData?.fullName,
      phoneNumber: empData?.phoneNumber,
      email: empData?.email,
      isActive: empData?.isActive,
      roleId: empData?.roleId,
    });
  }, [empData]);

  const handleChange = (event) => {
    setEmployeeInput((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make sure selectedOption exists and has the necessary properties
    const isActive = selectedOption?.isActive?.value ?? null;
    const roleId = selectedOption?.roleId?.value ?? null;

    const body = {
      ...userInput,
      id,
      isActive,
      roleId,
    };

    dispatch(updateEmployeeById(body))
      .unwrap()
      .then(() => navigate(`/employees/${id}`))
      .catch((error) => console.error("handle error", error));
  };

  return (
    <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
      <form onSubmit={handleSubmit}>
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
          <Input
            icon="feather-user"
            label={"Full Name"}
            labelId={"nameInput"}
            placeholder={"Full Name"}
            name={"fullName"}
            onChange={handleChange}
            value={userInput.fullName}
          />
          <Input
            icon="feather-phone"
            label={"Phone Number"}
            labelId={"phoneNumberInput"}
            placeholder={"Employee's Phone Number"}
            name={"phoneNumber"}
            onChange={handleChange}
            value={userInput.phoneNumber}
          />
          <Input
            icon="feather-mail"
            label={"Email"}
            labelId={"emailInput"}
            placeholder={"Employee's Email"}
            name={"email"}
            onChange={handleChange}
            value={userInput.email}
          />
          <div className="row mb-4 align-items-center">
            <div className="col-lg-4">
              <label className="fw-semibold">Role: </label>
            </div>
            <div className="col-lg-8">
              <SelectDropdown
                options={roleId}
                selectedOption={selectedOption?.roleId}
                placeholder={`${userInput?.roleId}`}
                // selectedOption={selectedOption?.gender}
                // defaultSelect={userData?.gender}
                onSelectOption={(option) => {
                  setSelectedOption({
                    ...selectedOption,
                    roleId: option,
                  });
                }}
              />
            </div>
          </div>
          <div className="row mb-4 align-items-center">
            <div className="col-lg-4">
              <label className="fw-semibold">isActive?: </label>
            </div>
            <div className="col-lg-8">
              <SelectDropdown
                options={isActive}
                selectedOption={selectedOption?.isActive}
                placeholder={`${userInput?.isActive}`}
                // selectedOption={selectedOption?.gender}
                // defaultSelect={userData?.gender}
                onSelectOption={(option) => {
                  setSelectedOption({
                    ...selectedOption,
                    isActive: option,
                  });
                }}
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
        </div>
      </form>
    </div>
  );
};

export default EmployeeEdit;
