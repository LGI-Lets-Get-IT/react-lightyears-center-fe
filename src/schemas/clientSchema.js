import * as Yup from "yup";

export const createSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Please enter a valid email address'),
  password: Yup.string().required('Password is required'),
});