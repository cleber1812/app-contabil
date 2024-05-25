import { useQuery } from 'react-query';
import api from '../service/api';
import '../App.css';

async function fetchEmpresas() {
  try {
    const response = await api.get('/empresas');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar empresas');
  }
}

export function Empresas() {
  const { data: empresas, isLoading, isError } = useQuery('empresas', fetchEmpresas);

    if (isLoading) {
      return <div>Carregando...</div>;
    }

    if (isError) {
        return <p>Ocorreu um erro ao buscar usuários.</p>;
      }

      return (
        <div className="container">
          <h1>Empresas</h1>
          <tbody>
            {empresas.map((empresa: any) => (
              <tr key={empresa.id}>
                <td>{empresa.id}</td>
                <td>{empresa.nome_empresa}</td>
                <td>{empresa.fk_id_usuario}</td>
              </tr>              
            ))}
          </tbody>
        </div>
      );
    }
    
