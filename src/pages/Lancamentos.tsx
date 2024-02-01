//import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../service/api';
import { Link } from 'react-router-dom'; // Importa o Link do react-router-dom
import '../App.css';
import '../styles/modal.css'// Importa os estilos do modal

async function fetchLancamentos() {
  try {
    const response = await api.get('/lancamentos');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar lançamentos');
  }
}

export function Lancamentos() {
  // const { data: lancamentos, isLoading, isError } = useQuery('lancamentos', fetchLancamentos);

  // Adicione o refetchOnWindowFocus: true para rebuscar os dados quando a janela recebe foco
  const { data: lancamentos, isLoading, isError, refetch } = useQuery('lancamentos', fetchLancamentos, {
    refetchOnWindowFocus: true,
  });

// export function Lancamentos() { 
//     const { data, isLoading, isError } = useQuery('lancamentos', () => {
//         return axios
//           .get(`${api}/lancamentos`)
//           //.get('http://localhost:3000/usuarios')
//           .then((response) => response.data);
//       });

  // Adiciona estado para armazenar o ID do lançamento a ser excluído
  const [lancamentoIdToDelete, setLancamentoIdToDelete] = useState<number | null>(null);

      if (isLoading) {
        return <div>Carregando...</div>;
      }
  
      if (isError) {
          return <p>Ocorreu um erro ao buscar lançamentos.</p>;
        }
      
  // Função para configurar o ID do lançamento a ser excluído
  const confirmDelete = (id: number) => {
    setLancamentoIdToDelete(id);
  };
  
  // Função para cancelar a exclusão
  const cancelDelete = () => {
    setLancamentoIdToDelete(null);
  };

  // Função para excluir o lançamento
  const handleDelete = async (lancamentoId: number) => {
    try {
      await api.delete(`/lancamento/${lancamentoId}`);
      // Refetch dos dados após a exclusão
      refetch();
      // Atualiza a lista de lançamentos após a exclusão
      setLancamentoIdToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir lançamento:', error);
    }
  };

        return (
          <div>
            <h1>Lançamentos</h1>
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Empresa</th>
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Conta Débito</th>
                            <th>Conta Crédito</th>
                            <th>Valor</th>
                            <th>Usuário</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>                      
                      {lancamentos.map((lancamento: any) => (
                        <tr key={lancamento.id}>
                            <td>{lancamento.id}</td>
                            <td>{lancamento.fk_id_empresa}</td>
                            <td>{lancamento.data}</td>
                            <td>{lancamento.descricao}</td>
                            <td>{lancamento.fk_id_conta_debito}</td>
                            <td>{lancamento.fk_id_conta_credito}</td>
                            <td>{lancamento.valor}</td>
                            <td>{lancamento.fk_id_usuario}</td>
                            <td>
                              <Link to={`/atualizarlancamento/${lancamento.id}`}>
                                <button>Editar</button>
                              </Link>                              
                              <button onClick={() => confirmDelete(lancamento.id)}>Excluir</button>
                            </td>
                        </tr>      
                      ))}            
                    </tbody>
                </table>
              
              {/* Modal de confirmação de exclusão */}
              {lancamentoIdToDelete && (
                <div className="delete-modal">
                  <p>Deseja realmente excluir este lançamento?</p>
                  <button onClick={() => handleDelete(lancamentoIdToDelete)}>Sim</button>
                  <button onClick={cancelDelete}>Não</button>
                </div>
              )}
          </div>
        );
}
