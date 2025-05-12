import { useEffect, useState } from "react";
import Input from "@/components/shared/Input";
import useDatePicker from "@/hooks/useDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSchools } from "../../../../store/slice/schoolSlice";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { updateEmployeeById } from "@/store/slice/employeeSlice";

const TabProfile = ({ empData }) => {
  const [userInput, setEmployeeInput] = useState({});
  const [selectedOption, setSelectedOption] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { startDate, setStartDate, renderFooter } = useDatePicker();

  useEffect(() => {
    dispatch(fetchAllSchools());
  }, []);

  useEffect(() => {
    setEmployeeInput({
      fullName: empData?.fullName,
      phoneNumber: empData?.phoneNumber,
      email: empData?.email,
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
    const formattedDate = startDate
      ? format(startDate, "yyyy-MM-dd")
      : format(empData?.dateOfBirth, "yyyy-MM-dd");

    const body = {
      ...userInput,
      id: id,
      fullName: userInput.fullName,
      phoneNumber: userInput.phoneNumber,
      email: userInput.email,
      dateOfBirth: formattedDate,
      nationality: selectedOption["nationality"]?.label,
      schoolId: selectedOption["school"]?.value,
      guardianNationality: selectedOption["guardianNationality"]?.label,
      guardianRelationship: selectedOption["relationship"]?.label,
      gender: selectedOption["gender"]?.label,
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
                Edit {empData?.fullName} Information.{" "}
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
        </div>
      </form>
    </div>
  );
};

export default TabProfile;
