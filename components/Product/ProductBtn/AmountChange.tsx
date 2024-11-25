import { iconService } from "@/components/Icons/Icons";

interface Props {
  style: {
    contianer: string;
    span: string;
  };
  amount: number;
  handleAmountChange: (amount: number) => void;
}
const AmountChange = ({ style, amount, handleAmountChange }: Props) => {
  console.log("amount:", amount);
  return (
    <div className={style.contianer}>
      <button
        onClick={() => handleAmountChange(-1)}
        disabled={amount < 0}
        className=""
      >
        {iconService.MinusSvg()}
      </button>
      <span className={style.span}>{amount}</span>
      <button onClick={() => handleAmountChange(1)} className="">
        {iconService.PlusSvg()}
      </button>
    </div>
  );
};

export default AmountChange;
