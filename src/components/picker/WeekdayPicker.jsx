import { useField } from "formik";
import Select from "react-select";

const weekdayOptions = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

const WeekdayPicker = ({ name, selected, onChange, disabled = false }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <>
      <Select
        isMulti
        isDisabled={disabled}
        options={weekdayOptions}
        value={selected}
        onChange={onChange}
        menuPlacement="auto"
      />
      {/* Show error if any */}
      {meta && meta?.error && (
        <div className="text-danger mt-1">{meta.error}</div>
      )}
    </>
  );
};

export default WeekdayPicker;
