import { useNavigate } from 'react-router-dom';
import HeaderLandpage from '../components/HeaderLandpage';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry, faListOl, faPieChart } from '@fortawesome/free-solid-svg-icons'; // Exemplo de ícone
import imgMaicon from '../../src/assets/img-maicon.jpg'; // Importe sua imagem
import imgElizangela from '../../src/assets/img-elizangela.jpg'; // Importe sua imagem
import imgPedro from '../../src/assets/img-pedro.jpg'; // Importe sua imagem

export function Home() {
  const navigate = useNavigate();

  return (
    <div id="root"> 
      <HeaderLandpage />
      <main>
        <section className="hero">
          {/* <img src={logomarca2} className="responsive-logo" alt="Logo da empresa" />           */}
          <h1 className="responsive-title">Pratique Contabilidade de Forma Fácil e Intuitiva</h1>
          <h3>Desenvolva suas habilidades com lançamentos contábeis em tempo real</h3>
          <button onClick={() => navigate('/cadastrarusuario')}>Comece Agora Gratuitamente</button>
        </section>

        <section id="features" className="features">
          <h2>Funcionalidades</h2>
          <div className="features-container">
            <div className="feature-item">
              <FontAwesomeIcon icon={faIndustry} className="feature-icon" />
              <h3>Registro de Empresas</h3>
              <p>Facilidade para cadastrar múltiplas empresas em poucos passos.</p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faListOl} className="feature-icon" />
              <h3>Lançamentos Contábeis</h3>
              <p>Insira compras, vendas, despesas e muito mais de forma intuitiva.</p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faPieChart} className="feature-icon" />
              <h3>Visualização de Resultados</h3>
              <p>Veja o Balanço Patrimonial e DRE em tempo real.</p>
            </div>
          </div>
        </section>

        <section id="benefits" className="benefits">
          <h2>Por Que Usar Contábil123?</h2>
          <ul>
            <li>Gratuito: Sem custos para começar a praticar.</li>
            <li>Intuitivo: Interface amigável e fácil de usar.</li>
            <li>Feedback em Tempo Real: Resultados instantâneos dos lançamentos.</li>
            <li>Prática Profissional: Experiência prática para estudantes e iniciantes.</li>
          </ul>
        </section>

        <section id="how-it-works" className="how-it-works">
          <h2>Como Funciona?</h2>
          <ol>
            <li>Crie sua conta e faça login.</li>
            <li>Cadastre suas empresas.</li>
            <li>Realize lançamentos contábeis.</li>
            <li>Visualize os relatórios financeiros.</li>
          </ol>
        </section>

        <section id="testimonials" className="testimonials">
          <h2>O Que Nossos Usuários Dizem</h2>
          <div className="testimonials-container">
            <div className="testimonials-item">
              <img src={imgMaicon} className="testimonials-icon" alt="Logo da empresa" />
              <p>"Contábil123 facilitou meu aprendizado de contabilidade!"</p>
              <p>Maicon</p>
            </div>
            <div className="testimonials-item">
              <img src={imgElizangela} className="testimonials-icon" alt="Logo da empresa" />
              <p>"Agora eu consigo entender melhor os relatórios financeiros."</p>
              <p>Elizângela</p>
            </div>
            <div className="testimonials-item">
              <img src={imgPedro} className="testimonials-icon" alt="Logo da empresa" />
              <p>"Uma ferramenta essencial para estudantes de administração."</p>
              <p>Pedro</p>
            </div>
          </div>
        </section>

        <section className="call-to-action">
          <h2>Vamos Começar?</h2>
          <p>Crie sua conta gratuita e comece a praticar hoje mesmo.</p>
          <button onClick={() => navigate('/cadastrarusuario')}>Cadastre-se Gratuitamente</button>
        </section>
        
        
      </main>
      <Footer />
    </div>
  )

}