import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../service/api';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export function AtualizarEmpresa() { 
    const navigate = useNavigate();
    
    const { id, userID } = useParams<{
        id: string;        
        userID: string;
      }>();   
    
    const [formData, setFormData] = useState({                
        nome_empresa: '',        
        fk_id_usuario: userID,
    });    

    useEffect(() => {
        // Carregar os dados da empresa a ser atualizada ao carregar a página
        const carregarEmpresa = async () => {
          try {
            const response = await api.get(`/empresa/${id}`);
            const dadosEmpresa = response.data;
            setFormData(dadosEmpresa);            
            
          } catch (error) {
            console.error('Erro ao carregar empresa:', error);
          }
        };
        carregarEmpresa();
    }, [id]);    
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await api.put(`/empresa/${id}`, formData);
    
          // Navegar de volta à página de MinhasEmpresas após a atualização bem-sucedida
        //   navigate(`/minhasempresas/${userID}`);
          navigate(-1);
        } catch (error) {
          console.error('Erro ao enviar atualização da empresa:', error);
        }
    };

    return (
      <div id="root">
      <Header />
      <main>        
       <div className="container">
            <h1>Atualizar empresa</h1>
            <form onSubmit={handleSubmit}>                               

                <label> Empresa  
                  <input
                    type="STRING" 
                    name="nome_empresa"
                    value={formData.nome_empresa}
                    onChange={handleChange}
                  /> 
                </label>
                
                <button type="submit">Atualizar</button>
            </form>
       </div>
       </main>
       <Footer />
      </div>
    ) 
}