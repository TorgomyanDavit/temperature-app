import React from 'react';
import "./style.css"

interface ErrorModalProps {
  errorMessage: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage, onClose }) => {
  return (
    <div className="modal">
      <h2>Error</h2>
      <p>{errorMessage}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ErrorModal;