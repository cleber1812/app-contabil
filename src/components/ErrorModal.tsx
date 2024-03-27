import React from 'react';
import Modal from 'react-modal';
import '../App.css'; // Importe os estilos

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

  const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Erro de Login"
        ariaHideApp={false} // Para evitar warning no console
        className="modal-container" // Adicione a classe de estilos
      >
        <h2 className="modal-header">Erro de Login</h2>
        <p className="modal-content">Confira seu email e/ou senha e tente novamente.</p>
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>Fechar</button>
        </div>
      </Modal>
    );
  };
  
  export default ErrorModal;



