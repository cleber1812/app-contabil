//import axios from 'axios';
import { useQuery } from 'react-query';
import api from '../service/api';
import '../App.css';

async function fetchLancamentos() {
  try {
    const response = await api.get('/lancamentos');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar lançamentos');
  }
}

export function Lancamentos() {
  const { data: lancamentos, isLoading, isError } = useQuery('lancamentos', fetchLancamentos);

// export function Lancamentos() { 
//     const { data, isLoading, isError } = useQuery('lancamentos', () => {
//         return axios
//           .get(`${api}/lancamentos`)
//           //.get('http://localhost:3000/usuarios')
//           .then((response) => response.data);
//       });
  
      if (isLoading) {
        return <div>Carregando...</div>;
      }
  
      if (isError) {
          return <p>Ocorreu um erro ao buscar usuários.</p>;
        }
  
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
                        </tr>
                    </thead>
                    <tbody>
                      {/* {data.map((lancamento: any) => ( */}
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
