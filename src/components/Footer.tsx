// Footer.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'; // Exemplo de ícone

const Footer: React.FC = () => {
    const handleInstagramClick = () => {
        window.open('https://www.instagram.com/cleber1812roberto', '_blank');
      };
    
      const handleYoutubeClick = () => {
        window.open('https://youtube.com/channel/UC8j69GMbt0fDtHLSMdq2CrQ', '_blank');
      };

  return (
    <footer>
      <div className="left">
        <p>Simulação Contábil e Financeira</p>
      </div>
      <div className="center">
        <p>copyright 2024</p>
      </div>
      <div className="right">        
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