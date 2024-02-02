import { useNavigate } from 'react-router-dom';


export function Home() {
    const navigate = useNavigate();

    // const handleGoToLogin = () => {
    //     navigate('/login');
    // };    

    return (
        <div className="container">
          <h1>Sistema APP CONTABIL</h1>
          <h2>Aprenda a realizar os lançamentos contábeis</h2>
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