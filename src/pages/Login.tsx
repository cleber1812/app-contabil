import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();

    const handleGoToCadastro = () => {
        navigate('/cadastrarusuario');
    };

    return (
        <div className="container">
          <h1>Login</h1>
          <button type="button" onClick={handleGoToCadastro}>
            Cadastrar usuário
          </button>
        </div>
    )

}