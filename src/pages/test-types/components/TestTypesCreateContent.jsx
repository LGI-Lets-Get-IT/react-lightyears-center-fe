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
import { createTestType } from "@/store/slice/testTypeSlice";

const TestTypesCreateContent = () => {
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

    dispatch(createTestType(inputs))
      .unwrap()
      .then(() => navigate("/settings/test-types"))
      .catch((error) => "handle error");
  };
  return (
    <div className="col-lg-12">
      <div className="card border-top-0">
        <form onSubmit={handleSubmit}>
          <div className="card-body personal-info">
            <div className="mb-4 d-flex align-items-center justify-content-between">
              <h5 className="fw-bold mb-0 me-4">
                <span className="d-block mb-2">Test Type Information:</span>
                <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                  Lorem ipsum dolor sit amet
                </span>
              </h5>
            </div>
            <Input
              icon="lu-school"
              label={"Test Name"}
              labelId={"testNameInput"}
              placeholder={"Test Name"}
              name={"testName"}
              onChange={handleChange}
              value={inputs.testName || ""}
            />
            <TextArea
              label={"Test Description"}
              icon="feather-map-pin"
              placeholder={"Test Description"}
              labelId={"testDescription"}
              onChange={handleChange}
              name={"testDescription"}
            />
          </div>
          <hr className="my-0" />
        <div className="card-body additional-info">
          <div className="d-flex justify-content-end align-items-center gap-2 page-header-right-items-wrapper">
              <a href="#" className="btn btn-light-brand">
                <FiX size={16} className="me-2" />
                <span>Cancel</span>
              </a>
              <button type="submit" className="btn btn-primary">
                <FiCheck size={16} className="me-2" />
                <span>Create Test</span>
              </button>
            </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default TestTypesCreateContent;
