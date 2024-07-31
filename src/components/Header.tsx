// Header.tsx
// import React from 'react';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons'; // Exemplo de ícone
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
        <a href="https://contabil123.netlify.app/" target="_blank">
          <img src={logomarca3} className="responsive-logo-header" alt="Contábil 123" />
        </a>
      </div>
      <div className="right2">
        {nomeUsuario && <p>Bem-vindo, {nomeUsuario}</p>}
        <div style={{marginLeft: 10, marginRight: 5}}>
        <Link to={`/meusdados`}>
            <FontAwesomeIcon icon={faUserPen}
            // color='#618985'
            className='icon_editar'
            />
        </Link> 
        </div>
        <button onClick={voltar}>Voltar</button>
        <button className='excluir' onClick={logOut}>
          Sair
          {/* <FontAwesomeIcon icon={faSignOut} transform="right-5" /> */}
        </button>
      </div>
    </header>
  );
};

export default Header;