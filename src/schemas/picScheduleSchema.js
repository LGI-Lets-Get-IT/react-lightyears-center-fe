import * as Yup from "yup";

export const picScheduleSchema = Yup.object({
  employeeId: Yup.number().required("Employee ID is required"),
  schedules: Yup.array().of(
    Yup.object().shape({
      availableDays: Yup.array()
        .min(1, "Please select at least one available day")
        .required("Available days is required"),
      availableStartTime: Yup.string().required(
        "Availables start time is required"
      ),
      availableEndTime: Yup.string()
        .required("Available End time is required")
        .test(
          "is-after-start",
          "Available end time must be after available start time",
          function (value) {
            const { timeStart } = this.parent;
            if (!timeStart || !value) return true; // skip validation if either is not filled
            return value > timeStart; // assumes format is 'HH:mm'
          }
        ),
    })
  ),
});
