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
import PlanoContas from '../components/PlanoContas';

export function InserirLancamentoEmpresa() { 
    const navigate = useNavigate();  // Obtenha o objeto de navegação
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

    // const { fk_id_empresa, userID } = useParams<{
    const { fk_id_empresa } = useParams<{
        fk_id_empresa: string;
        // userID: string;
      }>();
    
    // const [contaDebConsultada, setContaDebConsultada] = useState('');
    // const [contaCredConsultada, setContaCredConsultada] = useState('');
    const [contaDebConsultada, setContaDebConsultada] = useState<{ id: string, conta: string, grupo: string } | null>(null);
    const [contaCredConsultada, setContaCredConsultada] = useState<{ id: string, conta: string, grupo: string } | null>(null);

    const [formData, setFormData] = useState({
        fk_id_empresa,
        data: '',
        descricao: '',
        fk_id_conta_debito: '',
        fk_id_conta_credito: '',
        valor: '',
        // fk_id_usuario: userID,
      });

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
    
    // const handleContaDebitadaSelect = (id: string) => {
    //     setContaDebConsultada(id);        
    // };

    const handleContaDebitadaSelect = (id: string, conta: string, grupo: string) => {
      setContaDebConsultada({ id, conta, grupo });      
      // validarLancamento();
    };
    
    // const handleContaCreditadaSelect = (id: string) => {
    //     setContaCredConsultada(id);        
    // };
  
    const handleContaCreditadaSelect = (id: string, conta: string, grupo: string) => {
      setContaCredConsultada({ id, conta, grupo });      
      // validarLancamento();
    };
    
    // useEffect(() => {
    //     setFormData((prevData) => ({
    //       ...prevData,
    //       fk_id_conta_debito: contaDebConsultada,
    //       fk_id_conta_credito: contaCredConsultada,
    //     }));
    //   }, [contaDebConsultada, contaCredConsultada]);
    
    useEffect(() => {
      if (contaDebConsultada) {
        setFormData((prevData) => ({ 
          ...prevData, 
          fk_id_conta_debito: contaDebConsultada.id 
        }));
      }
      validarLancamento();
    }, [contaDebConsultada]);
    
    useEffect(() => {
      if (contaCredConsultada) {
        setFormData((prevData) => ({ 
          ...prevData, 
          fk_id_conta_credito: contaCredConsultada.id 
        }));
      }
      validarLancamento();
    }, [contaCredConsultada]);

    useEffect(() => {
      validarLancamento();
    }, [formData.valor]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); // Inicia o carregamento
        try {
          // Fazer a requisição POST para a API        
          // await api.post('/lancamento/:id', formData);
          await api.post(`/lancamento/${fk_id_empresa}`, formData);

          // Limpar o formulário após o sucesso    
          setFormData({
            fk_id_empresa: '',
            data: '',
            descricao: '',
            fk_id_conta_debito: '',
            fk_id_conta_credito: '',
            valor: '',
            // fk_id_usuario: '',
          });

            // Navegar para a página de lancamentosempresa após o sucesso            
            // navigate(`/lancamentosempresa/${fk_id_empresa}/${userID}`);
            navigate(`/lancamentosempresa/${fk_id_empresa}`);

        } catch (error) {
            console.error('Erro ao enviar lançamento:', error);
            // Adicionar lógica de tratamento de erro, se necessário
            
            // navigate('/');
            // return null; // Retorna null para parar a renderização
            
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
        } finally {
          setIsLoading(false); // Termina o carregamento
        }
    };
    
    return (
      <div id="root">
        <Header />
        <main>
          <div className="container">
            <h1>Novo Lançamento</h1>
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
                  <input style={{ maxWidth: 150, fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'}}
                    type="DATE" 
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                  /> 
                </label>

                <label> Valor: 
                  <input style={{ maxWidth: 150 }}
                    type="number"
                    name="valor"
                    value={formData.valor}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                        e.preventDefault();
                      }
                    }}
                  /> 
                </label>

                <label> Descrição: 
                  <textarea
                    // type="STRING" 
                    name="descricao"
                    placeholder='Ex: Compras de mercadoria a prazo conf. NF 123456.'
                    value={formData.descricao}
                    onChange={handleChange}
                    maxLength={100}
                  /> 
                </label>

                <label> 
                  <div style={{ flexDirection: "row"}}>
                  <span>Conta debitada: </span> 
                  <span className="tooltip-container">
                    <FontAwesomeIcon icon={faQuestionCircle} className="tooltip-icon" />
                    <span className="tooltip-text">
                      AUMENTA: Ativo, Despesas, Retificadoras do Passivo. <br></br> DIMINUI: Passivo, Receita, Retificadoras do Ativo. 
                  
                    {/* <input
                    type="number" 
                    name="fk_id_conta_debito"
                    value={formData.fk_id_conta_debito}
                    onChange={handleChange}
                    />  */}
                    </span>
                  </span>
                  </div>
                  <ListaContas onSelectConta={handleContaDebitadaSelect} />
                </label>
                {debitoMensagem && <div className="mensagem-validacao">{debitoMensagem}</div>}

                <label>  
                  <div style={{ flexDirection: "row"}}>
                  <span> Conta creditada: </span>
                  <span className="tooltip-container">
                    <FontAwesomeIcon icon={faQuestionCircle} className="tooltip-icon" />
                    <span className="tooltip-text">
                      AUMENTA: Passivo, Receita, Retificadoras do Ativo. <br></br> DIMINUI: Ativo, Despesa, Retificadoras do Passivo. 
                  {/* <input
                    type="number" 
                    name="fk_id_conta_credito"
                    value={formData.fk_id_conta_credito}
                    onChange={handleChange}
                  /> */}
                  </span>
                  </span>
                  </div>
                    <ListaContas onSelectConta={handleContaCreditadaSelect} /> 
                </label>                
                {creditoMensagem && <div className="mensagem-validacao">{creditoMensagem}</div>}
                
                {/* <label> Usuário: <input
                    type="number" 
                    name="fk_id_usuario"
                    value={formData.fk_id_usuario}
                    onChange={handleChange}
                /> </label> */}

                {/* <button type="button" onClick={validarLancamento}>Validar Lançamento</button> */}
                <button type="submit">Salvar</button>
              </form>
            )}
            <div className="pc-container">              
              <PlanoContas />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
}

