"use client";

import Logo from "./Logo";
import AppNav from "./AppNav";
import Cart from "../Cart/Cart";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="fixed bg-inherit top-0 left-0  w-full  z-40 h-32  p-4  justify-between flex items-end shadow">
        <Logo />
        <AppNav />
        <Link href="/signin">Login</Link>
        <Cart />
      </header>
    </>
  );
}
