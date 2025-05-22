import * as Yup from "yup";

export const createSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Please enter a valid email address'),
  password: Yup.string().required('Password is required'),
});

export const clientSchema = Yup.object({
  fullName: Yup.string().min(3, 'Full Name must be at least 3 characters').required('Please enter the full name'),
  dateOfBirth: Yup.date().required('Date of Birth must be filled'),
  gender: Yup.string().required('Gender is required'),
  nationality: Yup.string().required('Please enter the child nationality'),
  problem: Yup.string().required('Please enter the problem'),
  className: Yup.string().min(3, 'Class name must be at least 3 characters long').required('Please enter the class name'),
  schoolId: Yup.number().required('School Name is required'),
  guardianName: Yup.string().min(3).required('Please enter the guardian name'),
  guardianPhone: Yup.string().required('Please enter the guardian phone number').matches(
    /^\+[1-9]\d{7,14}$/,
    "Phone number must start with country code and without any dashes or spaces"
  ),
  guardianEmail: Yup.string().email('Guardian Email must be a valid email format').required('Please enter the guardian email'),
  guardianRelationship: Yup.string().required('Guardian Relationship is required'),
  guardianNationality: Yup.string().required('Guardian Nationality is required'),
});