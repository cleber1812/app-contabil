import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilSquare, faTrash } from '@fortawesome/free-solid-svg-icons'; // Exemplo de ícone
import api from '../service/api';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClipLoader from "react-spinners/ClipLoader"; // Importe o ClipLoader

async function fetchLancamentosEmpresa(fk_id_empresa: string) {
  try {
    const response = await api.get(`/lancamentosempresa/${fk_id_empresa}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar lançamentos');
  }
}

export function LancamentosEmpresa() { 
  const navigate = useNavigate();
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
    return (
      <div className="loader-container">
        <ClipLoader color={"#19647E"} loading={isLoading} size={150} />
        <p>Carregando...</p>
      </div>
    );
  }  
  if (isError) {
    // return <p>Ocorreu um erro ao buscar lançamentos.</p>;
    navigate('/');
    return null; // Retorna null para parar a renderização
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

  // Função para fechar o modal ao clicar fora dele
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      cancelDelete();
    }
  };

        return (
          <div id="root">
          <Header />
          <main>
          <div className="container">
            <h1>Lançamentos</h1>                
                {/* <Link to={`/inserirlancamentoempresa/${fk_id_empresa}/${userID}`}> */}
                <Link to={`/inserirlancamentoempresa/${fk_id_empresa}`}>
                  <button>Novo lançamento</button>
                </Link>
                {/* <Link to={`/minhasempresas/${userID}`}> */}
                <Link to={`/minhasempresas`}>
                  <button>Minhas Empresas/Relatórios</button>
                </Link>
                <div className="table-container">
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
                            {/* <td style={{ textAlign: 'right' }}>{lancamento.valor.toFixed(2)}</td> */}
                            <td style={{ textAlign: 'right' }}>{lancamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>                            
                            {/* <td>{lancamento.fk_id_usuario}</td>  */}
                            <td>
                              <div style={{ width: 150 }}>
                              {/* <Link to={`/atualizarlancamentoempresa/${lancamento.id}/${fk_id_empresa}/${userID}`}> */}
                              <Link to={`/atualizarlancamentoempresa/${lancamento.id}/${fk_id_empresa}`} title="Clique para editar lançamento">
                                <button className='editar'>
                                  <FontAwesomeIcon icon={faPencilSquare} />
                                  {/* Editar */}
                                </button>
                              </Link>                              
                              <button className="deletar" onClick={() => confirmDelete(lancamento.id)} title="Clique para excluir lançamento">
                                <FontAwesomeIcon icon={faTrash} />
                                {/* Excluir */}
                              </button>
                              </div>
                            </td>                           
                        </tr>      
                      ))}            
                    </tbody>
                  </table> 
                </div>
                               
                
              {/* Modal de confirmação de exclusão */}
              {lancamentoIdToDelete && (
                <div className="modal-container" onClick={handleOutsideClick}>
                  <div className="modal-content">
                    <p>Deseja realmente excluir este lançamento?</p>
                    <button onClick={() => handleDelete(lancamentoIdToDelete)}>Sim</button>
                    <button onClick={cancelDelete}>Não</button>
                  </div>
                </div>
              )}             
          </div>
          </main>
          <Footer />
          </div>
        );
}
