import { useState } from 'react';
import { useQuery } from 'react-query';
// import { useParams, Link } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import api from '../service/api';
import CriarEmpresaModal from '../components/CriarEmpresaModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faPencilSquare, faTrash, faListAlt, faBook, faCalendar, faBalanceScale, faLineChart } from '@fortawesome/free-solid-svg-icons'; // Exemplo de ícone

// async function fetchEmpresas(userID: string) {
async function fetchEmpresas() {
  try {
    // const response = await api.get(`/dashboard/${userID}`);
    const response = await api.get('/dashboard')
    // console.log(response.data);    
    return response.data;     
  } catch (error) {
    throw new Error('Erro ao buscar as empresas do usuário');
  }
}

export function EmpresasUsuario() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // const { userID } = useParams<{ userID: string }>();
  
  // const { data: empresas, isLoading, isError } = useQuery('empresas', () => fetchEmpresas(userID ?? '2'));
  // const { data: empresas, isLoading, isError, refetch } = useQuery('empresas', () => fetchEmpresas(userID ?? '2'), {
  const { data: empresas, isLoading, isError, refetch } = useQuery('empresas', () => fetchEmpresas(), {  
      refetchOnWindowFocus: true,
  });

  // Adiciona estado para armazenar o ID do lançamento a ser excluído
  const [empresaIdToDelete, setEmpresaIdToDelete] = useState<number | null>(null);

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
      await api.post('/empresa2', {
        // fk_id_usuario: userID,        
        ...formData,
      });
      // Refetch os dados da lista de empresas após a criação
      refetch();

    } catch (error) {
        console.error('Erro ao cadastrar empresa:', error);
        // Adicionar lógica de tratamento de erro, se necessário
      }
  };

  // Função para configurar o ID do lançamento a ser excluído
  const confirmDelete = (id: number) => {
    setEmpresaIdToDelete(id);
  };
  
  // Função para cancelar a exclusão
  const cancelDelete = () => {
    setEmpresaIdToDelete(null);
  };

  // Função para excluir o lançamento
  const handleDelete = async (empresaId: number) => {
    try {
      await api.delete(`/empresa2/${empresaId}`);
      // Refetch dos dados após a exclusão
      refetch();
      // Atualiza a lista de empresas após a exclusão
      setEmpresaIdToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir empresa:', error);
    }
  };

  // Função para logOut
  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Minhas empresas</h1>
        <button onClick={openModal}>Criar nova empresa</button>
        {/* <Link to={`/criarempresa/${userID}`}>
          <button>Criar nova empresa</button>
        </Link> */}
        <button onClick={logOut}>Sair
        <FontAwesomeIcon icon={faSignOut} transform="right-5" />
        </button>
      <table className="custom-table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Empresa</th>
            {/* <th>Usuario</th> */}
            <th>Ações</th>
            <th>Relatórios</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa: any) => (
            <tr key={empresa.id}>
              {/* <td>{empresa.id}</td> */}
              <td>{empresa.nome_empresa}</td>
              {/* <td>{empresa.fk_id_usuario}</td> */}
              <td>
                {/* <Link to={`/atualizarempresa/${empresa.id}/${userID}`}> */}
                <Link to={`/atualizarempresa/${empresa.id}/`}>
                <button title="Clique para editar empresa">
                  <FontAwesomeIcon icon={faPencilSquare} />
                  {/* Editar*/}
                </button>
                </Link>                              
                <button className="button-deletar" onClick={() => confirmDelete(empresa.id)} title="Clique para excluir empresa">
                  <FontAwesomeIcon icon={faTrash} />
                  {/* Excluir */}
                </button>
              </td>
              <td>
                {/* <Link to={`/lancamentosempresa/${empresa.id}/${userID}`}> */}
                <Link to={`/lancamentosempresa/${empresa.id}`}>
                  <button>
                    <FontAwesomeIcon icon={faListAlt} transform="left-5" />
                    Lançamentos
                  </button>
                </Link>
                <Link to={`/diarioempresa/${empresa.id}`}>
                  <button>
                    <FontAwesomeIcon icon={faCalendar} transform="left-5" />
                    Diario
                  </button>
                </Link>
                <Link to={`/razaoempresa/${empresa.id}`}>
                  <button>
                    <FontAwesomeIcon icon={faBook} transform="left-5" />
                    Razão
                  </button>
                </Link>
                <Link to={`/balancoempresa/${empresa.id}`}>
                  <button>
                    <FontAwesomeIcon icon={faBalanceScale} transform="left-5" />
                    Balanço
                  </button>
                </Link>
                <Link to={`/dreempresa/${empresa.id}`}>
                  <button>
                    <FontAwesomeIcon icon={faLineChart} transform="left-5" />
                    DRE
                  </button>
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

      {/* Modal de confirmação de exclusão */}
      {empresaIdToDelete && (
                <div className="modal-container">
                  <p>Deseja realmente excluir esta empresa?</p>
                  <button onClick={() => handleDelete(empresaIdToDelete)}>Sim</button>
                  <button onClick={cancelDelete}>Não</button>
                </div>
              )} 
    </div>
  );
}
