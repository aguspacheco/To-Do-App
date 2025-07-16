import React from "react";
import "./confirmDeletePopup.css";
import { motion } from "framer-motion";

const ConfirmDeletePopup = ({ onConfirm, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      className="pop-container"
    >
      <div className="pop-content">
        <p>¿Estás seguro que quieres eliminar esta tarea?</p>
        <div className="popup-buttons">
          <button onClick={onConfirm} className="pop-button yes-button">
            Si
          </button>
          <button onClick={onCancel} className="pop-button no-button">
            No
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfirmDeletePopup;
