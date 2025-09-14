import { ROLES } from "@/shared/rolesConstant";

// const taskAssigneeOptions = [
//   {
//     img: "/images/avatar/2.png",
//     label: "arcie.tones@gmail.com",
//     value: "arcie.tones@gmail.com",
//   },

//   {
//     img: "/images/avatar/3.png",
//     label: "jon.tones@gmail.com",
//     value: "jon.tones@gmail.com",
//   },
//   {
//     img: "/images/avatar/4.png",
//     label: "lanie.nveyn@gmail.com",
//     value: "lanie.nveyn@gmail.com",
//   },
//   {
//     img: "/images/avatar/5.png",
//     label: "nneth.une@gmail.com",
//     value: "nneth.une@gmail.com",
//   },
//   {
//     img: "/images/avatar/6.png",
//     label: "erna.serpa@outlook.com",
//     value: "erna.serpa@outlook.com",
//   },
//   {
//     img: "/images/avatar/7.png",
//     label: "mar.audrey@gmail.com",
//     value: "mar.audrey@gmail.com",
//   },
//   {
//     img: "/images/avatar/8.png",
//     label: "nancy.elliot@outlook.com",
//     value: "nancy.elliot@outlook.com",
//   },
// ];

const appointmentTypeOptions = [
  { value: "Assessment", label: "Assessment" },
  { value: "Consultation", label: "Consultation" },
  { value: "Treatment", label: "Treatment" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const isActiveOptions = [
  { value: true, label: "Active", color: "#17c666" },
  { value: false, label: "Inactive", color: "#ea4d4d" },
];

const roleIdOptions = [
  { value: ROLES.STAFF.value, label: ROLES.STAFF.label },
  { value: ROLES.PSYCHOLOGIST.value, label: ROLES.PSYCHOLOGIST.label },
  { value: ROLES.THERAPIST.value, label: ROLES.THERAPIST.label },
  { value: ROLES.SPED_TEACHER.value, label: ROLES.SPED_TEACHER.label },
  { value: ROLES.SCHOOL_PIC.value, label: ROLES.SCHOOL_PIC.label },
  { value: ROLES.SUPER_ADMIN.value, label: ROLES.SUPER_ADMIN.label },
];

const relationshipOptions = [
  { value: "Father", label: "Father" },
  { value: "Mother", label: "Mother" },
  { value: "Sibling", label: "Sibling" },
  { value: "Aunt", label: "Aunt" },
  { value: "Uncle", label: "Uncle" },
  { value: "Niece", label: "Niece" },
  { value: "Nephew", label: "Nephew" },
  { value: "Grand Father", label: "Grand Father" },
  { value: "Grand Mother", label: "Grand Mother" },
];

const countriesOptions = [{ value: "Indonesia", label: "Indonesia" }];

const sharingOptions = [
  {
    value: true,
    label: "Yes",
    icon: "feather-check",
    iconClassName: "text-success",
  },
  {
    value: false,
    label: "No",
    icon: "feather-x",
    iconClassName: "text-danger",
  },
];

const roomOptions = [
  { value: 1, label: "Room 1" },
  { value: 2, label: "Room 2" },
];

export {
  // taskAssigneeOptions,
  appointmentTypeOptions,
  genderOptions,
  relationshipOptions,
  isActiveOptions,
  roleIdOptions,
  countriesOptions,
  sharingOptions,
  roomOptions,
};
