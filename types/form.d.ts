declare type TInputUserFormKeys =
  | "email"
  | "username"
  | "password"
  | "firstName"
  | "lastName";

declare type TInput = {
  type: "text" | "password" | "email" | "tel" | "number" | "radio";
  placeholder?: string;
  name: string;
  checked?: boolean;
  autoComplete?: string;
  pattern?: string;
  required?: boolean;
  title?: string;
  inputMode?: "numeric";
  hidden?: boolean;
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

declare interface ISelect extends TInput {
  options: readonly string[];
}
