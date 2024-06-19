import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import '../App.css';
import Footer from '../components/Footer';
import ClipLoader from "react-spinners/ClipLoader"; // Importe o ClipLoader
import Modal from '../components/ErrorModalCriarUsuario'

export function CadastrarUsuario() {
  const navigate = useNavigate();  // Obtenha o objeto de navegação

  // Estado para controlar a abertura/fechamento do modal de erro
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
  
  const [formData, setFormData] = useState({
    nome: '',
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
      await api.post('/usuario', formData);

      // Limpar o formulário após o sucesso    
      setFormData({
        nome: '',
        email: '',
        senha: '',
        });

      // Navegar para a página de login após o sucesso
      navigate('/login');

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        // Adicionar lógica de tratamento de erro, se necessário
        setErrorModalOpen(true);
    } finally {
      setIsLoading(false); // Termina o carregamento
    }
  };

  return (
    <div id="root"> 
    <main>
    <div style={{marginTop:10}} className="container">
      <h1>Cadastrar Usuário</h1>
          {isLoading ? (
            <div className="loader-container">
              <ClipLoader color={"#19647E"} loading={isLoading} size={150} />
              <p>Carregando...</p>
            </div>
          ) : (
      <form onSubmit={handleSubmit}>                
        <label> Nome <input
          type="STRING" 
          name="nome"
          placeholder='Digite seu nome completo'
          value={formData.nome}
          onChange={handleChange}
          /> 
        </label>
        
        <label> Email <input
          type="STRING" 
          name="email"
          placeholder='Digite um e-mail válido'
          value={formData.email}
          onChange={handleChange}
          /> 
        </label>
        
        <label> Senha <input
        type="Password"
        name="senha"
        placeholder='Escolha uma senha'
        value={formData.senha}
        onChange={handleChange}
          /> 
        </label>
        
        <button type="submit">Cadastrar usuário</button>
      </form>
      )}

      <Modal isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} />
    
    </div>
    </main>
    <Footer />
    </div>
  )

}