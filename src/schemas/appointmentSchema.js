import { addHours, addMinutes, format, isAfter, isToday, startOfDay } from "date-fns";
import * as Yup from "yup";

export const step0Schema = Yup.object({
  title: Yup.string().required("Title is required").min(3, "Title is too short"),
  client: Yup.number().required("Client is required"),
  appointmentType: Yup.string().required("Appointment type is required"),
});

export const step1Schema = Yup.object({
  picId: Yup.number().typeError('PIC is required').required("PIC is required"),
});

export const step2Schema = Yup.object({
  appointmentDate: Yup.date().required("Appointment date is required").test(
    'date-not-in-past',
    'Appointment date must be today or later',
    function (value) {
      if (!value) return true;
      const today = startOfDay(new Date());
      const selected = startOfDay(new Date(value));
      return selected >= today;
    }
  ),
  timeStart: Yup.date().required("Start time is required").test(
    'start-at-least-6-hours-from-now',
    'Appointment must be made at least 6 hours in advance',
    function (value) {
      if (!value) return true;
      const now = new Date();
      const minStart = addHours(now, 6);
      return isAfter(new Date(value), minStart);
    }
  ),
  timeEnd: Yup.date().required("End time is required").test(
    'min-30-min-after-start',
    'The minimum session duration is 30 minutes.',
    function (value) {
      const { timeStart } = this.parent;
      if (!value || !timeStart) return true; // Skip validation if either is missing

      const minEndTime = addMinutes(new Date(timeStart), 30);
      return isAfter(new Date(value), minEndTime);
    }
  ),
});