import React, { useEffect, useState } from "react";
import { FiCalendar, FiCamera, FiLayers, FiUserPlus } from "react-icons/fi";
import DatePicker from "react-datepicker";
import TextArea from "@/components/shared/TextArea";
import SelectDropdown from "@/components/shared/SelectDropdown";
import Input from "@/components/shared/Input";
import MultiSelectTags from "@/components/shared/MultiSelectTags";
import {
  customerListStatusOptions,
  customerListTagsOptions,
  genderOptions,
  relationshipOptions,
} from "@/utils/options";
import useLocationData from "@/hooks/useLocationData";
import useDatePicker from "@/hooks/useDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSchools } from "../../store/slice/schoolSlice";
import { FaPlus } from "react-icons/fa";
import { createClient } from "@/store/slice/clientSlice";
import { Navigate, useNavigate } from "react-router-dom";

const TabProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { schools } = useSelector((state) => state.schools);
  const [inputs, setInputs] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const [nationalityOption, setNationalityOption] = useState({});
  const [relationshipOption, setRelationshipOption] = useState({});
  const [genderOption, setGenderOption] = useState({});
  const [guardianNationalityOption, setGuardianNationalityOption] = useState(
    {}
  );
  const [schoolOption, setSchoolOption] = useState({});
  const { startDate, endDate, setStartDate, setEndDate, renderFooter } =
    useDatePicker();
  const { countries } = useLocationData();
  // const group = customerListTagsOptions
  // const status = customerListStatusOptions
  const relationships = relationshipOptions;
  const gender = genderOptions;

  useEffect(() => {
    dispatch(fetchAllSchools());
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      ...inputs,
      nationality: nationalityOption.label,
      schoolId: schoolOption.value,
      guardianNationality: guardianNationalityOption.label,
      guardianRelationship: relationshipOption.label,
      gender: genderOption.label,
    };
    // console.log("INPUTS", inputs);1

    dispatch(createClient(body))
      .unwrap()
      .then(() => navigate("/clients"))
      .catch((error) => "handle error");
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
            value={inputs.fullName || ""}
          />
          <Input
            icon="feather-link-2"
            label={"Age"}
            labelId={"ageInput"}
            placeholder={"Age"}
            name={"age"}
            onChange={handleChange}
            value={inputs.age || ""}
          />
          <TextArea
            label={"Child Address"}
            icon="feather-map-pin"
            placeholder={"Child Address"}
            labelId={"childAddress"}
            onChange={handleChange}
            name={"address"}
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
                    placeholderText="Pick date of birth"
                    selected={startDate}
                    showPopperArrow={false}
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
                selectedOption={genderOption}
                placeholder={"Select Child Gender"}
                // defaultSelect="usa"
                onSelectOption={(option) => {
                  // fetchStates(option.label);
                  // fetchCities(option.label);
                  setGenderOption(option);
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
                selectedOption={nationalityOption}
                placeholder={"Select Child Nationality"}
                // defaultSelect="usa"
                onSelectOption={(option) => {
                  // fetchStates(option.label);
                  // fetchCities(option.label);
                  setNationalityOption(option);
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
                selectedOption={schoolOption}
                placeholder={"Select School Name"}
                // defaultSelect="usa"
                onSelectOption={(option) => {
                  setSchoolOption(option);
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
            value={inputs.guardianName || ""}
          />
          <Input
            icon="feather-mail"
            label={"Guardian Email"}
            labelId={"emailInput"}
            placeholder={"Guardian Email"}
            name={"guardianEmail"}
            type={"email"}
            onChange={handleChange}
            value={inputs.guardianEmail || ""}
          />
          <Input
            icon="feather-phone"
            label={"Guardian Phone"}
            labelId={"phoneInput"}
            placeholder={"Guardian Phone Number"}
            name={"guardianPhone"}
            onChange={handleChange}
            value={inputs.guardianPhone || ""}
          />
          <div className="row mb-4 align-items-center">
            <div className="col-lg-4">
              <label className="fw-semibold">Nationality: </label>
            </div>
            <div className="col-lg-8">
              <SelectDropdown
                options={countries}
                selectedOption={guardianNationalityOption}
                placeholder={"Select Guardian Nationality"}
                // defaultSelect="usa"
                onSelectOption={(option) => {
                  // fetchStates(option.label);
                  // fetchCities(option.label);
                  setGuardianNationalityOption(option);
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
                selectedOption={relationshipOption}
                placeholder="Select Gender"
                onSelectOption={(option) => setRelationshipOption(option)}
              />
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
            <a href="#" className="btn btn-light-brand">
              <FiLayers size={16} className="me-2" />
              <span>Save as Draft</span>
            </a>
            <button type="submit" className="btn btn-primary">
              <FiUserPlus size={16} className="me-2" />
              <span>Create Client</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TabProfile;
