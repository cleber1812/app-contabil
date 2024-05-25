// Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons'; // Exemplo de ícone
import logomarca3 from '../../src/assets/logomarca3horizontal.png'; // Importe sua imagem

const Header: React.FC = () => {
  const navigate = useNavigate();

  // Função para logOut
  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header>
      <div className="left">
        <img src={logomarca3} alt="Contábil 123" />
      </div>      
      <div className="right">        
        <button onClick={logOut}>Sair
        <FontAwesomeIcon icon={faSignOut} transform="right-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;