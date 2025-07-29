import * as Yup from "yup";

export const testTypeSchema = Yup.object({
  testName: Yup.string()
    .min(3, "Test Name must be at least 3 characters long")
    .required("Please enter the test name"),
  // testDescription: Yup.string().min(3, 'Test Description must be at least 3 characters long').required('Please enter the test description'),
  testDescription: Yup.string()
    .min(3, "Test Description must be at least 3 characters long")
    .optional(),
});
