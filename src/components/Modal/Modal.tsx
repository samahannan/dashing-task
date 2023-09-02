import React from "react";
import "./Modal.scss";

export default function Modal({
  classes = "",
  isOpen,
  closeModal,
  title,
  children,
}: {
  classes?: string;
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <div className={`modal ${classes}`}>
        {isOpen && (
          <div className="modal_content">
            <div className="modal_header">
              {title && <h3>{title}</h3>}
              <div className="modal_close" onClick={() => closeModal()}>
                <img src="/close.svg" alt="close" />
              </div>
            </div>
            <div className="modal_inner_content">{children}</div>
          </div>
        )}
      </div>
      {isOpen && <div className="overlay" onClick={() => closeModal()}></div>}
    </>
  );
}
