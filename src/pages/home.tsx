import { useNavigate } from 'react-router-dom';


export function Home() {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate('/login');
    };

    const handleGoToCadastro = () => {
        navigate('/cadastrarusuario');
    };

    return (
        <div className="container">
          <h1>Home</h1>
          <button type="button" onClick={handleGoToLogin}>
            Login
          </button>
          <button type="button" onClick={handleGoToCadastro}>
            Cadastrar usuário
          </button>
        
        </div>
    )

}