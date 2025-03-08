import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import '../App.css';
import ClipLoader from "react-spinners/ClipLoader"; // Importe o ClipLoader


async function fetchPlanoDeContas() {
  try {
    const response = await api.get('/planocontas');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar plano de contas');
  }  
}

export function PlanoDeContas() {
  const navigate = useNavigate();  // Obtenha o objeto de navegação
  const { data: planocontas, isLoading, isError } = useQuery('planocontas', fetchPlanoDeContas);

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

  const handleEditar = async(id: any) =>{
    try{
      // await api.get(`/conta/${id}`);      
      navigate(`/atualizarconta/${id}`);          
    } catch (error) {
        console.error('Erro ao editar conta:', error);        
    }    
  }

  const handleDeletar = async(id: any) => {
    try{     
      const data = await api.delete(`/conta/${id}`)
      await api.delete(`/conta/${id}`);
        
      if(data.status === 200){
            alert('conta deletado com sucesso')
            navigate('/planodecontas'); // Altere para a rota desejada após a exclusão.
      }      
      }catch(e){
          alert('Erro ao deletar conta')
      }
    
  }

      return (
        <div className="container">
          <h1>Plano de Contas</h1>
          <table className="custom-pc">
            <thead>
                <tr>
                    <td>id</td>
                    <td>subgrupo</td>
                    <td>elemento</td>
                    <td>conta</td>
                    <td>grupo_principal</td>
                    <td>nome_grupo_principal</td>
                    <td>grupo</td>
                    <td>nome_grupo</td>
                </tr>
            </thead>
          <tbody>
            {planocontas.map((planoconta: any) => (
              <tr key={planoconta.id}>
                <td>{planoconta.id}</td>
                <td>{planoconta.subgrupo}</td>
                <td>{planoconta.elemento}</td>
                <td>{planoconta.conta}</td>
                <td>{planoconta.grupo_principal}</td>
                <td>{planoconta.nome_grupo_principal}</td>
                <td>{planoconta.grupo}</td>
                <td>{planoconta.nome_grupo}</td>                
                <td><button onClick={() => handleEditar(planoconta.id)}>Editar</button></td>
                <td><button onClick={() => handleDeletar(planoconta.id)}>Excluir</button></td>
              </tr>              
            ))}
          </tbody>
          </table>
        </div>
      );
    }
    
