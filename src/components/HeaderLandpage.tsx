//HeaderLandpage.tsx
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import logomarca3 from '../../src/assets/logomarca3horizontal.png'; // Importe sua imagem
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import '../App.css'; // Importe os estilos

const HeaderLandpage: React.FC = () => {
  const navigate = useNavigate();

  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const closeMenu = () => {
    setMenuAberto(false);
  };


  return (
    <header className="header">
      <div className="left">
        <img src={logomarca3} className="responsive-logo-header" alt="Contábil 123" />
      </div>
      {/* <nav className="right"> */}
      <nav className={`right ${menuAberto ? 'open' : ''}`}>
        {/* <a onClick={() => navigate('/')}>Home</a> */}
        {/* <a onClick={() => { document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); closeMenu(); }}>Home</a> */}
        <a onClick={() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); closeMenu(); }}>Funcionalidades</a>
        <a onClick={() => { document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }); closeMenu(); }}>Benefícios</a>
        <a onClick={() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); closeMenu(); }}>Como Funciona</a>
        <a onClick={() => { document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }); closeMenu(); }}>Depoimentos</a>
        <a onClick={() => navigate('/login')}>Login</a>
        <a onClick={() => navigate('/cadastrarusuario')}>Cadastre-se</a>
      </nav>
      <div className={"menu-icon"} onClick={toggleMenu}>
        <FontAwesomeIcon icon={menuAberto ? faClose : faBars}/>
      </div>
    </header>
  );
};

export default HeaderLandpage;