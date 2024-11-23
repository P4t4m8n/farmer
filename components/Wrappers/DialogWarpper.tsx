"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

const DialogWarpper = ({ children }: Props) => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
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
      className="rounded-lg  w-96 h-96 bg-white z-50"
      onClick={handleClose}
    >
      <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
        {children}
      </div>
    </dialog>
  );
};

export default DialogWarpper;
