import { useEffect, useState } from "react";
import { FiCalendar, FiCheck, FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";
import SelectDropdown from "@/components/shared/SelectDropdown";
import Input from "@/components/shared/Input";
import { genderOptions, relationshipOptions } from "@/utils/options";
import useLocationData from "@/hooks/useLocationData";
import useDatePicker from "@/hooks/useDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSchools } from "../../../store/slice/schoolSlice";
import { createClient } from "@/store/slice/clientSlice";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const TabProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { schools } = useSelector((state) => state.schools);
  const [userInput, setUserInput] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const { startDate, setStartDate, renderFooter } = useDatePicker();
  const { countries } = useLocationData();
  // const group = customerListTagsOptions
  // const status = customerListStatusOptions
  const relationships = relationshipOptions;
  const gender = genderOptions;

  useEffect(() => {
    dispatch(fetchAllSchools());
  }, []);

  const handleChange = (event) => {
    setUserInput((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedDate = startDate ? format(startDate, "yyyy-MM-dd") : "";
    // console.log("SELECTEDOPTION", selectedOption);
    const body = {
      ...userInput,
      dateOfBirth: formattedDate,
      nationality: selectedOption["nationality"]?.label,
      schoolId: selectedOption["school"]?.value,
      guardianNationality: selectedOption["guardianNationality"]?.label,
      guardianRelationship: selectedOption["relationship"]?.label,
      gender: selectedOption["gender"]?.label,
    };

    dispatch(createClient(body))
      .unwrap()
      .then(() => navigate("/clients"))
      .catch((error) => console.error("handle error", error));
  };

  return (
    <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
      <form onSubmit={handleSubmit}>
        <div className="card-body personal-info">
          <div className="mb-4 d-flex align-items-center justify-content-between">
            <h5 className="fw-bold mb-0 me-4">
              <span className="d-block mb-2">Child Information:</span>
              <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                Following information is publicly displayed, be careful!{" "}
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
            value={userInput.fullName || ""}
          />
          <Input
            icon="feather-link-2"
            label={"Age"}
            labelId={"ageInput"}
            placeholder={"Age"}
            name={"age"}
            onChange={handleChange}
            value={userInput.age || ""}
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
                    placeholderText="Pick date of birth"
                    selected={startDate}
                    showPopperArrow={false}
                    dateFormat="yyyy-MM-dd" // Updated format
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
                placeholder={"Select Child Gender"}
                // defaultSelect="usa"
                onSelectOption={(option) => {
                  setSelectedOption({ ...selectedOption, gender: option });
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
                placeholder={"Select Child Nationality"}
                // defaultSelect="usa"
                onSelectOption={(option) => {
                  // fetchStates(option.label);
                  // fetchCities(option.label);
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
                placeholder={"Select School Name"}
                // defaultSelect="usa"
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
              <span className="d-block mb-2">Guardian Information:</span>
              <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                Communication details for us to connect with.
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
            value={userInput.guardianName || ""}
          />
          <Input
            icon="feather-mail"
            label={"Guardian Email"}
            labelId={"emailInput"}
            placeholder={"Guardian Email"}
            name={"guardianEmail"}
            type={"email"}
            onChange={handleChange}
            value={userInput.guardianEmail || ""}
          />
          <Input
            icon="feather-phone"
            label={"Guardian Phone"}
            labelId={"phoneInput"}
            placeholder={"Guardian Phone Number"}
            name={"guardianPhone"}
            onChange={handleChange}
            value={userInput.guardianPhone || ""}
          />
          <div className="row mb-4 align-items-center">
            <div className="col-lg-4">
              <label className="fw-semibold">Nationality: </label>
            </div>
            <div className="col-lg-8">
              <SelectDropdown
                options={countries}
                selectedOption={selectedOption?.guardianNationality}
                placeholder={"Select Guardian Nationality"}
                // defaultSelect="usa"
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
                placeholder="Select Gender"
                onSelectOption={(option) =>
                  setSelectedOption({ ...selectedOption, relationship: option })
                }
              />
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-2 page-header-right-items-wrapper">
            <a href="#" className="btn btn-light-brand">
              <FiX size={16} className="me-2" />
              <span>Cancel</span>
            </a>
            <button type="submit" className="btn btn-primary">
              <FiCheck size={16} className="me-2" />
              <span>Create Client</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TabProfile;
