import * as Yup from "yup";

export const createSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Please enter a valid email address'),
  password: Yup.string().required('Password is required'),
});

export const createClientSchema = Yup.object({
  schoolId: Yup.number().required('School Name is required'),
  fullName: Yup.string().min(3, 'Full Name must be at least 3 characters').required('Full Name must be filled'),
  nationality: Yup.string().required('Child Nationality is required'),
  dateOfBirth: Yup.date().required('Date of Birth must be filled'),
  gender: Yup.string().required('Gender is required'),
  guardianName: Yup.string().min(3).required('Guardian Name must be filled'),
  guardianPhone: Yup.string().required('Guardian Phone Number must be filled'),
  guardianEmail: Yup.string().email('Guardian Email must be a valid email format').required('Guardian Email is required'),
  guardianRelationship: Yup.string().required('Guardian Relationship is required'),
  guardianNationality: Yup.string().required('Guardian Nationality is required'),
})