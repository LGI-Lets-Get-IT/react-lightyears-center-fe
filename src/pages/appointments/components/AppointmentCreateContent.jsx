import { useEffect, useState } from "react";
import TabProjectType from "./appointmentCreateTabs/TabProjectType";
import TabProjectDetails from "./appointmentCreateTabs/TabProjectPIC";
import TabCompleted from "./appointmentCreateTabs/TabCompleted";
import TabDateTime from "./appointmentCreateTabs/TabDateTime";
import { makeAppointment } from "@/store/slice/appointmentSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { step0Schema, step1Schema, step2Schema } from "../../../schemas/appointmentSchema";
import { fetchAllEmployees } from "@/store/slice/employeeSlice";

const steps = [
  { name: "Type", required: true },
  { name: "PIC", required: true },
  { name: "Date & Time", required: true },
  { name: "Complete", required: false },
];

const AppointmentCreateContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState(false);
  const [formData, setFormData] = useState({
    client: null,
    title: null,
    appointmentType: "",
    picId: null,
    picType: null,
    appointmentDate: null,
    timeStart: null,
    timeEnd: null,
  });


  const handleInputChange = () => {
    try {
      if (currentStep === 0) {
        step0Schema.validate(formData, { abortEarly: false });
      } else if (currentStep === 1) {
        step1Schema.validate(formData, { abortEarly: false });
      } else if (currentStep === 2) {
        step2Schema.validate(formData, { abortEarly: false });
      }
    } catch (error) {
      const newError = {}
      error.inner.forEach((err) => {
        newError[err.path] = err.message
      })
      setErrors(newError)
    }
  }

  const handleNext = async (e) => {
    e.preventDefault();

    console.log('FORMDATA', formData)

    try {
      if (currentStep === 0) {
        await step0Schema.validate(formData, { abortEarly: false })
        setErrors(false)
      } else if (currentStep === 1) {
        await step1Schema.validate(formData, { abortEarly: false })
        setErrors(false)
      } else if (currentStep === 2) {
        await step2Schema.validate(formData, { abortEarly: false })
        setErrors(false)

        dispatch(makeAppointment(formData))
          .unwrap()
          .then(() => {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
            navigate('/appointments')
          })
          .catch((rejectedValueOrSerializedError) => {
            console.log('rejectedValueOrSerializedError', rejectedValueOrSerializedError)
          });
      }
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    } catch (error) {
      const newError = {}
      error.inner.forEach((err) => {
        newError[err.path] = err.message
      })

      setErrors(newError)
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
                  className={`${currentStep === index ? "current" : ""} ${currentStep === index && errors ? "error" : ""
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
                onInputChange={handleInputChange}
                error={errors}
                setError={setErrors}
              />
            )}
            {currentStep === 1 && (
              <TabProjectDetails
                setFormData={setFormData}
                formData={formData}
                onInputChange={handleInputChange}
                error={errors}
                setError={setErrors}
              />
            )}
            {currentStep === 2 && (
              <TabDateTime
                setFormData={setFormData}
                formData={formData}
                error={errors}
                setError={setErrors}
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
                className={`${currentStep === steps.length - 1 ? "disabled" : ""
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
