import React, { useEffect } from "react";
import "./InfoTooltip.css";
import close from "../../images/close.svg"

function InfoTooltip({ isOpen, isSuccess, onClose, onRegisterClick }) {
  
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`tooltip ${isOpen ? "tooltip_opened" : ""}`} onClick={onClose}>
      <div
        className={`tooltip__container ${isOpen ? "tooltip__container_opened" : ""}`}
        onClick={(e) => e.stopPropagation()} 
      >
        <img
          className="tooltip__close"
          src={close}
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
        >
        </img>

        <h2 className="tooltip__message">
          {isSuccess
            ? "¡El registro se ha completado con éxito!"
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </h2>

          <button
            className="tooltip__button"
            type="button"
            onClick={() => {
              onClose();
              onRegisterClick();
            }}
          >
            Inscribirse
          </button>
      
      </div>
    </div>
  );
}

export default InfoTooltip;