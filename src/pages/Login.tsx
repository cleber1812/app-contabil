import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    

    return (
        <div className="container">
          <h1>Login</h1>
          <button type="button" onClick={()=> navigate('/cadastrarusuario')}>
            Cadastrar usuário
          </button>
        </div>
    )

}