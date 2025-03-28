import { useState } from "react";
import TabProjectType from "./appointmentCreateTabs/TabProjectType";
import TabProjectDetails from "./appointmentCreateTabs/TabProjectPIC";
import TabCompleted from "./appointmentCreateTabs/TabCompleted";
import TabDateTime from "./appointmentCreateTabs/TabDateTime";
import { makeAppointment } from "@/store/slice/appointmentSlice";
import { useDispatch } from "react-redux";

const steps = [
  { name: "Type", required: true },
  { name: "PIC", required: true },
  { name: "Date & Time", required: true },
  { name: "Complete", required: false },
];

const AppointmentCreateContent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    client: "",
    title: "",
    appointmentType: "",
    psychologistName: "",
    psychologistId: 1,
    appointmentDate: "",
  });

  const validateFields = () => {
    if (!steps[currentStep].required) return true;

    switch (currentStep) {
      case 0:
        if (
          !formData.appointmentType.trim() ||
          formData.title.trim() === "" ||
          !formData.client
        ) {
          setError(true);
          return false;
        }
        break;
      case 1:
        if (!formData.psychologistName.trim()) {
          setError(true);
          return false;
        }
        break;
      case 2:
        if (
          !formData.appointmentDate.trim() ||
          !formData.timeStart.trim() ||
          !formData.timeEnd.trim()
        ) {
          setError(true);
          return false;
        }
        break;
      default:
        break;
    }

    setError(false);
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateFields()) {
      // If on step 2 (before final step), submit the form
      if (currentStep === 2) {
        const payload = {
          title: formData.title,
          psychologistId: formData.psychologistId,
          client: formData.client?.id, // send clientId
          timeStart: formData.timeStart,
          timeEnd: formData.timeEnd,
          appointmentType: formData.appointmentType,
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
        };
        dispatch(makeAppointment(payload));
      }

      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleTabClick = (e, index) => {
    e.preventDefault();
    if (index < currentStep) {
      setCurrentStep(index); // allow backward
    } else if (validateFields()) {
      setCurrentStep(index); // allow forward if valid
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card border-top-0">
        <div className="card-body p-0 wizard" id="project-create-steps">
          <div className="steps clearfix">
            <ul role="tablist">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={`${currentStep === index ? "current" : ""} ${
                    currentStep === index && error ? "error" : ""
                  }`}
                  onClick={(e) => handleTabClick(e, index)}
                >
                  <a href="#" className="d-block fw-bold">
                    {step.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="content clearfix">
            {currentStep === 0 && (
              <TabProjectType
                setFormData={setFormData}
                formData={formData}
                error={error}
                setError={setError}
              />
            )}
            {currentStep === 1 && (
              <TabProjectDetails
                setFormData={setFormData}
                formData={formData}
                error={error}
                setError={setError}
              />
            )}
            {currentStep === 2 && (
              <TabDateTime
                setFormData={setFormData}
                formData={formData}
                error={error}
                setError={setError}
              />
            )}
            {currentStep === 3 && <TabCompleted />}
          </div>

          {/* Buttons */}
          <div className="actions clearfix">
            <ul>
              <li
                className={`${currentStep === 0 ? "disabled" : ""}`}
                onClick={(e) => handlePrev(e)}
              >
                <a href="#">Previous</a>
              </li>
              <li
                className={`${
                  currentStep === steps.length - 1 ? "disabled" : ""
                }`}
                onClick={(e) => handleNext(e)}
              >
                <a href="#">{currentStep === 2 ? "Submit" : "Next"}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCreateContent;
