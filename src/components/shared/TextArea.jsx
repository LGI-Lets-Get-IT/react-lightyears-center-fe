import React from "react";
import getIcon from "@/utils/getIcon";

const TextArea = ({
  label,
  icon,
  placeholder,
  labelId,
  row = "3",
  onChange,
  name,
  meta,
  value,
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
          <textarea
            className={`form-control ${meta.error ? "is-invalid" : ""}`}
            id={labelId}
            cols="30"
            rows={row}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          ></textarea>
        </div>
        {meta && meta.error && (
          <div className="mt-1 text-danger">{meta.error}</div>
        )}
      </div>
    </div>
  );
};

export default TextArea;
