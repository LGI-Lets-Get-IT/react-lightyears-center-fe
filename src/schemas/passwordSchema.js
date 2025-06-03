import * as Yup from "yup";

export const changePwdAdminSchema = Yup.object({
    password: Yup.string().min(8, 'Password must be at least 8 characters long'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Please enter the password confirmation')
})

export const changePwdUserSchema = Yup.object({
    oldPassword: Yup.string().required('Please enter your current password'),
    newPassword: Yup.string().min(8, 'Password must be at least 8 characters long').required('Please enter your new password'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Password must match').required('Please enter the password confirmation')
})