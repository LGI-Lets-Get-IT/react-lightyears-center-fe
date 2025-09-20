import * as Yup from "yup";

export const assessmentSchema = Yup.object().shape({
  clientId: Yup.number()
    .required("Client Name is required")
    .typeError("Client ID must be a number"),
  psychologistId: Yup.number()
    .required("Psychologist Name is required")
    .typeError("Psychologist ID must be a number"),
  isInCenterAssessment: Yup.boolean(),
  appointmentId: Yup.number()
    .nullable()
    .when("isInCenterAssessment", {
      is: false,
      then: (schema) =>
        schema.required(
          "Appointment is required for appointment-based assessments"
        ),
      otherwise: (schema) => schema.nullable(),
    }),
  assessmentDate: Yup.date()
    .required("Assessment Date is required")
    .typeError("Please select a valid assessment date"),
  testId: Yup.number().required("Test Name is required"),
  result: Yup.string()
    .required("Please enter the test result")
    .min(3, "Test result must be at least 3 characters"),
});
