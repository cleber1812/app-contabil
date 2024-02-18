import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../service/api';
import ListaContasID from '../components/ListaContasID'; // Certifique-se de fornecer o caminho correto para o componente ListaContas
import '../App.css';

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
    
    const { id, fk_id_empresa, userID } = useParams<{
        id: string;
        fk_id_empresa: string;
        userID: string;
      }>();   

    // const [formData, setFormData] = useState<FormData>({
    const [formData, setFormData] = useState({
        fk_id_empresa,
        data: '',
        descricao: '',
        fk_id_conta_debito: '',
        fk_id_conta_credito: '',
        valor: '',
        fk_id_usuario: userID,
    });

     //Para ListaContasID
     const [contaDebConsultada, setContaDebConsultada] = useState('');
     const [contaCredConsultada, setContaCredConsultada] = useState('');    

    //Para ListaContasID
    const handleContaDebitadaSelect = (id: string) => {
      setContaDebConsultada(id);        
    };
    
    const handleContaCreditadaSelect = (id: string) => {
      setContaCredConsultada(id);        
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
        return '';
      }
    };
       

    useEffect(() => {
        // Carregar os dados do lançamento a ser atualizado ao carregar a página
        const carregarLancamento = async () => {
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
          }
        };
        carregarLancamento();
    }, [id]);

    //Para ListaContasID
    useEffect(() => {
      setFormData((prevData) => ({
        ...prevData,
        fk_id_conta_debito: String(contaDebConsultada),
      }));
    }, [contaDebConsultada]);
    
    useEffect(() => {
      setFormData((prevData) => ({
        ...prevData,
        fk_id_conta_credito: String(contaCredConsultada),
      }));
    }, [contaCredConsultada]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await api.put(`/lancamento/${id}`, formData);
    
          // Navegar de volta à página de lançamentos após a atualização bem-sucedida
        //   navigate('/lancamentos');
          navigate(-1);
        } catch (error) {
          console.error('Erro ao enviar atualização de lançamento:', error);
        }
    };

    return (        
       <div className="container">
            <h1>Atualizar Lançamento</h1>
            <form onSubmit={handleSubmit}>                
                {/* <label> Empresa: <input
                    type="number" 
                    name="fk_id_empresa"
                    value={formData.fk_id_empresa}
                    onChange={handleChange}
                /> </label> */}

                <label> Data: 
                  <input
                    type="DATE" 
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                  /> 
                </label>

                <label> Descrição: 
                  <input
                    type="STRING" 
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
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
                  <span>Conta Débito Atual: {nomeDaContaDebitoAtual}</span>                
                  <ListaContasID onSelectConta={handleContaDebitadaSelect} />                      
                </label>

                <label> 
                  {/* Conta creditada:  */}
                  {/* <input
                    type="number" 
                    name="fk_id_conta_credito"
                    value={formData.fk_id_conta_credito}
                    onChange={handleChange}
                  />  */}     
                  <span>Conta Crédito Atual: {nomeDaContaCreditoAtual}</span>             
                  <ListaContasID onSelectConta={handleContaCreditadaSelect} />                  
                </label>

                <label> Valor: 
                  <input
                    type="number" 
                    name="valor"
                    value={formData.valor}
                    onChange={handleChange}
                  /> 
                </label>

                {/* <label> Usuário: <input
                    type="number" 
                    name="fk_id_usuario"
                    value={formData.fk_id_usuario}
                    onChange={handleChange}
                /> </label> */}
                
                <button type="submit">Atualizar</button>
            </form>
       </div>
    ) 
}