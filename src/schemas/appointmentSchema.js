import { addHours, addMinutes, isAfter, isEqual, startOfDay } from "date-fns";
import * as Yup from "yup";

const notInPastTest = Yup.string().test(
  "date-not-in-past",
  "Appointment date must be today or later",
  (value) => {
    if (!value) return true;
    const today = startOfDay(new Date());
    const selected = startOfDay(new Date(value));
    return selected >= today;
  }
);

export const appointmentBaseSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title is too short"),
  clientId: Yup.number().required("Client name is required"),
  appointmentType: Yup.string().required("Appointment type is required"),
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
  // appointmentDate: Yup.mixed().when("appointmentType", {
  //   is: "Treatment",
  //   then: () =>
  //     // Yup.array()
  //     //   .of(Yup.string().required("Each date is required"))
  //     //   .min(1, "At least one date is required"),
  //     // Yup.array()
  //     //   .nullable() // allow null
  //     //   .default([]) // treat null as empty array
  //     //   .transform((val, orig) => (orig == null ? [] : val)) // normalize null -> []
  //     //   .of(Yup.string().required("Each date is required"))
  //     //   .min(1, "Please select at least one appointment date"),

  //     Yup.array()
  //       .nullable()
  //       .default([])
  //       .transform((val, orig) => (orig == null ? [] : val)) // null -> []
  //       .of(
  //         Yup.string()
  //           .required("Each date is required")
  //           .test(
  //             "date-not-in-past",
  //             "Appointment date must be today or later",
  //             (value) => {
  //               if (!value) return true;
  //               const today = startOfDay(new Date());
  //               const selected = startOfDay(new Date(value));
  //               return selected >= today;
  //             }
  //           )
  //       )
  //       .min(1, "Please select at least one appointment date"),
  //   otherwise: () =>
  //     Yup.string()
  //       .required("Appointment date is required")
  //       .test(
  //         "date-not-in-past",
  //         "Appointment date must be today or later",
  //         function (value) {
  //           if (!value) return true;
  //           const today = startOfDay(new Date());
  //           const selected = startOfDay(new Date(value));
  //           return selected >= today;
  //         }
  //       ),
  // }),
});

export const appointmentCreateSchema = appointmentBaseSchema.clone().shape({
  treatmentId: Yup.string().when("appointmentType", {
    is: (appointmentType) => appointmentType?.toLowerCase() === "treatment",
    then: (schema) => schema.required("Please select the treatment name"),
    otherwise: (schema) => schema.notRequired(),
  }),
  appointmentDate: Yup.mixed().when("appointmentType", {
    is: "Treatment",
    then: () =>
      // Yup.array()
      //   .of(Yup.string().required("Each date is required"))
      //   .min(1, "At least one date is required"),
      // Yup.array()
      //   .nullable() // allow null
      //   .default([]) // treat null as empty array
      //   .transform((val, orig) => (orig == null ? [] : val)) // normalize null -> []
      //   .of(Yup.string().required("Each date is required"))
      //   .min(1, "Please select at least one appointment date"),

      Yup.array()
        .nullable()
        .default([])
        .transform((val, orig) => (orig == null ? [] : val)) // null -> []
        .of(
          Yup.string().required("Each date is required").concat(notInPastTest)
        )
        .min(1, "Please select at least one appointment date"),
    otherwise: () =>
      Yup.string()
        .required("Appointment date is required")
        .concat(notInPastTest),
  }),
});

export const appointmentEditSchema = appointmentBaseSchema.clone().shape({
  appointmentDate: Yup.string()
    .required("Appointment date is required")
    .concat(notInPastTest),
});
