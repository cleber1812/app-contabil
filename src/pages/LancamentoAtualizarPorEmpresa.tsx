import React, { useState, useEffect } from 'react';
import api from '../service/api';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'; // Exemplo de ícone
import ListaContas from '../components/ListaContasID'; // Certifique-se de fornecer o caminho correto para o componente ListaContas
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClipLoader from "react-spinners/ClipLoader"; // Importe o ClipLoader
import axios from 'axios'

// //Posso tirar essa interface lá do useState<FormData> que funciona também
// interface FormData {
//     fk_id_empresa: string;
//     data: string;
//     descricao: string;
//     fk_id_conta_debito: string;
//     fk_id_conta_credito: string;
//     valor: string;
//     fk_id_usuario: string;
//   }
  
export function AtualizarLancamentoEmpresa() { 
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
    
    // const { id, fk_id_empresa, userID } = useParams<{
    const { id, fk_id_empresa } = useParams<{
        id: string;
        fk_id_empresa: string;
        // userID: string;
      }>();   

    // const [formData, setFormData] = useState<FormData>({
    const [formData, setFormData] = useState({        
        fk_id_empresa: fk_id_empresa,
        data: '',
        descricao: '',
        fk_id_conta_debito: '',
        fk_id_conta_credito: '',
        valor: '',
        // fk_id_usuario: userID,
    });

     //Para ListaContasID
    //  const [contaDebConsultada, setContaDebConsultada] = useState('');
    //  const [contaCredConsultada, setContaCredConsultada] = useState('');    
    const [contaDebConsultada, setContaDebConsultada] = useState<{ id: string, conta: string, grupo: string } | null>(null);
    const [contaCredConsultada, setContaCredConsultada] = useState<{ id: string, conta: string, grupo: string } | null>(null);

    const [debitoMensagem, setDebitoMensagem] = useState<string>('');
    const [creditoMensagem, setCreditoMensagem] = useState<string>('');

    const validarLancamento = () => {      
      let debitoMensagem = '';
      let creditoMensagem = '';

      if (contaDebConsultada && (contaDebConsultada.grupo === 'ATIVO' || contaDebConsultada.grupo === 'DESPESA' || contaDebConsultada.grupo === 'RETIFICADORA DO PASSIVO')) {
        debitoMensagem = `A conta Debitada (${contaDebConsultada.conta}) é do grupo ${contaDebConsultada.grupo} e aumentará o saldo em R$ ${formData.valor}.\n`;
      } else if (contaDebConsultada) {
        debitoMensagem = `A conta Debitada (${contaDebConsultada.conta}) é do grupo ${contaDebConsultada.grupo} e diminuirá o saldo em R$ ${formData.valor}.\n`;
      }
  
      if (contaCredConsultada && (contaCredConsultada.grupo === 'PASSIVO' || contaCredConsultada.grupo === 'RECEITA' || contaCredConsultada.grupo === 'RETIFICADORA DO ATIVO')) {
        creditoMensagem= `A conta Creditada (${contaCredConsultada.conta}) é do grupo ${contaCredConsultada.grupo} e aumentará o saldo em R$ ${formData.valor}.\n`;
      } else if (contaCredConsultada) {
        creditoMensagem= `A conta Creditada (${contaCredConsultada.conta}) é do grupo ${contaCredConsultada.grupo} e diminuirá o saldo em R$ ${formData.valor}.\n`;
      }
  
      setDebitoMensagem(debitoMensagem);
      setCreditoMensagem(creditoMensagem);
    };

    //Para ListaContasID
    // const handleContaDebitadaSelect = (id: string) => {
    //   setContaDebConsultada(id);        
    // };

    const handleContaDebitadaSelect = (id: string, conta: string, grupo: string) => {
      setContaDebConsultada({ id, conta, grupo });      
      validarLancamento();
    };

    // const handleContaCreditadaSelect = (id: string) => {
    //   setContaCredConsultada(id);        
    // };

    const handleContaCreditadaSelect = (id: string, conta: string, grupo: string) => {
      setContaCredConsultada({ id, conta, grupo });      
      validarLancamento();
    };
    
     //Para mostrar a conta antiga no SPAN
     const [nomeDaContaDebitoAtual, setNomeDaContaDebitoAtual] = useState<string>('');
     const [nomeDaContaCreditoAtual, setNomeDaContaCreditoAtual] = useState<string>('');

     const obterNomeDaContaPorId = async (id: string) => {
      try {
        const response = await api.get(`/conta/${id}`);
        return response.data.conta; // Substitua "nomeDaConta" pelo nome real do campo na sua resposta da API
      } catch (error) {
        console.error('Erro ao obter nome da conta:', error);
        // return '';
        navigate('/');
        return null; // Retorna null para parar a renderização
      }
    };
       

    useEffect(() => {
        // Carregar os dados do lançamento a ser atualizado ao carregar a página
        const carregarLancamento = async () => {
          setIsLoading(true); // Inicia o carregamento
          try {
            const response = await api.get(`/lancamento/${id}`);
            const dadosLancamento = response.data;
            setFormData(dadosLancamento);

            // Definir os nomes das contas atuais
            // setNomeDaContaDebitoAtual(dadosLancamento.fk_id_conta_debito);
            // setNomeDaContaCreditoAtual(dadosLancamento.fk_id_conta_credito);            
            setNomeDaContaDebitoAtual(await obterNomeDaContaPorId(dadosLancamento.fk_id_conta_debito));
            setNomeDaContaCreditoAtual(await obterNomeDaContaPorId(dadosLancamento.fk_id_conta_credito));
            
          } catch (error) {
            console.error('Erro ao carregar lançamento:', error);
            // navigate('/');
            return null; // Retorna null para parar a renderização
          } finally {
            setIsLoading(false); // Termina o carregamento
          }
        };
        carregarLancamento();
    }, [id]);

    //Para ListaContasID
    // useEffect(() => {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     fk_id_conta_debito: String(contaDebConsultada),
    //   }));
    // }, [contaDebConsultada]);
    
    // useEffect(() => {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     fk_id_conta_credito: String(contaCredConsultada),
    //   }));
    // }, [contaCredConsultada]);

    useEffect(() => {
      if (contaDebConsultada) {
        setFormData((prevData) => ({ 
          ...prevData, 
          fk_id_conta_debito: contaDebConsultada.id 
        }));
      }
      if (contaCredConsultada) {
        setFormData((prevData) => ({ 
          ...prevData, 
          fk_id_conta_credito: contaCredConsultada.id 
        }));
      }
    }, [contaDebConsultada, contaCredConsultada]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); // Inicia o carregamento
        try {
          await api.put(`/lancamento/${id}`, formData);
    
          // Navegar de volta à página de lançamentos após a atualização bem-sucedida
        //   navigate('/lancamentos');
          navigate(-1);
        } catch (error) {
          console.error('Erro ao enviar atualização de lançamento:', error);
          // navigate('/');
          // return null; // Retorna null para parar a renderização

          // alert('Erro ao enviar lançamento');
          // navigate(0);

          // Verificar se o error possui uma resposta do servidor
          if (axios.isAxiosError(error) && error.response) {
            // Acessar a mensagem de erro detalhada do backend
            const errorMessage = error.response.data.error || 'Erro desconhecido';
            alert(`Erro ao enviar lançamento: ${errorMessage}`);
          } else if (error instanceof Error) {
            alert(`Erro ao enviar lançamento: ${error.message}`);
          } else {
            alert('Erro ao enviar lançamento: Erro desconhecido');
          }  
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
          <h1>Atualizar Lançamento</h1>
            {isLoading ? (
              <div className="loader-container">
                <ClipLoader color={"#19647E"} loading={isLoading} size={150} />
                <p>Carregando...</p>
              </div>
            ) : (
            <form onSubmit={handleSubmit}>                
                {/* <label> Empresa: <input
                    type="number" 
                    name="fk_id_empresa"
                    value={formData.fk_id_empresa}
                    onChange={handleChange}
                /> </label> */}

                <label> Data: 
                  <input style={{ maxWidth: 300 }}
                    type="DATE" 
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                  /> 
                </label>

                <label> Valor: 
                  <input style={{ maxWidth: 300 }}
                    type="number" 
                    name="valor"
                    value={formData.valor}
                    onChange={handleChange}
                  /> 
                </label>

                <label> Descrição: 
                  <textarea
                    // type="STRING" 
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    maxLength={100}
                  /> 
                </label>

                <label> 
                  {/* Conta debitada:  */}
                  {/* <input
                    type="number" 
                    name="fk_id_conta_debito"
                    value={formData.fk_id_conta_debito}
                    onChange={handleChange}
                  />  */}  
                  <span>Conta Débito Atual: </span>   
                  <span style={{ color: "#19647E" }}>{nomeDaContaDebitoAtual}</span> 
                  <span className="tooltip-container">
                    <FontAwesomeIcon icon={faQuestionCircle} className="tooltip-icon" />
                    <span className="tooltip-text">
                      AUMENTA: Ativo, Despesas, Retificadoras do Passivo. <br></br> DIMINUI: Passivo, Receita, Retificadoras do Ativo.                   
                    </span>
                  </span>
                  <ListaContas onSelectConta={handleContaDebitadaSelect} />
                </label>
                {debitoMensagem && <div className="mensagem-validacao">{debitoMensagem}</div>}

                <label> 
                  {/* Conta creditada:  */}
                  {/* <input
                    type="number" 
                    name="fk_id_conta_credito"
                    value={formData.fk_id_conta_credito}
                    onChange={handleChange}
                  />  */}     
                  <span>Conta Crédito Atual: </span>             
                  <span style={{ color: "#19647E" }}>{nomeDaContaCreditoAtual}</span>
                  <span className="tooltip-container">
                    <FontAwesomeIcon icon={faQuestionCircle} className="tooltip-icon" />
                    <span className="tooltip-text">
                      AUMENTA: Passivo, Receita, Retificadoras do Ativo. <br></br> DIMINUI: Ativo, Despesa, Retificadoras do Passivo.                   
                  </span>
                  </span>
                  <ListaContas onSelectConta={handleContaCreditadaSelect} />                  
                </label>
                {creditoMensagem && <div className="mensagem-validacao">{creditoMensagem}</div>}
               
                {/* <label> Usuário: <input
                    type="number" 
                    name="fk_id_usuario"
                    value={formData.fk_id_usuario}
                    onChange={handleChange}
                /> </label> */}
                
                <button type="submit">Atualizar</button>
            </form>
            )}
       </div>
       </main>
       <Footer />
       </div>
    ) 
}