// Header.tsx
// import React from 'react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons'; // Exemplo de ícone
import logomarca3 from '../../src/assets/logomarca3horizontal.png'; // Importe sua imagem

const Header: React.FC = () => {
  const navigate = useNavigate();

  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  
  useEffect(() => {
    const nome = localStorage.getItem('nome');
    setNomeUsuario(nome);
  }, []);

  // Função para logOut
  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const voltar = () => {    
    navigate(-1);
  };

  return (
    <header className="header">
      <div className="left">
        <img src={logomarca3} alt="Contábil 123" />
      </div>
      <div className="right">
        {nomeUsuario && <p>Bem-vindo, {nomeUsuario}</p>}
        <button onClick={voltar}>Voltar</button>
        <button onClick={logOut}>
          Sair
          <FontAwesomeIcon icon={faSignOut} transform="right-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;