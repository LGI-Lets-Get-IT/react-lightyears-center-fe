import * as Yup from 'yup'

export const testTypeSchema = Yup.object({
    testName: Yup.string().min(3, 'Test Name must be at least 3 characters long').required('Test Name must be filled'),
    testDescription: Yup.string().min(3, 'Test Description must be at least 3 characters long').required('Test Name must be filled'),
})