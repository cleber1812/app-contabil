import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../service/api';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClipLoader from "react-spinners/ClipLoader"; // Importe o ClipLoader

export function AtualizarEmpresa() { 
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
    
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
          setIsLoading(true); // Inicia o carregamento
          try {
            const response = await api.get(`/empresa/${id}`);
            const dadosEmpresa = response.data;
            setFormData(dadosEmpresa);            
            
          } catch (error) {
            console.error('Erro ao carregar empresa:', error);
          } finally {
            setIsLoading(false); // Termina o carregamento
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
        setIsLoading(true); // Inicia o carregamento
        try {
          await api.put(`/empresa/${id}`, formData);
    
          // Navegar de volta à página de MinhasEmpresas após a atualização bem-sucedida
        //   navigate(`/minhasempresas/${userID}`);
          navigate(-1);
        } catch (error) {
          console.error('Erro ao enviar atualização da empresa:', error);
          // navigate('/');
          // return null; // Retorna null para parar a renderização

          alert('Erro ao atualizar empresa'); 
          navigate(0);

        } finally {
          setIsLoading(false); // Termina o carregamento
        }
    };

    return (
      <div id="root">
      <Header />
      <main>        
        <div className="container">
          <h1>Atualizar empresa</h1>
            {isLoading ? (
              <div className="loader-container">
                <ClipLoader color={"#19647E"} loading={isLoading} size={150} />
                <p>Carregando...</p>
              </div>
            ) : (
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
            )}
        </div>
      </main>
      <Footer />
      </div>
    ) 
}