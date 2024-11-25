import { ReactNode } from "react";

interface Props {
  backgroundName: "main" | "secondary";
  children?: ReactNode;
}

export default function Parallax({ backgroundName, children }: Props) {
  return (
    <div className="relative h-screen overflow-hidden img-clip-path">
      <div
        className={`absolute inset-0 bg-fixed bg-parallax-main bg-center bg-cover`}
      ></div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      {children}
    </div>
  );
}
