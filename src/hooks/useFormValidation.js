import React, { useState } from 'react'

const useFormValidation = (schema, initialValues = {}, onSubmit) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState(false)

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        const updatedValues = {
            ...values,
            [name]: value,
        }

        setValues(updatedValues)

        try {
            await schema.validateAt(name, updatedValues)
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        } catch (error) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: error.message,
            }));
        }
    };

    const handleSubmit  = async (e) => {
        e.preventDefault();

        try {
            await schema.validate(values, { abortEarly: false })
            setErrors({}) // clear previous errors
            if (onSubmit) await onSubmit(values) // your callback (e.g. dispatch logic)
        } catch (error) {
            const newError = {}
            error.inner.forEach(err => {
              newError[err.path] = err.message
            })
            setErrors(newError)
        }
    }

    return {
        values,
        errors,
        handleInputChange,
        setValues,
        setErrors,
        handleSubmit,
    }
}

export default useFormValidation;