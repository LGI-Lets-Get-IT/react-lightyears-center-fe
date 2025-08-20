import { addHours, addMinutes, isAfter, isEqual, startOfDay } from "date-fns";
import * as Yup from "yup";

// export const step0Schema = Yup.object({
//   title: Yup.string().required("Title is required").min(3, "Title is too short"),
//   clientId: Yup.number().required("Client Name is required"),
//   appointmentType: Yup.string().required("Appointment type is required"),
// });

// export const step1Schema = Yup.object({
//   picId: Yup.number().typeError('PIC is required').required("PIC is required"),
//   picType: Yup.string().required('PIC Type is required')
// });

// export const step2Schema = Yup.object({
//   // appointmentDate: Yup.date().required("Appointment date is required"),
//   // timeStart: Yup.string().required("Start time is required"),
//   // timeEnd: Yup.string().required('End time is required').min(Yup.ref('timeStart'), 'End time must be after start time'),
//   appointmentDate: Yup.date().required("Appointment date is required").test(
//     'date-not-in-past',
//     'Appointment date must be today or later',
//     function (value) {
//       if (!value) return true;
//       const today = startOfDay(new Date());
//       const selected = startOfDay(new Date(value));
//       return selected >= today;
//     }
//   ),
//   // timeStart: Yup.date().required("Start time is required").test(
//   //   'start-at-least-6-hours-from-now',
//   //   'Appointment must be made at least 6 hours in advance',
//   //   function (value) {
//   //     if (!value) return true;
//   //     const now = new Date();
//   //     const minStart = addHours(now, 6);
//   //     console.log('MINSTART', minStart)
//   //     return isAfter(new Date(value), minStart) || isEqual(new Date(value), minStart);
//   //   }
//   // ),
//   // timeEnd: Yup.date().required("End time is required").test(
//   //   'min-30-min-after-start',
//   //   'The minimum session duration is 30 minutes.',
//   //   function (value) {
//   //     const { timeStart } = this.parent;
//   //     if (!value || !timeStart) return true; // Skip validation if either is missing

//   //     const minEndTime = addMinutes(new Date(timeStart), 30);
//   //     return isAfter(new Date(value), minEndTime) || isEqual(new Date(value), minEndTime);
//   //   }
//   // ),
// });

export const appointmentSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title is too short"),
  clientId: Yup.number().required("Client name is required"),
  appointmentType: Yup.string().required("Appointment type is required"),
  // picId: Yup.number().typeError("PIC is required").required("PIC is required"),
  // timeStart: Yup.string().required("Start time is required"),
  // timeEnd: Yup.string().required('End time is required').min(Yup.ref('timeStart'), 'End time must be after start time'),
  // timeEnd: Yup.string()
  //   .required("End time is required")
  //   .test(
  //     "is-after-start",
  //     "End time must be after start time",
  //     function (value) {
  //       const { timeStart } = this.parent;
  //       if (!timeStart || !value) return true; // skip validation if either is not filled
  //       return value > timeStart; // assumes format is 'HH:mm'
  //     }
  //   ),
  picId: Yup.number().when(
    ["appointmentType", "appointmentDate", "timeStart", "timeEnd"],
    ([type, date, start, end], schema) => {
      const allFilled = type && date && start && end;
      return allFilled
        ? schema.typeError("PIC is required").required("PIC is required")
        : schema.required(
            "Please complete appointment details before selecting a PIC"
          );
    }
  ),
  roomId: Yup.number().required("Room name is required"),
  timeStart: Yup.string().when("appointmentType", {
    is: (appointmentType) => appointmentType && appointmentType.length > 0,
    then: (schema) => schema.required("Start time is required"),
    otherwise: (schema) =>
      schema.required(
        "Please select an appointment type before choosing a start time"
      ),
  }),
  timeEnd: Yup.string().when("appointmentType", {
    is: (appointmentType) => appointmentType && appointmentType.length > 0,
    then: (schema) =>
      schema
        .required("End time is required")
        .test(
          "is-after-start",
          "End time must be after start time",
          function (value) {
            const { timeStart } = this.parent;
            if (!timeStart || !value) return true; // skip validation if either is not filled
            return value > timeStart; // assumes format is 'HH:mm'
          }
        ),
    otherwise: (schema) =>
      schema.required(
        "Please select an appointment type before choosing an end time"
      ),
  }),
  appointmentDate: Yup.string().when("appointmentType", {
    is: (appointmentType) => appointmentType && appointmentType.length > 0,
    then: (schema) =>
      schema
        .required("Appointment date is required")
        .test(
          "date-not-in-past",
          "Appointment date must be today or later",
          function (value) {
            if (!value) return true;
            const today = startOfDay(new Date());
            const selected = startOfDay(new Date(value));
            return selected >= today;
          }
        ),
    otherwise: (schema) =>
      schema.required(
        "Please select an appointment type before choosing a date"
      ),
  }),
  treatmentId: Yup.string().when("appointmentType", {
    is: (appointmentType) => appointmentType?.toLowerCase() === "treatment",
    then: (schema) => schema.required("Please select the treatment"),
    otherwise: (schema) => schema.notRequired(),
  }),
  numberOfRepetition: Yup.string().when("appointmentType", {
    is: (appointmentType) => appointmentType?.toLowerCase() === "treatment",
    then: (schema) =>
      schema.required("Please specify the number of appointment repetitions"),
    otherwise: (schema) => schema.notRequired(),
  }),
  intervalBetweenAppointment: Yup.string().when("appointmentType", {
    is: (appointmentType) => appointmentType?.toLowerCase() === "treatment",
    then: (schema) =>
      schema.required("Please specify the internal between appointment"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // timeStart: Yup.string().required("Start time is required").test(
  //   'start-at-least-6-hours-from-now',
  //   'Appointment must be made at least 6 hours in advance',
  //   function (value) {
  //     if (!value) return true;
  //     const now = new Date();
  //     const minStart = addHours(now, 6);
  //     console.log('MINSTART', minStart)
  //     return isAfter(new Date(value), minStart) || isEqual(new Date(value), minStart);
  //   }
  // ),
  // timeEnd: Yup.date().required("End time is required").test(
  //   'min-30-min-after-start',
  //   'The minimum session duration is 30 minutes.',
  //   function (value) {
  //     const { timeStart } = this.parent;
  //     if (!value || !timeStart) return true; // Skip validation if either is missing

  //     const minEndTime = addMinutes(new Date(timeStart), 30);
  //     return isAfter(new Date(value), minEndTime) || isEqual(new Date(value), minEndTime);
  //   }
  // ),
});
