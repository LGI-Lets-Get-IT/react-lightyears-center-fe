import * as Yup from 'yup'

export const treatmentTypeSchema = Yup.object({
    treatmentName: Yup.string().min(3, 'Treatment Name must be at least 3 characters long').required('Treatment Name must be filled'),
    treatmentDescription: Yup.string().min(3, 'Treatment Description must be at least 3 characters long').required('Test Description must be filled'),
})