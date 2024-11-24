declare type TInputUserFormKeys =
  | "email"
  | "username"
  | "password"
  | "firstName"
  | "lastName";

declare type TInput = {
  type: "text" | "password" | "email" | "tel" | "number";
  placeholder?: string;
  name: string;
  label?: string;
  autoComplete?: string;
  pattern?: string;
  required?: boolean;
  title?: string;
  inputMode?: "numeric";
  hidden?: boolean;
  value?: string;
  maxLength?: number;
};

declare interface ISelectSingleProps extends TInput {
  options: readonly string[];
}
