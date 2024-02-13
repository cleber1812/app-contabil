import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import api from '../service/api';
import CriarEmpresaModal from '../components/CriarEmpresaModal';

async function fetchEmpresas(userID: string) {
  try {
    const response = await api.get(`/dashboard/${userID}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar as empresas do usuário');
  }
}

export function EmpresasUsuario() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { userID } = useParams<{ userID: string }>();
  // const { data: empresas, isLoading, isError } = useQuery('empresas', () => fetchEmpresas(userID ?? '2'));
  const { data: empresas, isLoading, isError, refetch } = useQuery('empresas', () => fetchEmpresas(userID ?? '2'), {
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <p>Ocorreu um erro ao buscar empresas.</p>;
  }

  //Função para criar uma empresa direto na página de listagem de empresas através do modal
  const handleCreateEmpresa  = async (formData: any) => {    
    try {   
      // Chame a API para criar a empresa usando os dados do formulário   
      await api.post('/empresa', {
        fk_id_usuario: userID,
        ...formData,
      });
      // Refetch os dados da lista de empresas após a criação
      refetch();

    } catch (error) {
        console.error('Erro ao cadastrar empresa:', error);
        // Adicionar lógica de tratamento de erro, se necessário
      }
  };

  return (
    <div className="container">
      <h1>Minhas empresas</h1>
        <button onClick={openModal}>Criar nova empresa</button>
        {/* <Link to={`/criarempresa/${userID}`}>
          <button>Criar nova empresa</button>
        </Link> */}
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Empresa</th>
            <th>Usuario</th>
            <th>Entrar</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa: any) => (
            <tr key={empresa.id}>
              <td>{empresa.id}</td>
              <td>{empresa.nome_empresa}</td>
              <td>{empresa.fk_id_usuario}</td>
              <td>
                <Link to={`/lancamentosempresa/${empresa.id}/${userID}`}>
                  <button>Lançamentos</button>
                </Link>
                <Link to={`/diarioempresa/${empresa.id}`}>
                  <button>Diario</button>
                </Link>
                <Link to={`/razaoempresa/${empresa.id}`}>
                  <button>Razão</button>
                </Link>
                <Link to={`/balancoempresa/${empresa.id}`}>
                  <button>Balanço</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <CriarEmpresaModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onCreate={handleCreateEmpresa} 
      />
    </div>
  );
}
