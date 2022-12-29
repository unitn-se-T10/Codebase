// import { feedbackSubjects } from "pages/feedback";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const nameSchema = Yup.string()
  .required("This field is required")
  .max(50, "Name too long! (max: 50)")
  .matches(/^[\w]*$/, "Name contains invalid chararcter");

const emailSchema = Yup.string()
  .required("Email is required!")
  .email("Invalid email");

const usrLoginSchema = Yup.string()
  .required("Username is required!")
  .max(24, "Username too long! (max: 24)")
  .matches(/^[\w\-\_\.]*$/, "Username contains invalid chararcters");

const pwdLoginSchema = Yup.string()
  .required("Password is essential!")
  .matches(/^[\w\!\@\#\$\%\^\&\*\.\-]*$/, "Password contains invalid character")
  .max(64, "Password too long! (max: 64)");

const usrRegSchema = Yup.string()
  .required("Username is required!")
  .min(3, "Username too short! (min: 3)")
  .max(24, "Username too long! (max: 24)")
  .matches(/^[\w\-\_\.]*$/, "Username contains invalid chararcter");

const pwdRegSchema = Yup.string()
  .password()
  .required("Password is essential!")
  .matches(/^[\w\!\@\#\$\%\^\&\*\.\-]*$/, "Password contains invalid character")
  .min(8, "Password must be at least 8 characters")
  .max(256, "Password too long! (max: 256)")
  .minLowercase(1, "Password must contain at least 1 lowercase letter")
  .minUppercase(1, "Password must contain at least 1 uppercase letter")
  .minSymbols(1, "Password must contain at least 1 symbol letter")
  .minNumbers(1, "Password must contain at least 1 number letter");

// const feedbackSubjectSchema = Yup.string()
//   .required("Subject is required!")
//   .test("FeedbackSubject", "Invalid subject", (value) =>
//     feedbackSubjects.includes(value ?? "")
//   );
//
// const feedbackMessageSchema = Yup.string()
//   .required("Message is required!")
//   .min(10, "Message too short! (min: 10)")
//   .max(1000, "Message too long! (max: 1000)");

export const loginSchema = {
  email: emailSchema,
  username: usrLoginSchema,
  password: pwdLoginSchema,
};

export const regSchema = {
  name: nameSchema,
  email: emailSchema,
  username: usrRegSchema,
  password: pwdRegSchema,
};

export const secretCodeSchema = Yup.string()
  .matches(/^[a-f0-9]{32}$/, "Secret code wrongly formatted")
  .required("Secret code is required!");

// export const feedbackSchema = {
//   subject: feedbackSubjectSchema,
//   message: feedbackMessageSchema,
// };
//
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
// const MAX_FILE_SIZE = 10000000;
//
// export const imageSchema = Yup.mixed()
//   .required("Image is required")
//   .test("fileType", "Please use png, jpeg or gif", (value) =>
//     SUPPORTED_FORMATS.includes(value?.type)
//   )
//   .test(
//     "fileSize",
//     "File is too large (max: 10MB)",
//     (value) => value?.size <= MAX_FILE_SIZE
//   );
