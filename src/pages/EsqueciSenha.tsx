import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import '../App.css';
import Footer from '../components/Footer';
import ClipLoader from "react-spinners/ClipLoader"; // Importe o ClipLoader

export function EsqueciSenha() {
  const navigate = useNavigate();  // Obtenha o objeto de navegação

  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
  
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Inicia o carregamento
    try {      
      await api.post(`/esquecisenha`, formData);

      // Limpar o formulário após o sucesso    
      setFormData({        
        email: '',
        });
    
      alert('Um link de recuperação de senha foi enviado para seu email');
      // Navegar para a página de login após o sucesso
      navigate('/');

    } catch (error) {
        console.error('Erro ao solicitar alteração de senha:', error);
        // Adicionar lógica de tratamento de erro, se necessário 
        // alert(error);
        alert('Email não encontrado');

    } finally {
      setIsLoading(false); // Termina o carregamento
    }
  };

  return (
    <div id="root"> 
    <main>
    <div style={{marginTop:10}} className="container">
      <h1>Redefinir Senha</h1>
          {isLoading ? (
            <div className="loader-container">
              <ClipLoader color={"#19647E"} loading={isLoading} size={150} />
              <p>Carregando...</p>
            </div>
          ) : (
      <form onSubmit={handleSubmit}>                
        
        <label> Email: <input
              type="STRING" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              /> 
            </label>
        
        <button type="submit">Solicitar alteração de senha</button>
      </form>
      )}
    
    </div>
    </main>
    <Footer />
    </div>
  )

}