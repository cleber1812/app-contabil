import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import Modal from '../components/ErrorModalLogin'
import Footer from '../components/Footer';
import api from '../service/api';
import '../App.css';
import ClipLoader from "react-spinners/ClipLoader"; // Importe o ClipLoader

export function Login() {
    const navigate = useNavigate();
    // const history = useHistory();

    // Estado para controlar a abertura/fechamento do modal de erro
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

    const [formData, setFormData] = useState({      
      email: '',
      senha: '',    
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true); // Inicia o carregamento
      try {      
        const response = await api.post('/login', formData);

        // Limpar o formulário após o sucesso    
        // setFormData({          
        //   email: '',
        //   senha: '',
        //   });

        //console.log(response.data.id)
  
        // // Verificar se o ID do usuário está presente na resposta
        // if (response.data.id !== undefined) {
        //   // Navegar para a página de login após o sucesso, incluindo o ID do usuário
        // navigate(`/minhasempresas/${response.data.id}`);                 
        // } else {        
        //   console.error('ID do usuário não está presente na resposta.');
        //   // Abrir o modal de erro
        //   setErrorModalOpen(true);        
        // };

        if (response.data.token) {
          // Armazena o token no localStorage
          localStorage.setItem('token', response.data.token);
          // console.log(response.data.token);
          localStorage.setItem('nome', response.data.nome); // Armazenar o nome do usuário
  
          // Navega para a página desejada após o login (use o useHistory para isso)
          // history.push(`/minhasempresas/${response.data.id}`);
          // navigate(`/minhasempresas/${response.data.id}`); 
          navigate('/minhasempresas'); 
        } else {
          console.error('Token não está presente na resposta.');
          setErrorModalOpen(true);
        }
  
      } catch (error) {
          console.error('Erro ao fazer login:', error);
          // Abrir o modal de erro
          setErrorModalOpen(true);
      } finally {
        setIsLoading(false); // Termina o carregamento
      }
    };

    return (
      <div id="root">         
        <main>
        <div style={{marginTop:10}} className="container">
          <h1>Login</h1>
          {isLoading ? (
            <div className="loader-container">
              <ClipLoader color={"#19647E"} loading={isLoading} size={150} />
              <p>Carregando...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
            <label> Email: 
              <input
                type="STRING" 
                name="email"
                value={formData.email}
                onChange={handleChange}
              /> 
            </label>
            
            <label> Senha:
              <input style={{marginBottom: 1 }}
                type="Password" 
                name="senha"
                value={formData.senha}
                onChange={handleChange}
              /> 
              <p style={{fontSize: 13 , marginBottom: 15 , alignSelf: 'end' }}>Esqueceu a senha <Link to="/esquecisenha" className="custom-link"><strong>Clique aqui</strong></Link></p>
            </label>            
        
            <button type="submit">Fazer login</button>

          </form>
          )}
          
          <p>Não tem uma conta? <Link to="/cadastrarusuario" className="custom-link"><strong>Cadastre-se</strong></Link></p>

          {/* <button 
            type="button" 
            style={{ backgroundColor: '#96C0B7' }}
            onClick={() => navigate('/cadastrarusuario')}>
            Realizar cadastro
          </button>   */}
          
          <Modal isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} />
        </div>
        </main>
        <Footer />
      </div>
    )

}