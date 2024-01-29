import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import api from '../service/api';
//import '../App.css'

// const Usuario: React.FC = () => {
//     const { data: users, isLoading } = useQuery('users', async () => {
//       const response = await fetch('/api/usuarios');
//       const data = await response.json();
//       return data;
//     });

// async function fetchUsuarios() {
//   try {
//     const response = await axios.get('http://localhost:3000/usuarios');
//     return response.data;
//   } catch (error) {
//     throw new Error('Erro ao buscar usuários');
//   }
// }

export function Usuario() {
    const { data, isLoading, isError } = useQuery('usuarios', () => {
      return axios
        .get(`${api}/usuarios`)
        //.get('http://localhost:3000/usuarios')
        .then((response) => response.data);
    });

    if (isLoading) {
      return <div>Carregando...</div>;
    }

    if (isError) {
        return <p>Ocorreu um erro ao buscar usuários</p>;
      }

      return (
        <div>
          <h1>Usuários</h1>
          <ul>
            {data.map((usuario: any) => (
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