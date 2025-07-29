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

const WeekdayPicker = ({ selected, onChange }) => (
  <Select
    isMulti
    options={weekdayOptions}
    value={selected}
    onChange={onChange}
  />
);

export default WeekdayPicker;
