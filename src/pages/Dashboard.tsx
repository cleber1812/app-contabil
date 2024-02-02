import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import api from '../service/api';

async function fetchEmpresas(id: string) {
  try {
    const response = await api.get(`/dashboard/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar as empresas do usuário');
  }
}

export function Dashboard() {
  const { id } = useParams<{ id: string }>();
  const { data: empresas, isLoading, isError } = useQuery('empresas', () => fetchEmpresas(id ?? '2'));

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <p>Ocorreu um erro ao buscar empresas.</p>;
  }

  return (
    <div className="container">
      <h1>Minhas empresas</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Empresa</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa: any) => (
            <tr key={empresa.id}>
              <td>{empresa.id}</td>
              <td>{empresa.nome_empresa}</td>
              <td>{empresa.fk_id_usuario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
