interface Props {
  inputProps: TInput;
  error?: string;
}
export default function Input({ inputProps, error }: Props) {
  const { label, name } = inputProps;
  return (
    <div className=" text-black-1">
      <label className="" htmlFor={name}>
        <h3>{label}</h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </label>
      <input {...inputProps} className="" />
    </div>
  );
}
