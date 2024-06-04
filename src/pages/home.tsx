import { useNavigate } from 'react-router-dom';
import logomarca2 from '../../src/assets/logomarca2.png'; // Importe sua imagem
import Footer from '../components/Footer';



export function Home() {
    const navigate = useNavigate();

    // const handleGoToLogin = () => {
    //     navigate('/login');
    // };    

    return (
        <div id="root"> 
        <main>
        <div className="container">
          <img src={logomarca2} className="responsive-logo" alt="Logo da empresa" />
          <h1 className="responsive-title">CONTÁBIL123</h1>
          <h2>Aprenda a realizar lançamentos contábeis</h2>
          <h2>Veja os relatórios em tempo real</h2>
          {/* <button type="button" onClick={handleGoToCadastro}></button> */}
          <button type="button" onClick={() => navigate('/login')}>
            Login
          </button>
          <button 
            type="button" 
            style={{ backgroundColor: '#96C0B7' }}
            onClick={() => navigate('/cadastrarusuario')}>
            Realizar cadastro
          </button>
        
        </div>
        </main>
        <Footer />
        </div>
    )

}