import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../service/api';
import '../App.css';


async function fetchLancamentosEmpresa(fk_id_empresa: string) {
  try {
    const response = await api.get(`/lancamentosempresa/${fk_id_empresa}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar lançamentos');
  }
}

export function LancamentosEmpresa() { 
    
// const { fk_id_empresa } = useParams<{ fk_id_empresa: string }>();
// const { data: lancamentos, isLoading, isError } = useQuery('lancamentos', fetchLancamentos);  
  // const { fk_id_empresa, userID } = useParams<{
    const { fk_id_empresa } = useParams<{
    fk_id_empresa: string;
    // userID: string;
  }>();
  
  // const { data: lancamentos, isLoading, isError } = useQuery('lancamentos', () => fetchLancamentosEmpresa(fk_id_empresa ?? '2'));
  const { data: lancamentos, isLoading, isError, refetch } = useQuery('lancamentos', () => fetchLancamentosEmpresa(fk_id_empresa ?? '2'), {
    refetchOnWindowFocus: true,
  });

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
                {/* <Link to={`/inserirlancamentoempresa/${fk_id_empresa}/${userID}`}> */}
                <Link to={`/inserirlancamentoempresa/${fk_id_empresa}`}>
                  <button>Inserir lançamento na empresa</button>
                </Link>
                {/* <Link to={`/minhasempresas/${userID}`}> */}
                <Link to={`/minhasempresas`}>
                  <button>Voltar</button>
                </Link>                
                <table className="custom-table">
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            {/* <th>Empresa</th> */}
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Conta Débito</th>
                            <th>Conta Crédito</th>
                            <th>Valor</th>
                            {/* <th>Usuário</th>    */}
                            <th>Ações</th>                         
                        </tr>
                    </thead>
                    <tbody>                      
                      {lancamentos.map((lancamento: any) => (
                        <tr key={lancamento.id}>
                            {/* <td>{lancamento.id}</td> */}
                            {/* <td>{lancamento.fk_id_empresa}</td> */}
                            <td>{lancamento.data}</td>
                            <td>{lancamento.descricao}</td>
                            <td>
                              {/* {lancamento.fk_id_conta_debito} */}
                              {lancamento.contaDebito}                            
                            </td>
                            <td>
                              {/* {lancamento.fk_id_conta_credito} */}
                              {lancamento.contaCredito}
                            </td>
                            <td style={{ textAlign: 'right' }}>{lancamento.valor.toFixed(2)}</td>
                            {/* <td>{lancamento.fk_id_usuario}</td>  */}
                            <td>
                              {/* <Link to={`/atualizarlancamentoempresa/${lancamento.id}/${fk_id_empresa}/${userID}`}> */}
                              <Link to={`/atualizarlancamentoempresa/${lancamento.id}/${fk_id_empresa}`}>
                                <button>Editar</button>
                              </Link>                              
                              <button className="button-deletar" onClick={() => confirmDelete(lancamento.id)}>Excluir</button>
                            </td>                           
                        </tr>      
                      ))}            
                    </tbody>
                </table> 
                               
                
              {/* Modal de confirmação de exclusão */}
              {lancamentoIdToDelete && (
                <div className="modal-container">
                  <p>Deseja realmente excluir este lançamento?</p>
                  <button onClick={() => handleDelete(lancamentoIdToDelete)}>Sim</button>
                  <button onClick={cancelDelete}>Não</button>
                </div>
              )}             
          </div>
        );
}
