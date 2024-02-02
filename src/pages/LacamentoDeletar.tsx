import React, { useState } from 'react';
//import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import api from '../service/api';
import '../App.css';


export function DeletarLancamento() { 
    const navigate = useNavigate();  // Obtenha o objeto de navegação

    const [lancamentoId, setLancamentoId] = useState('');
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLancamentoId(event.target.value);
    }; 
    
    const handleDelete = async () => {
        try {
          // await axios.delete(`${api}/lancamento/${lancamentoId}`);
          await api.delete(`/lancamento/${lancamentoId}`);
          
          navigate('/lancamentos'); // Altere para a rota desejada após a exclusão.
        
        } catch (error) {
          console.error('Erro ao excluir lançamento:', error);         
        }
      };
  
    return (
        <div className="container">
            <h1>Deletar Lançamento</h1>
            <form>                
                <label> Id do lançamento: 
                    <input type="number" value={lancamentoId} onChange={handleInputChange}/> 
                </label>                                
                <button type="button" onClick={handleDelete}>
                    Deletar lançamento
                </button>
            </form>
            {/* Botão para voltar */}
            <button type="button" onClick= { () => navigate(-1) }>
              Voltar
            </button>
          </div>
        );
}

