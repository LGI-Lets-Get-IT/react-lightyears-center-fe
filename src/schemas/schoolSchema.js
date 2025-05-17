import * as Yup from "yup";

export const schoolSchema = Yup.object({
  schoolName: Yup.string().min(3, 'School name must be at least 3 characters long').required('Please enter the school name'),
  schoolAddress: Yup.string().min(3, 'School address must be at least 3 characters long').required('Please enter the school address'),
  schoolPhoneNumber: Yup.string().min(10, 'School phone number must be at least 10 digits long').required('Please enter the school phone number'),
  schoolEmail: Yup.string().email('Please enter a valid email address').required('Please enter the school email address'),
  picName: Yup.string().min(3, 'PIC name must be at least 3 characters long').required('Please enter the PIC name'),
  picPhoneNumber: Yup.string().min(10, 'PIC phone number must be at least 10 digits long').required('Please enter the PIC phone number'),
  picEmail: Yup.string().email('Please enter a valid email address').required('Please enter the PIC email address'),
})