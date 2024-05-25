import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../service/api';
import '../App.css';

export function CriarEmpresa() {
  const navigate = useNavigate();  // Obtenha o objeto de navegação
  const { userID } = useParams<{ userID: string }>();
  const [formData, setFormData] = useState({
    fk_id_usuario: userID,
    nome_empresa: '',    
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {      
      await api.post('/empresa', formData);

      // Limpar o formulário após o sucesso    
      setFormData({
        fk_id_usuario: '',
        nome_empresa: '',        
        });

      // Navegar para a página de login após o sucesso
      navigate(`/minhasempresas/${userID}`);

    } catch (error) {
        console.error('Erro ao cadastrar empresa:', error);
        // Adicionar lógica de tratamento de erro, se necessário
      }
  };

  return (
    <div className="container">
      <h1>Criar empresa</h1>
      <form onSubmit={handleSubmit}>                               
        <label> Nome da Empresa: <input
          type="STRING" 
          name="nome_empresa"
          value={formData.nome_empresa}
          onChange={handleChange}
          /> 
        </label>
        <button type="submit">Cadastrar empresa</button>
      </form>
    </div>    
  )

}