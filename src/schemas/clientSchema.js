import * as Yup from "yup";

export const createSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Please enter a valid email address'),
  password: Yup.string().required('Password is required'),
});

export const clientSchema = Yup.object({
  password: Yup.string().min(8, 'Password must be at least 8 characters long'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Please enter the password confirmation'),
  fullName: Yup.string().min(3, 'Full Name must be at least 3 characters').required('Please enter the full name'),
  dateOfBirth: Yup.date().required('Date of Birth must be filled'),
  gender: Yup.string().required('Gender is required'),
  nationality: Yup.string().required('Please enter the child nationality'),
  problem: Yup.string().required('Please enter the problem'),
  className: Yup.string().min(3, 'Class name must be at least 3 characters long').required('Please enter the class name'),
  schoolId: Yup.number().required('School Name is required'),
  guardianName: Yup.string().min(3).required('Please enter the guardian name'),
  guardianPhone: Yup.string().required('Please enter the guardian phone number')
  .matches(
    /^\+[1-9]\d{7,14}$/,
    "Phone number must start with country code (with +) and without any dashes or spaces"
  ),
  guardianEmail: Yup.string().email('Guardian Email must be a valid email format').required('Please enter the guardian email'),
  guardianRelationship: Yup.string().required('Guardian Relationship is required'),
  guardianNationality: Yup.string().required('Guardian Nationality is required'),
  // intakeForm: Yup.object().shape({
  //   placeOfBirth: Yup.string().required("Please enter the child's place of birth"),
  //   religion: Yup.string().required("Please ehter the child's religion"),
  //   homeAddress: Yup.string().required("Please enter the child's home address"),
  //   previousOngoingActivity: Yup.string().required("Please enter the child's previous ongoing activity"),
  //   majorReasonConcerns: Yup.string().required("Please enter the major reasons or concerns"),
  //   previousPsychologicalDetails: Yup.string().required("Please enter previous psychological details"),
  //   socialAbilities: Yup.string().required("Please explain how the child gets along with others"),
  //   relationshipAbilities: Yup.string().required("Please explain the child's supportive relationships"),
  //   healthAbilities: Yup.string().required("Please explain the child's eating and activity habits"),
  //   mathAbilities: Yup.string().required("Please indicate if the child can solve simple math problems"),
  //   programsExpectations: Yup.string().required("Please enter your expectations for the developmental program"),
  //   howHeardAboutUs: Yup.string().required("Please enter where you heard about us"),
  //   childBirthOrder: Yup.string().required("Please enter the child's birth order"),
  //   institutions: Yup.array().of(
  //     Yup.object().shape({
  //       institutionName: Yup.string().required('Please enter the institution name'),
  //       age: Yup.number().required('Please enter the age instituon taken'),
  //       activity: Yup.string().required('Please enter the activity'),
  //       duration: Yup.string().required('Please enter the duration of the activity'),
  //     })
  //   ),
  //   guardians: Yup.array().of(
  //     Yup.object().shape({
  //       guardianName: Yup.string().required('Please enter the guardian name'),
  //       relationship: Yup.string().required('Please enter the guardian relationship to child'),
  //       placeOfBirth: Yup.string().required('Please enter the guardian place of birth'),
  //       dateOfBirth: Yup.date().required('Please enter the guardian date of birth'),
  //       gender: Yup.string().required('Please enter the guardian gender'),
  //       education: Yup.string().required('Please enter the guardian education'),
  //       job: Yup.string().required('Please enter the guardian job'),
  //     })
  //   ),
  // })
});