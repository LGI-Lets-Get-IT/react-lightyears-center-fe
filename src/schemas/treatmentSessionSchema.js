import * as Yup from "yup";

export const treatmentSessionSchema = Yup.object().shape({
  planId: Yup.number()
    .required("Plan ID is required"),
  appointmentId: Yup.number()
    .required("Linked Appointment is required"),
  programId: Yup.number()
    .required("Treatment Name is required"),
  clientId: Yup.number()
    .required('Client Name is required'),
  sessions: Yup.array().of(
    Yup.object().shape({
      shortTermGoals: Yup.string().required("Short Term Goal is required"),
      activity: Yup.string().required("Activity is required"),
      progress: Yup.string().required("Progress is required"),
    })
  ),
});