//MeusDados.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../service/api';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClipLoader from "react-spinners/ClipLoader"; // Importe o ClipLoader

export function MeusDados() { 
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar o carregamento do submit
    const { userID } = useParams<{ userID: string }>();   
    
    const [formData, setFormData] = useState({
        id: userID,
        nome: '',
        email: '',
    });    

    const [formData2, setFormData2] = useState({
        id: userID,
        senhaAtual: '', 
        novaSenha: '', 
    }); 

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Carregar os dados do usuário a ser atualizada ao carregar a página
        const carregarUsuario = async () => {
          setIsLoading(true); // Inicia o carregamento
          try {
            const response = await api.get(`/meusdados`);
            const dadosUsuario = response.data;
            setFormData(dadosUsuario);
            
          } catch (error) {
            // console.error('Erro ao carregar usuário:', error);
            setErrorMessage('Erro ao carregar dados do usuário.');
          } finally {
            setIsLoading(false); // Termina o carregamento
          }
        };
        carregarUsuario();
    }, [userID]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // setIsLoading(true); // Inicia o carregamento
        setIsSubmitting(true);
        try {
          await api.put(`/usuario`, formData);
          setSuccessMessage('Dados atualizados com sucesso.');
    
          // Navegar de volta à página de MinhasEmpresas após a atualização bem-sucedida
        //   navigate(`/minhasempresas/${userID}`);
        //   navigate(`/minhasempresas`);
          navigate(-1);
        } catch (error) {
        //   console.error('Erro ao enviar atualização de usuário:', error);
          setErrorMessage('Erro ao enviar atualização de usuário.');
          // navigate('/');
          // return null; // Retorna null para parar a renderização

        //   alert('Erro ao atualizar usuário'); 
          navigate(0);

        } finally {
        //   setIsLoading(false); // Termina o carregamento
          setIsSubmitting(false);
        }
    };

    const handleChangeSenha = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData2((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmitSenha = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
          await api.put(`/alterarsenha`, formData2);
        //   alert('Senha alterada com sucesso');
          setSuccessMessage('Senha alterada com sucesso.');
          navigate(`/minhasempresas`);
        
        } catch (error) {
          console.error('Erro ao alterar senha:', error);
        //   alert('Erro ao alterar senha do usuário');
          setErrorMessage('Erro ao alterar senha.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
      <div id="root">
      <Header />
      <main>        
        <div className="container">
          <h1>Meus Dados</h1>
            {isLoading ? (
              <div className="loader-container">
                <ClipLoader color={"#19647E"} loading={isLoading} size={150} />
                <p>Carregando...</p>
              </div>
            ) : (

              <>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            
                <form 
                  style={{borderColor: '#ddf1f8', backgroundColor: '#d4dfc7' }}
                  onSubmit={handleSubmit}>
                    
                    <label> Nome  
                    <input
                        type="STRING" 
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    /> 
                    </label>

                    <label> Email  
                    <input
                        type="STRING" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    /> 
                    </label>
                    {/* <button type="submit">Atualizar */}
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Atualizando...' : 'Atualizar'}
                    </button>
                </form>                  
                
                <form className='form-dados'
                  onSubmit={handleSubmitSenha}
                  
                  // style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems:'center', borderColor: '#ddf1f8', backgroundColor: '#d4dfc7' }}
                >
                    <label style={{marginRight: 10 }}> Senha Atual
                    <input
                        type="Password"
                        name="senhaAtual"
                        placeholder='********'
                        value={formData2.senhaAtual}
                        onChange={handleChangeSenha}
                        disabled={isSubmitting}
                        /> 
                    </label>                         

                    <label> Nova Senha  
                    <input
                        type="Password"
                        name="novaSenha"
                        placeholder='********'
                        value={formData2.novaSenha}
                        onChange={handleChangeSenha}
                        disabled={isSubmitting}
                        /> 
                    </label>
                    
                    {/* <button type="submit">Alterar senha */}
                    <button 
                      type="submit" disabled={isSubmitting}
                      style={{padding: 2, height: 30}}
                    >
                      {isSubmitting ? 'Alterando...' : 'Alterar senha'}
                    </button>
                </form>
              </>
            )}
        </div>
      </main>
      <Footer />
      </div>
    ) 
}