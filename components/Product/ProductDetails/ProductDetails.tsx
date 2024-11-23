"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

const ProductDetailsModel = ({ children }: Props) => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    console.log("dialog:", dialog)
    if (dialog) {
      dialog.showModal();
    }

    return () => {
      if (dialog) {
        dialog.close();
      }
    };
  }, []);

  const handleClose = () => {
    router.back(); // Navigate back on close
  };

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg  w-96 h-96 bg-white"
      onClick={(e) => {
        if (e.target === dialogRef.current) handleClose(); // Close on outside click
      }}
    >
      <button
        onClick={handleClose}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Close
      </button>
      {children}
    </dialog>
  );
};

export default ProductDetailsModel;
