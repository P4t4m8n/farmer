"use client";

import { useRef } from "react";

import Logo from "./Logo";
import AppNav from "./AppNav";
import { BasketSvg } from "../Icons/Icons";

export default function Header() {
  const targetRef = useRef(null);

  return (
    <>
      <header className="fixed top-0 left-0  w-full  z-40 h-32  p-4 px-8 justify-between flex items-end shadow">
        <Logo />
        <AppNav />
        <button>
          <BasketSvg className=" w-12 h-12 fill-none stroke-white border p-2 rounded" />
        </button>
      </header>
      <div
        className=" w-screen top-[65rem] left-0 right-0 h-0 -z-10 absolute"
        ref={targetRef}
      ></div>
    </>
  );
}
