import React from "react";
import getIcon from "@/utils/getIcon";

const Input = ({
  label,
  icon,
  type = "text",
  placeholder,
  labelId,
  name,
  className,
  onChange,
  value,
  meta,
  isMandatory = false,
}) => {
  return (
    <div className="row mb-4 align-items-center">
      <div className="col-lg-4">
        <label htmlFor={labelId} className="fw-semibold">
          {label} {isMandatory && <span className="text-danger">*</span>}
        </label>
      </div>
      <div className="col-lg-8">
        <div className="input-group">
          {icon && <div className="input-group-text">{getIcon(icon)}</div>}
          <input
            type={type}
            name={name}
            onChange={onChange}
            className={`form-control ${meta.error ? "is-invalid" : ""}`}
            id={labelId}
            placeholder={placeholder}
            value={value}
          />
        </div>
        {meta && meta.error && (
          <div className="mt-1 text-danger">{meta.error}</div>
        )}
      </div>
    </div>
  );
};

export default Input;
