import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import '../App.css';
import Footer from '../components/Footer';

export function CadastrarUsuario() {
  const navigate = useNavigate();  // Obtenha o objeto de navegação
  
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
      }
  };

  return (
    <div id="root"> 
    <main>
    <div className="container">
      <h1>Cadastar Usuário</h1>
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
    </div>
    </main>
    <Footer />
    </div>
  )

}