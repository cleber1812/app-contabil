import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/ErrorModal'
import api from '../service/api';
import '../App.css';

export function Login() {
    const navigate = useNavigate();

    // Estado para controlar a abertura/fechamento do modal de erro
    const [errorModalOpen, setErrorModalOpen] = useState(false);

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
      try {      
        const response = await api.post('/login', formData);
  
        // Limpar o formulário após o sucesso    
        // setFormData({          
        //   email: '',
        //   senha: '',
        //   });

        //console.log(response.data.id)
  
        // Verificar se o ID do usuário está presente na resposta
        if (response.data.id !== undefined) {
          // Navegar para a página de login após o sucesso, incluindo o ID do usuário
        navigate(`/minhasempresas/${response.data.id}`);                 
        } else {        
          console.error('ID do usuário não está presente na resposta.');
          // Abrir o modal de erro
          setErrorModalOpen(true);        
        };
  
      } catch (error) {
          console.error('Erro ao fazer login:', error);
          // Abrir o modal de erro
          setErrorModalOpen(true);
        }
    };

    return (
        <div className="container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <label> Email: <input
              type="STRING" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              /> 
            </label>
            
            <label> Senha: <input
            type="STRING" 
            name="senha"
            value={formData.senha}
            onChange={handleChange}
              /> 
            </label>
        
            <button type="submit">Fazer login</button>
          </form>  
          
          <Modal isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} />
        </div>
    )

}