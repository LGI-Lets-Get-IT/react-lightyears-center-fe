import * as Yup from "yup";

export const treatmentSessionSchema = Yup.object().shape({
  planId: Yup.number()
    .required("Plan ID is required")
    .typeError("Plan ID must be a number"),
  programId: Yup.number()
    .required("Program ID is required")
    .typeError("Program ID must be a number"),
  clientId: Yup.number()
    .required('Client ID is required')
    .typeError('Client ID must be a number'),
  sessions: Yup.array().of(
    Yup.object().shape({
      shortTermGoals: Yup.string().required("Short Term Goal is required"),
      activity: Yup.string().required("Activity is required"),
      progress: Yup.string().required("Progress is required"),
    })
  ),
});