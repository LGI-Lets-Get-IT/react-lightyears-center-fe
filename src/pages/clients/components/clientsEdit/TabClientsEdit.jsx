import { useEffect, useState } from "react";
import { FiCalendar, FiCheck, FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";
import SelectDropdown from "@/components/shared/SelectDropdown";
import Input from "@/components/shared/Input";
import { genderOptions, relationshipOptions } from "@/utils/options";
import useLocationData from "@/hooks/useLocationData";
import useDatePicker from "@/hooks/useDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSchools } from "../../../../store/slice/schoolSlice";
import {  updateClientByUuid } from "@/store/slice/clientSlice";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

const TabProfile = ({ userData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uuid } = useParams();
  const { schools } = useSelector((state) => state.schools);
  const [userInput, setUserInput] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const { startDate, setStartDate, renderFooter } = useDatePicker();
  const { countries } = useLocationData();
  const relationships = relationshipOptions;
  const gender = genderOptions;

  useEffect(() => {
    dispatch(fetchAllSchools());
  }, []);

  useEffect(() => {
    setUserInput({
      fullName: userData?.fullName,
      age: userData?.age,
      guardianName: userData?.guardianName,
      guardianEmail: userData?.guardianEmail,
      guardianPhone: userData?.guardianPhone,
    })
  }, [userData])

  const handleChange = (event) => {
    setUserInput((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedDate = startDate ? format(startDate, "yyyy-MM-dd") : format(userData?.dateOfBirth, 'yyyy-MM-dd');


    const body = {
      ...userInput,
      clientUuid: uuid,
      dateOfBirth: formattedDate,
      nationality: selectedOption["nationality"]?.label,
      schoolId: selectedOption["school"]?.value,
      guardianNationality: selectedOption["guardianNationality"]?.label,
      guardianRelationship: selectedOption["relationship"]?.label,
      gender: selectedOption["gender"]?.label,
    };

    dispatch(updateClientByUuid(body))
      .unwrap()
      .then(() => navigate(`/clients/${uuid}`))
      .catch((error) => console.error("handle error", error));
  };

  return (
    <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
      <form onSubmit={handleSubmit}>
        <div className="card-body personal-info">
          <div className="mb-4 d-flex align-items-center justify-content-between">
            <h5 className="fw-bold mb-0 me-4">
              <span className="d-block mb-2">
                {userData?.fullName}&apos;s Information Edit:
              </span>
              <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                Edit Child Information.{" "}
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
            icon="feather-link-2"
            label={"Age"}
            labelId={"ageInput"}
            placeholder={"Age"}
            name={"age"}
            onChange={handleChange}
            value={userInput.age}
          />
          <div className="row mb-4 align-items-center">
            <div className="col-lg-4">
              <label htmlFor="dateofBirth" className="fw-semibold">
                Date of Birth:{" "}
              </label>
            </div>
            <div className="col-lg-8">
              <div className="input-group flex-nowrap">
                <div className="input-group-text">
                  <FiCalendar size={16} />
                </div>
                <div
                  className="w-100 d-flex date  rounded-0"
                  style={{ flexBasis: "95%" }}
                >
                  <DatePicker
                    showYearDropdown
                    placeholderText={`${userData?.dateOfBirth}`}
                    selected={
                      startDate ||
                      (userData?.dateOfBirth
                        ? new Date(userData.dateOfBirth)
                        : null)
                    }
                    // value={userInput.dateOfBirth || userData?.dateOfBirth}
                    showPopperArrow={false}
                    dateFormat="yyyy-MM-dd"
                    onChange={(date) => setStartDate(date)}
                    className="form-control rounded-0"
                    popperPlacement="bottom-start"
                    calendarContainer={({ children }) => (
                      <div className="bg-white react-datepicker">
                        {children}
                        {renderFooter("start")}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4 align-items-center">
            <div className="col-lg-4">
              <label className="fw-semibold">Gender: </label>
            </div>
            <div className="col-lg-8">
              <SelectDropdown
                options={gender}
                selectedOption={selectedOption?.gender}
                placeholder={`${userData?.gender}`}
                // selectedOption={selectedOption?.gender}
                // defaultSelect={userData?.gender}
                onSelectOption={(option) => {
                  setSelectedOption({
                    ...selectedOption,
                    gender: option,
                  });
                }}
              />
            </div>
          </div>
          <div className="row mb-4 align-items-center">
            <div className="col-lg-4">
              <label className="fw-semibold">Nationality: </label>
            </div>
            <div className="col-lg-8">
              <SelectDropdown
                options={countries}
                selectedOption={selectedOption?.nationality}
                placeholder={`${userData?.nationality}`}
                // selectedOption={selectedOption?.nationality}
                // defaultSelect={userData?.nationality}
                onSelectOption={(option) => {
                  setSelectedOption({ ...selectedOption, nationality: option });
                }}
              />
            </div>
          </div>
          <div className="row mb-4 align-items-center">
            <div className="col-lg-4">
              <label className="fw-semibold">School Name: </label>
            </div>
            <div className="col-lg-8">
              <SelectDropdown
                options={schools.map((school) => ({
                  label: school.name,
                  value: school.id,
                }))}
                selectedOption={selectedOption?.school}
                placeholder={userData?.schoolName}
                // defaultSelect={userData?.schoolId}
                onSelectOption={(option) => {
                  setSelectedOption({ ...selectedOption, school: option });
                }}
              />
              <hr className="my-0" />
            </div>
          </div>
        </div>
        <hr className="my-0" />
        <div className="card-body additional-info">
          <div className="mb-4 d-flex align-items-center justify-content-between">
            <h5 className="fw-bold mb-0 me-4">
              <span className="d-block mb-2">
                {userData?.fullName}&apos;s Guardian Information Edit:
              </span>
              <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                Edit Guardian Information.
              </span>
            </h5>
          </div>
          <Input
            icon="feather-user"
            label={"Guardian Name"}
            labelId={"guardianNameInput"}
            placeholder={"Guardian Name"}
            name={"guardianName"}
            onChange={handleChange}
            value={userInput.guardianName}
          />
          <Input
            icon="feather-mail"
            label={"Guardian Email"}
            labelId={"emailInput"}
            placeholder={"Guardian Email"}
            name={"guardianEmail"}
            type={"email"}
            onChange={handleChange}
            value={userInput.guardianEmail}
          />
          <Input
            icon="feather-phone"
            label={"Guardian Phone"}
            labelId={"phoneInput"}
            placeholder={"Guardian Phone Number"}
            name={"guardianPhone"}
            onChange={handleChange}
            value={userInput.guardianPhone}
          />
          <div className="row mb-4 align-items-center">
            <div className="col-lg-4">
              <label className="fw-semibold">Nationality: </label>
            </div>
            <div className="col-lg-8">
              <SelectDropdown
                options={countries}
                selectedOption={selectedOption?.guardianNationality}
                placeholder={userData?.guardianNationality}
                // selectedOption={selectedOption?.guardianNationality}
                // defaultSelect={userData?.guardianNationality}
                onSelectOption={(option) => {
                  // fetchStates(option.label);
                  // fetchCities(option.label);
                  setSelectedOption({
                    ...selectedOption,
                    guardianNationality: option,
                  });
                }}
              />
            </div>
          </div>

          <div className="row mb-4 align-items-center">
            <div className="col-lg-4">
              <label className="fw-semibold">Relationship with child: </label>
            </div>
            <div className="col-lg-8">
              <SelectDropdown
                options={relationships}
                selectedOption={selectedOption?.relationship}
                placeholder={`${userData?.guardianRelationship}`}
                // selectedOption={selectedOption?.relationship}
                // defaultSelect={userData?.guardianRelationship}
                onSelectOption={(option) =>
                  setSelectedOption({ ...selectedOption, relationship: option })
                }
              />
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center gap-2 page-header-right-items-wrapper">
            <a
              className="btn btn-light-brand"
              onClick={() => navigate(-1)}
            >
              <FiX size={16} className="me-2" />
              <span>Cancel</span>
            </a>

            <button type="submit" className="btn btn-primary">
              <FiCheck size={16} className="me-2" />
              <span>Edit Client</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TabProfile;
