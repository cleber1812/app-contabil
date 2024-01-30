import { useQuery } from 'react-query';
//import axios from 'axios';
import api from '../service/api';
import '../App.css'

async function fetchUsuarios() {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar usuários');
  }
}

export function Usuario() {
  const { data: usuarios, isLoading, isError } = useQuery('usuarios', fetchUsuarios);

// export function Usuario() {
//     const { data, isLoading, isError } = useQuery('usuarios', () => {
//       return axios
//         .get(`${api}/usuarios`)
//         //.get('http://localhost:3000/usuarios')        
//         .then((response) => response.data);
//     });

    if (isLoading) {
      return <div>Carregando...</div>;
    }

    if (isError) {
        return <p>Ocorreu um erro ao buscar usuários.</p>;
      }

      return (
        <div className="container">
          <h1>Usuários</h1>
          <ul>
            {usuarios.map((usuario: any) => (
              <li key={usuario.id}>{usuario.nome} ({usuario.email})</li>              
            ))}
          </ul>
        </div>
      );
    }
    
    // export default Usuario;


//     export function Usuario(){
//     return <h1>Usuários</h1>
// }