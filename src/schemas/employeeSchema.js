import * as Yup from 'yup'

export const employeeSchema = Yup.object({
    fullName: Yup.string().required('Please enter the employee full name'),
    phoneNumber: Yup.string().required('Please enter the employee phone number'),
    email: Yup.string().email().required('Please enter the employee email'),
    roleId: Yup.number().required('Employee role is required'),
    isActive: Yup.boolean().required('Employee Status is required'),
})