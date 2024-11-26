import Input from "@/components/General/Input";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  setOrderToEdit: React.Dispatch<React.SetStateAction<IOrder>>;
}
const PersonalDetails = ({
  firstName,
  lastName,
  email,
  phone,
  setOrderToEdit,
}: Props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderToEdit((prev) => ({
      ...prev,
      userDetails: { ...prev.userDetails, [name]: value },
    }));
  };

  const inputProps: TInput[] = [
    {
      onChange,
      type: "text",
      placeholder: "First Name",
      name: "firstName",
      value: firstName,
      required: true,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text",
    },
    {
      onChange,
      type: "text",
      placeholder: "Last Name",
      name: "lastName",
      value: lastName,
      required: true,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text",
    },
    {
      onChange,
      type: "email",
      placeholder: "Email",
      name: "email",
      value: email,
      required: true,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text",
    },
    {
      onChange,
      type: "tel",
      placeholder: "XXX-XXXXXXX",
      name: "phone",
      value: phone,
      required: true,
      pattern: "[0-9]{3}-[0-9]{7}",
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text",
    },
  ];

  return (
    <form className=" font-text grid gap-2 grid-cols-2 grid-rows-2  w-full h-24">
      {inputProps.map((input) => (
        <Input key={input.name} inputProps={input} />
      ))}
    </form>
  );
};

export default PersonalDetails;
