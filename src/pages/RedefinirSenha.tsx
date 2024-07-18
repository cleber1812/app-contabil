import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../service/api';
import '../App.css';
import Footer from '../components/Footer';
import ClipLoader from "react-spinners/ClipLoader"; // Importe o ClipLoader

export function RedefinirSenha() {
  const navigate = useNavigate();  // Obtenha o objeto de navegação

  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
  
  const { token } = useParams<{token: string}>(); 

  const [formData, setFormData] = useState({
    novaSenha: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Inicia o carregamento
    try {      
      await api.post(`/redefinirsenha/${token}`, formData);

      // Limpar o formulário após o sucesso    
      setFormData({        
        novaSenha: '',
        });

      // Navegar para a página de login após o sucesso
      navigate('/login');

    } catch (error) {
        console.error('Erro ao redefinir senha:', error);
        // Adicionar lógica de tratamento de erro, se necessário 
        // alert(error);
        alert('Erro ao redefinir senha');

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
        
        <label> Senha <input
        type="Password"
        name="novaSenha"
        placeholder='Escolha uma senha entre 4 e 10 caracteres'
        value={formData.novaSenha}
        onChange={handleChange}
          /> 
        </label>
        
        <button type="submit">Redefinir senha</button>
      </form>
      )}
    
    </div>
    </main>
    <Footer />
    </div>
  )

}