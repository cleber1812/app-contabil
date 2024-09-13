import React, { useState} from 'react';
import Modal from 'react-modal';
import '../App.css'; // Importe os estilos

interface CriarEmpresaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: any) => void; // Adicionando prop para a função de criação
  }

  const CriarEmpresaModal: React.FC<CriarEmpresaModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({        
        nome_empresa: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(formData);

        setFormData({
          nome_empresa: '',
        });

        onClose(); // Fechar o modal após a criação
      };
 
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Criar empresa"
        ariaHideApp={false} // Para evitar warning no console
        className="modal-container" // Adicione a classe de estilos
      >
        <h2 className="modal-header">CRIAR EMPRESA</h2>                
        <form onSubmit={handleSubmit}>                               
            <label> 
                Nome da Empresa: 
                <input
                    type="STRING" 
                    name="nome_empresa"
                    value={formData.nome_empresa}
                    placeholder='nome com o mínimo de 4 caracteres'
                    onChange={handleChange}
                /> 
            </label>
            <div className="modal-footer">
                <button type="submit" >Cadastrar empresa</button>
                <button type="button" onClick={onClose}>Fechar</button>
            </div>
        </form>
      </Modal>
    );
  };
  
  export default CriarEmpresaModal;



