// import React from "react";
import SelectDropdown from "@/components/shared/SelectDropdown";
import { fetchAllEmployees, fetchAllPsychologists, fetchAllTherapists } from "@/store/slice/employeeSlice";
import { useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const TabProjectPIC = ({ error, setError, formData, setFormData }) => {
  const dispatch = useDispatch()
  const { therapists, psychologists } = useSelector((state) => state.employees);


  useEffect(() => {
    if (formData.appointmentType.toLowerCase() === 'treatment') {
      dispatch(fetchAllTherapists())
    } else {
      dispatch(fetchAllPsychologists())
    }
  }, [formData.appointmentType])

  return (
    <section className="step-body mt-4 body current">
      <form id="project-details">
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">{formData.appointmentType.toLowerCase() === 'treatment' ? 'Therapist' : 'Psychologist'} In Charge</h2>
            <p className="text-muted">
              {formData.appointmentType.toLowerCase() === 'treatment' ? 'Therapist' : 'Psychologist'}  in charge in this appointment.
            </p>
          </div>
          <fieldset>
            <div className="col-lg-8">
              <label htmlFor="picId" className="form-label">
                PIC Name <span className="text-danger">*</span>
              </label>
              {/* <SelectDropdown
                className={`${error.picId ? "is-invalid" : ""}`}
                options={employees?.map((employee) => ({
                  label: employee.fullName,
                  value: employee.id,
                }))}
                placeholder={"Select PIC"}
                selectedOption={formData?.picId}
                onSelectOption={(option) => {
                  setFormData({ ...formData, picId: option.value });
                }}
              /> */}
              <select
                id="picId"
                className={`form-control ${error && !formData.picId ? "is-invalid" : ""
                  }`}
                value={formData.picId}
                onChange={(e) => {
                  const selectedEmployeeId = parseInt(e.target.value) ?? null;
                  console.log('SELECTEDEMPLOYEEID', selectedEmployeeId)
                  setFormData({ ...formData, picId: selectedEmployeeId }); // 👈 fix is here
                }}
                required
              >
                <option value="" disabled>-- Select PIC --</option>
                {formData.appointmentType.toLowerCase() === 'treatment' ? (
                  therapists.map((therapist) => (
                    <option key={therapist.id} value={therapist.id}>
                      {therapist.fullName}
                    </option>
                  ))) :
                  psychologists.map((psychologist) => (
                    <option key={psychologist.id} value={psychologist.id}>
                      {psychologist.fullName}
                    </option>
                  ))
                }
              </select>
              {error.picId && (
                <div className="mt-1 text-danger">{error.picId}</div>
              )}
            </div>
          </fieldset>
        </fieldset>
      </form>
    </section>
  );
};

export default TabProjectPIC;
