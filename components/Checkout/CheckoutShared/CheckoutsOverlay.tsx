import Button from "@/components/General/Button";

interface Props {
  isHidden: boolean;
  hanldeChangeStage: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}
const CheckoutsOverlay = ({ isHidden, hanldeChangeStage }: Props) => {
  return (
    <Button
      style="primary"
      size="medium"
      onClick={hanldeChangeStage}
      className={` absolute inset-0  w-full h-full z-10  bg-black pointer-events-auto opacity-40 ${
        isHidden ? " hidden" : ""
      } `}
    ></Button>
  );
};

export default CheckoutsOverlay;
