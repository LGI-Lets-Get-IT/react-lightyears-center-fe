import * as Yup from "yup";

export const changePwdAdminSchema = Yup.object({
    password: Yup.string().min(8, 'Password must be at least 8 characters long'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Please enter the password confirmation')
})