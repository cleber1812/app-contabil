// Footer.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'; // Exemplo de ícone

const Footer: React.FC = () => {
    const handleInstagramClick = () => {
        window.open('https://www.instagram.com/recontabis', '_blank');
      };
    
      const handleYoutubeClick = () => {
        window.open('https://youtube.com/channel/UC8j69GMbt0fDtHLSMdq2CrQ', '_blank');
      };

  return (
    <footer>
      <div className="footer-left">
        <p>Simulação Contábil e Financeira</p>
      </div>
      <div className="footer-center" style={{flexDirection:"column"}}>
        <p>&copy; Copyright 2024 Recontábis</p> 
        <p>Todos os direitos reservados.</p>
      </div>
      <div className="footer-right">        
        <div>
          <p style={{textAlign:"center"}}>Contato</p>
          <p>
            <a href='mailto:simulacontabil@gmail.com' style={{ color: 'inherit', textDecoration: 'none' }}>
            simulacontabil@gmail.com
            </a>
          </p>
        </div>
        <div onClick={handleInstagramClick}>
            <FontAwesomeIcon icon={faInstagram} />
        </div>
        <div onClick={handleYoutubeClick}>
            <FontAwesomeIcon icon={faYoutube} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;