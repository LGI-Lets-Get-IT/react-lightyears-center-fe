import * as Yup from 'yup'

export const employeeSchema = Yup.object({
    fullName: Yup.string().required('Please enter the employee full name'),
    phoneNumber: Yup.string().required('Please enter the employee phone number')
    .matches(
        /^\+[1-9]\d{7,14}$/,
        "Phone number must start with country code (with +) and without any dashes or spaces"
    ),
    email: Yup.string().email().required('Please enter the employee email'),
    roleId: Yup.number().required('Employee role is required'),
    isActive: Yup.boolean().required('Employee Status is required'),
})