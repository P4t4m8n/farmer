interface Props {
  style: "primary" | "secondary" | "tertiary";
  size: "small" | "medium" | "large";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const STYLES = {
  primary: "bg-black-1 text-white hover:opacity-90 ",
  secondary: "bg-white text-black-1 hover:bg-gray-50 ",
  tertiary: "bg-red-500 text-white hover:bg-red-600 ",
} as const;

const SIZES = {
  small: "px-3 py-2 text-sm",
  medium: "px-4 py-3 text-base",
  large: "px-6 py-4 text-lg",
} as const;

const Button = ({
  style,
  size,
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
                ${STYLES[style]}
                ${SIZES[size]}
                rounded-md
                transition-all
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${className}
            `}
    >
      {children}
    </button>
  );
};

export default Button;
