import React, { useEffect } from "react";
import getIcon from "@/utils/getIcon";
import { FiAlertTriangle } from "react-icons/fi";
import { fetchAllClients } from "@/store/slice/clientSlice";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "@/components/shared/Dropdown";

const TabProjectType = ({ setFormData, formData, error, setError }) => {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.clients);
  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, title: value });
  };

  useEffect(() => {
    dispatch(fetchAllClients());
  }, [dispatch]);

  return (
    <section className="step-body mt-4 body current">
      <form id="project-type">
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">Appointment Detail</h2>
            <p className="text-muted">Detail for the appointment</p>
          </div>
          <div className="mb-4">
            {error.title && (
              <label id="project-type-error" className="error">
                <FiAlertTriangle /> {error.title}
              </label>
            )}
            <label htmlFor="title" className="form-label">
              Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${error.title ? "is-invalid" : ""}`}
              id="title"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            {error.client && (
              <label id="project-type-error" className="error">
                <FiAlertTriangle /> {error.client}
              </label>
            )}
            <label htmlFor="client" className="form-label">
              Client <span className="text-danger">*</span>
            </label>
            <select
              id="client"
              className={`form-control ${
                error.client ? "is-invalid" : ""
              }`}
              value={formData.client?.id || ""}
              onChange={(e) => {
                const selectedId = parseInt(e.target.value);
                const selectedClient = clients.find((c) => c.id === selectedId);
                setFormData({ ...formData, client: selectedClient }); // 👈 fix is here
              }}
              required
            >
              <option value="">-- Select Client --</option>
              {clients?.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.fullName}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <hr className="mb-5" />
        <fieldset>
          <div className="mb-5">
            <h2 className="fs-16 fw-bold">Appointment Type</h2>
            <p className="text-muted">Select the type of this appointment</p>
            {error.appointmentType && (
              <label id="project-type-error" className="error">
                <FiAlertTriangle /> Appointment type is required.
              </label>
            )}
          </div>
          <fieldset>
            <ProjectTypeCard
              icon={"feather-user"}
              title={"Assessment"}
              description={"Assessment appointment for the patient"}
              id={"assessment"}
              name={"appointmentType"}
              setFormData={setFormData}
              formData={formData}
              setError={setError}
            />
            <ProjectTypeCard
              icon={"feather-users"}
              title={"Consultation"}
              description={"Consultation appointment for the patient"}
              id={"consultation"}
              name={"appointmentType"}
              setFormData={setFormData}
              formData={formData}
              setError={setError}
            />
            <ProjectTypeCard
              icon={"feather-users"}
              title={"Treatment"}
              description={"Treatment appointment for the patient"}
              id={"treatment"}
              name={"appointmentType"}
              setFormData={setFormData}
              formData={formData}
              setError={setError}
            />
          </fieldset>
        </fieldset>
      </form>
    </section>
  );
};

export default TabProjectType;

export const ProjectTypeCard = ({
  icon,
  title,
  description,
  id,
  name,
  setFormData,
  formData,
  setError,
}) => {
  const { appointmentType } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      appointmentType: e.target.value,
    });
    setError(false); // clear error if any
  };

  return (
    <label className="w-100" htmlFor={id}>
      <input
        className="card-input-element"
        type="radio"
        name={name}
        id={id}
        value={id}
        onChange={handleChange}
        checked={appointmentType === id}
      />
      <span className="card card-body d-flex flex-row justify-content-between align-items-center">
        <span className="hstack gap-3">
          <span className="avatar-text">
            {React.cloneElement(getIcon(icon), {
              size: "16",
              strokeWidth: "1.6",
            })}
          </span>
          <span>
            <span className="d-block fs-13 fw-bold text-dark">{title}</span>
            <span
              className="d-block text-muted mb-0"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </span>
        </span>
      </span>
    </label>
  );
};
