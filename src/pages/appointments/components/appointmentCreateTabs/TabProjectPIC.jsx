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
    if (formData.appointmentType === 'treatment') {
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
            <h2 className="fs-16 fw-bold">{formData.appointmentType === 'treatment' ? 'Therapist' : 'Psychologist'} In Charge</h2>
            <p className="text-muted">
              {formData.appointmentType === 'treatment' ? 'Therapist' : 'Psychologist'}  in charge in this appointment.
            </p>
          </div>

          {error.picId && (
            <label
              id="picName-error"
              className="error text-danger mb-2 d-flex align-items-center gap-1"
            >
              <FiAlertTriangle /> {error.picId}
            </label>
          )}

          <fieldset>
            <div className="col-lg-8">
              <label htmlFor="picName" className="form-label">
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
                id="picName"
                className={`form-control ${error && !formData.picId ? "is-invalid" : ""
                  }`}
                value={formData.picId}
                onChange={(e) => {
                  const selectedEmployeeId = parseInt(e.target.value) ?? null;
                  setFormData({ ...formData, picId: selectedEmployeeId }); // 👈 fix is here
                }}
                required
              >
                <option value="">-- Select PIC --</option>
                {formData.appointmentType === 'treatment' ? (
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
            </div>
          </fieldset>
        </fieldset>
      </form>
    </section>
  );
};

export default TabProjectPIC;
