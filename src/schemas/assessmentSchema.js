import * as Yup from "yup";

export const createAssessmentSchema = Yup.object().shape({
  clientId: Yup.number()
    .required("Client Name is required")
    .typeError("Client ID must be a number"),
  psychologistId: Yup.number()
    .required("Psychologist Name is required")
    .typeError("Psychologist ID must be a number"),
  appointmentId: Yup.number().required("Appointment Name is required"),
  testId: Yup.number().required('Test Name is required'),
  result: Yup.string()
    .required("Present problem must be filled")
    .min(3, "Present problem is too short"),
});
