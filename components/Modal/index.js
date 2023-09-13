"use client";
import styles from "./modal.module.css";
import { useRef, useCallback, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import CompleteInformation from "../CompleteInformation";
import { Context } from "@/context/Context";

export default function Modal({ type }) {
  const { modal, setModal } = useContext(Context);

  const onClose = () => {
    setModal(false);
  };

  const modalWrapperRef = useRef();
  // const backDropHandler = useCallback((e) => {
  //   if (!modalWrapperRef?.current?.contains(e.target)) {
  //     onClose();
  //   }
  // }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     window.addEventListener("click", backDropHandler);
  //   });
  // }, []);
  // useEffect(() => {
  //   return () => window.removeEventListener("click", backDropHandler);
  // }, []);
  const modalContent = (
    <div className={styles.modalOverlay}>
      <div ref={modalWrapperRef} className={styles.modalWrapper}>
        <div className={styles.modal}>
          {type === "completeProfile" && <CompleteInformation />}
          {type !== "completeProfile" && (
            <div className={styles.close} onClick={onClose}>
              X
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
}
