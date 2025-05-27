import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().required('Please enter the email address').email('Please enter a valid email address'),
  password: Yup.string().required('Please enter the password'),
});