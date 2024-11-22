"use client";

import Image from "next/image";
import { useCart } from "../../hooks/useCart";
import { useModel } from "@/hooks/useModel";
import { useRef } from "react";
import CartBtn from "./CartBtn";
import Link from "next/link";

const Cart = () => {
  const { cartItems, clearCart } = useCart();
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useModel(modelRef);

  return (
    <div ref={modelRef}>
      <CartBtn setIsOpen={setIsOpen} numOfItems={cartItems.length} />
      {isOpen && (
        <div className="fixed h-screen z-50 w-96 back top-0 right-0 shadow-model bg-black-1 p-4">
          <header className="flex items-center gap-4 border-b pb-2 px-1 font-title h-16 ">
            <h3 className="text-3xl ">Your Cart</h3>
            <CartBtn setIsOpen={setIsOpen} numOfItems={cartItems.length} />
            <button className=" self-end ml-auto underline" onClick={clearCart}>
              Clear Cart
            </button>
          </header>
          <ul className="h-[calc(100%-14rem)] overflow-auto">
            {cartItems.map((item) => (
              <li key={item.product._id}>
                <div>
                  <Image
                    src={item.product.imgUrl}
                    alt={item.product.name}
                    width={32}
                    height={32}
                  />
                  <h4>{item.product.name}</h4>
                  <p>{item.amount}</p>
                  <p>{item.totalPrice}</p>
                </div>
              </li>
            ))}
          </ul>
          <footer className="border-t flex flex-col gap-2 h-40 ">
            <span className="flex items-center justify-between">
              <h4>Total items cost</h4>
              <p>
                {cartItems.reduce((acc, item) => acc + item.totalPrice, 0)}$
              </p>
            </span>
            <span className="flex items-center justify-between">
              <h3>Delivery</h3>
              <p>42.00$</p>
            </span>
            <span className="flex items-center justify-between">
              <h3>Total</h3>
              <p>
                {cartItems.reduce((acc, item) => acc + item.totalPrice, 0) +
                  42.0}
                $
              </p>
            </span>
            <Link
              className="bg-white rounded-2xl text-black-1 text-center p-2 mt-auto"
              href="/checkout"
            >
              CheckOut
            </Link>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Cart;
