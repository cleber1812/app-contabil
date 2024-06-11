//HeaderLandpage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logomarca3 from '../../src/assets/logomarca3horizontal.png'; // Importe sua imagem

const HeaderLandpage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="left">
        <img src={logomarca3} className="responsive-logo-header" alt="Contábil 123" />
      </div>
      <nav className="right">
        <a onClick={() => navigate('/')}>Home</a>
        <a onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>Funcionalidades</a>
        <a onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}>Benefícios</a>
        <a onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>Como Funciona</a>
        <a onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}>Depoimentos</a>
        <a onClick={() => navigate('/login')}>Login</a>
        <a onClick={() => navigate('/cadastrarusuario')}>Cadastre-se</a>
      </nav>
    </header>
  );
};

export default HeaderLandpage;