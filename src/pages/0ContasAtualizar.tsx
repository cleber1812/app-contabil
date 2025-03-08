import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../service/api';
import '../App.css';
import ClipLoader from "react-spinners/ClipLoader"; // Importe o ClipLoader

//Posso tirar essa interface lá do useState<FormData> que funciona também
interface FormData {
    fk_id_grupo: '',        
        conta: '',
        subgrupo: '',
        elemento: '',
        multiplicador: '',
        fk_id_usuario: '',
  }
  
export function AtualizarConta() { 
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
    const { id } = useParams();

    const [formData, setFormData] = useState<FormData>({
        fk_id_grupo: '',        
        conta: '',
        subgrupo: '',
        elemento: '',
        multiplicador: '',
        fk_id_usuario: '',
    });

    useEffect(() => {
        // Carregar os dados do lançamento a ser atualizado ao carregar a página
        const carregarConta = async () => {
          setIsLoading(true); // Inicia o carregamento
          
          try {
            const response = await api.get(`/conta/${id}`);
            const dadosConta = response.data;
            setFormData(dadosConta);            
            
          } catch (error) {
            console.error('Erro ao carregar conta:', error);
          }
        setIsLoading(false); // Termina o carregamento
        };
    
        carregarConta();
    }, [id]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setIsLoading(true); // Inicia o carregamento  
        
        try {          
          await api.put(`/conta/${id}`, formData);
    
          // Navegar de volta à página de lançamentos após a atualização bem-sucedida
          navigate('/planodecontas');
          
        } catch (error) {
            console.error('Erro ao enviar atualização de conta:', error);
            alert('Erro ao editar a conta contábil')
        }
        setIsLoading(false); // Termina o carregamento
    };

    return (        
       <div className="container">
            <h1>Atualizar Conta Contábil</h1>
            {isLoading ? (
              <div className="loader-container">
                <ClipLoader color={"#19647E"} loading={isLoading} size={150} />
                <p>Carregando...</p>
              </div>
            ) : (

              <>
                <form onSubmit={handleSubmit}>                
                    <label> Id do grupo: <input
                        type="number" 
                        name="fk_id_grupo"
                        value={formData.fk_id_grupo}
                        min={1}
                        onChange={handleChange}
                    /> </label>

                    <label> Subgrupo: <input
                        type="number" 
                        name="subgrupo"
                        value={formData.subgrupo}
                        min={1}
                        onChange={handleChange}
                    /> </label>

                    <label> Elemento: <input
                        type="number" 
                        name="elemento"
                        value={formData.elemento}
                        min={1}
                        onChange={handleChange}
                    /> </label>

                    <label> Conta contábil: <input
                        type="STRING" 
                        name="conta"
                        value={formData.conta}
                        onChange={handleChange}
                    /> </label>

                    <label> Multiplicador (1 ou -1):  <input
                        type="number" 
                        name="multiplicador"
                        value={formData.multiplicador}
                        max={1}
                        min={-1}
                        onChange={handleChange}
                    /> </label>

                    <label> Usuário: <input
                        type="number" 
                        name="fk_id_usuario"
                        value={formData.fk_id_usuario}
                        min={1}
                        onChange={handleChange}
                    /> </label>
                    
                    <button type="submit">Atualizar</button>
                </form>
              </>
            )}
       </div>
    ) 
}