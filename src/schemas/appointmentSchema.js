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
  title: Yup.string().required("Title is required").min(3, "Title is too short"),
  clientId: Yup.number().required("Client Name is required"),
  appointmentType: Yup.string().required("Appointment type is required"),
  picId: Yup.number().typeError('PIC is required').required("PIC is required"),
  // timeStart: Yup.date().required("Start time is required"),
  // timeEnd: Yup.date().required('End time is required').min(Yup.ref('timeStart'), 'End time must be after start time'),
  roomId: Yup.number().required('Room Name is required'),
  appointmentDate: Yup.string().required("Appointment date is required").test(
    'date-not-in-past',
    'Appointment date must be today or later',
    function (value) {
      if (!value) return true;
      const today = startOfDay(new Date());
      const selected = startOfDay(new Date(value));
      return selected >= today;
    }
  ),
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
})