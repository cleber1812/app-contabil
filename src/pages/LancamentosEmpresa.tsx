import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../service/api';
import '../App.css';
import '../styles/modal.css'// Importa os estilos do modal

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
  
  const { fk_id_empresa } = useParams<{ fk_id_empresa: string }>();
//   const { data: lancamentos, isLoading, isError } = useQuery('lancamentos', fetchLancamentos);  
  const { data: lancamentos, isLoading, isError } = useQuery('lancamentos', () => fetchLancamentosEmpresa(fk_id_empresa ?? '2'));

    if (isLoading) {
        return <div>Carregando...</div>;
    }  
    if (isError) {
        return <p>Ocorreu um erro ao buscar lançamentos.</p>;
    }

        return (
          <div>
            <h1>Lançamentos</h1>
                <button type="button" onClick={() => navigate('/inserirlancamentoempresa')}>
                    Inserir lançamento na empresa
                </button>
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
                        </tr>      
                      ))}            
                    </tbody>
                </table>              
          </div>
        );
}
