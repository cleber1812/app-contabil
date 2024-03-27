import { useNavigate } from 'react-router-dom';
import logomarca2 from '../../src/assets/logomarca2.png'; // Importe sua imagem


export function Home() {
    const navigate = useNavigate();

    // const handleGoToLogin = () => {
    //     navigate('/login');
    // };    

    return (
        <div className="container">
          <img src={logomarca2} alt="Logo da empresa" />
          <h1 style={{ fontSize: 80, color: '#19647E' }}>CONTÁBIL123</h1>
          <h2>Aprenda a realizar lançamentos contábeis</h2>
          <h2>Veja os relatórios em tempo real</h2>
          {/* <button type="button" onClick={handleGoToCadastro}></button> */}
          <button type="button" onClick={() => navigate('/login')}>
            Login
          </button>
          <button type="button" onClick={() => navigate('/cadastrarusuario')}>
            Realizar cadastro
          </button>
        
        </div>
    )

}