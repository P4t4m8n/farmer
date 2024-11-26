export const LOGIN_INPUTS: TInput[] = [
  {
    type: "email",
    placeholder: "Email",
    name: "email",
    required: true,
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", // Normal email format
    title: "Please enter a valid email address.",
  },
  {
    type: "password",
    placeholder: "Password",
    name: "password",

    autoComplete: "current-password",
    pattern: "^(?=.*[A-Z])(?=.*\\d).{6,}$", // At least 6 chars, 1 uppercase, 1 number
    required: true,
    title:
      "Password must be at least 6 characters long, contain an uppercase letter and a number.",
  },
];

export const SIGN_UP_INPUTS: TInput[] = [
  ...LOGIN_INPUTS,
  {
    type: "text",
    placeholder: "First name",
    name: "firstName",

    required: true,
    title: "First name must contain at least 2 letters.",
    pattern: "^[a-zA-Z]{2,}$", // Only letters, at least 2 characters
  },
  {
    type: "text",
    placeholder: "Last name",
    name: "lastName",

    autoComplete: "family-name",
    required: true,
    title: "Last name must contain at least 2 letters.",
    pattern: "^[a-zA-Z]{2,}$", // Only letters, at least 2 characters
  },
];
