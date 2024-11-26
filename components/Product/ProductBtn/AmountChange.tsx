import { iconService } from "@/components/Icons/Icons";

interface Props {
  style: {
    contianer: string;
    span: string;
    svgSize?: number;
  };
  amount: number;
  handleAmountChange: (amount: number) => void;
}
const AmountChange = ({ style, amount, handleAmountChange }: Props) => {
  return (
    <div className={style.contianer}>
      <button
        onClick={() => handleAmountChange(-1)}
        disabled={amount < 0}
        className=""
      >
        {iconService.MinusSvg(style.svgSize)}
      </button>
      <span className={style.span}>{amount}</span>
      <button onClick={() => handleAmountChange(1)} className="">
        {iconService.PlusSvg(style.svgSize)}
      </button>
    </div>
  );
};

export default AmountChange;
