import * as Yup from "yup";

export const treatmentPlanSchema = Yup.object().shape({
  clientId: Yup.number()
    .required("Client Name is required")
    .typeError("Client ID must be a number"),
  psychologistId: Yup.number()
    .required("Psychologist Name is required")
    .typeError("Psychologist ID must be a number"),
  consultDate: Yup.date().required("Consultation Date must be filled"),
  presentProblem: Yup.string()
    .required("Present problem must be filled")
    .min(3, "Present problem is too short"),
  parentPlan: Yup.string()
    .required("Parent collaboration plan must be filled")
    .min(3, "Parent collaboration plan is too short"),
  programs: Yup.array().of(
    Yup.object().shape({
      therapistId: Yup.number().required("Therapist Name is required"),
      treatmentId: Yup.number().required("Treatment Name is required"),
      aimOfTreatment: Yup.string().required("Aim of Treatment must be filled"),
      sessionFrequency: Yup.number().required("Session Frequency is required"),
      sessionDuration: Yup.number().required("Session Duration is required"),
    })
  ),
  behaviorTargets: Yup.array().of(
    Yup.object().shape({
      behavior: Yup.string().required(),
      currentAbility: Yup.string().required(),
      shortTermTarget: Yup.string().required(),
      mediaTools: Yup.string().required(),
    })
  ),
});
