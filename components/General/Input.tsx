interface Props {
  inputProps: TInput;
  error?: string;
  children?: React.ReactNode;
}
export default function Input({ inputProps, children, error }: Props) {
  const { name } = inputProps;
  return (
    <div className=" bg-inherit">
      <label className="bg-inherit" htmlFor={name}>
        {children && children}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </label>
      <input
        {...inputProps}
        
      />
    </div>
  );
}
