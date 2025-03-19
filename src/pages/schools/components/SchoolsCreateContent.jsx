import React, { useEffect, useState } from "react";
import TabProfile from "../../../components/customersCreate/TabProfile";
import TabPassword from "../../../components/customersCreate/TabPassword";
import TabBilling from "../../../components/customersCreate/TabBilling";
import TabNotificationsContent from "../../../components/customersView/TabNotificationsContent";
import TabConnections from "../../../components/customersView/TabConnections";
import TabBillingContent from "../../../components/customersView/TabBillingContent";
import Input from "@/components/shared/Input";
import TextArea from "@/components/shared/TextArea";
import { FiCalendar, FiCheck, FiLayers, FiUserPlus, FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";
import useDatePicker from "@/hooks/useDatePicker";
import useLocationData from "@/hooks/useLocationData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { genderOptions, relationshipOptions } from "@/utils/options";
import { createSchool, fetchAllSchools } from "@/store/slice/schoolSlice";
import SelectDropdown from "@/components/shared/SelectDropdown";

const SchoolsCreateContent = () => {
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
    console.log("INPUTS", inputs);

    dispatch(createSchool(inputs))
      .unwrap()
      .then(() => navigate("/schools"))
      .catch((error) => "handle error");
  };
  return (
    <div className="col-lg-12">
      <div className="card border-top-0">
        <form onSubmit={handleSubmit}>
          <div className="card-body personal-info">
            <div className="mb-4 d-flex align-items-center justify-content-between">
              <h5 className="fw-bold mb-0 me-4">
                <span className="d-block mb-2">School Information:</span>
                <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                  Following information is publicly displayed, be careful!{" "}
                </span>
              </h5>
            </div>
            <Input
              icon="lu-school"
              label={"School Name"}
              labelId={"schoolNameInput"}
              placeholder={"School Name"}
              name={"schoolName"}
              onChange={handleChange}
              value={inputs.schoolName || ""}
            />
            <TextArea
              label={"School Address"}
              icon="feather-map-pin"
              placeholder={"School Address"}
              labelId={"schoolAddress"}
              onChange={handleChange}
              name={"schoolAddress"}
            />
            <Input
              icon="feather-phone"
              label={"School Phone Number"}
              labelId={"phoneNumberInput"}
              placeholder={"School Phone Number"}
              name={"schoolPhoneNumber"}
              onChange={handleChange}
              value={inputs.schoolPhoneNumber || ""}
            />
            <Input
              icon="feather-mail"
              label={"School Email"}
              labelId={"emailInput"}
              placeholder={"School Email"}
              name={"schoolEmail"}
              type={"email"}
              onChange={handleChange}
              value={inputs.schoolEmail || ""}
            />
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
          <Input
            icon="feather-user"
            label={"PIC Full Name"}
            labelId={"picFullNameInput"}
            placeholder={"PIC Full Name"}
            name={"picName"}
            onChange={handleChange}
            value={inputs.picName || ""}
          />
          <Input
            icon="feather-phone"
            label={"PIC Phone Number"}
            labelId={"picPhoneInput"}
            placeholder={"PIC Phone Number"}
            name={"picPhoneNumber"}
            onChange={handleChange}
            value={inputs.picPhoneNumber || ""}
          />
          <Input
            icon="feather-mail"
            label={"PIC Email"}
            labelId={"picEmailInput"}
            placeholder={"PIC Email"}
            name={"picEmail"}
            type={"email"}
            onChange={handleChange}
            value={inputs.picEmail || ""}
          />
        
          <div className="d-flex justify-content-end align-items-center gap-2 page-header-right-items-wrapper">
              <a href="#" className="btn btn-light-brand">
                <FiX size={16} className="me-2" />
                <span>Cancel</span>
              </a>
              <button type="submit" className="btn btn-primary">
                <FiCheck size={16} className="me-2" />
                <span>Create School</span>
              </button>
            </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolsCreateContent;
