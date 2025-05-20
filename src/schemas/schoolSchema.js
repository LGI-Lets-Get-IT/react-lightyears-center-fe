import * as Yup from "yup";

export const schoolSchema = Yup.object({
  schoolName: Yup.string().min(3, 'School name must be at least 3 characters long').required('Please enter the school name'),
  schoolAddress: Yup.string().min(3, 'School address must be at least 3 characters long').required('Please enter the school address'),
  schoolPhoneNumber: Yup.string().required('Please enter the school phone number').matches(
    /^\+[1-9]\d{7,14}$/,
    "Phone number must start with country code and without any dashes or spaces"
  ),
  schoolEmail: Yup.string().email('Please enter a valid email address').required('Please enter the school email address'),
  picName: Yup.string().min(3, 'PIC name must be at least 3 characters long').required('Please enter the PIC name'),
  picPhoneNumber: Yup.string().required('Please enter the PIC phone number').matches(
    /^\+[1-9]\d{7,14}$/,
    "Phone number must start with country code and without any dashes or spaces"
  ),
  picEmail: Yup.string().email('Please enter a valid email address').required('Please enter the PIC email address'),
})