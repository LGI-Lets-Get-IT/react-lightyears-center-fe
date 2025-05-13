import * as Yup from 'yup'

export const employeeSchema = Yup.object({
    fullName: Yup.string().required(),
    phoneNumber: Yup.string().required(),
    email: Yup.string().email().required(),
    roleId: Yup.number().required(),
    isActive: Yup.boolean().required(),
})