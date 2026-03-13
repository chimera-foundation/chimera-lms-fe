"use client";
import React from "react";

export interface ModalProps {
  showModal: boolean;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const { showModal, children } = props;
  return (
    <>
      {showModal ? (
        <>
          <div
            style={{ zIndex: 999 }}
            className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 right-0 flex justify-center items-center z-50 animate-fade"
          >
            {children}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
