import React, { useState, useEffect } from 'react';
import api from '../service/api';
import { useNavigate, useParams } from 'react-router-dom';
import ListaContas from '../components/ListaContasID'; // Certifique-se de fornecer o caminho correto para o componente ListaContas
import '../App.css';

export function InserirLancamentoEmpresa() { 
    const navigate = useNavigate();  // Obtenha o objeto de navegação

    const { fk_id_empresa, userID } = useParams<{
        fk_id_empresa: string;
        userID: string;
      }>();
    
    const [contaDebConsultada, setContaDebConsultada] = useState('');
    const [contaCredConsultada, setContaCredConsultada] = useState('');

    const [formData, setFormData] = useState({
        fk_id_empresa,
        data: '',
        descricao: '',
        fk_id_conta_debito: '',
        fk_id_conta_credito: '',
        valor: '',
        fk_id_usuario: userID,
      });
    
    const handleContaDebitadaSelect = (id: string) => {
        setContaDebConsultada(id);        
    };

    const handleContaCreditadaSelect = (id: string) => {
        setContaCredConsultada(id);        
    };
    
    useEffect(() => {
        setFormData((prevData) => ({
          ...prevData,
          fk_id_conta_debito: contaDebConsultada,
          fk_id_conta_credito: contaCredConsultada,
        }));
      }, [contaDebConsultada, contaCredConsultada]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          // Fazer a requisição POST para a API        
          await api.post('/lancamento', formData);

          // Limpar o formulário após o sucesso    
          setFormData({
            fk_id_empresa: '',
            data: '',
            descricao: '',
            fk_id_conta_debito: '',
            fk_id_conta_credito: '',
            valor: '',
            fk_id_usuario: '',
          });

            // Navegar para a página de lancamentosempresa após o sucesso            
            navigate(`/lancamentosempresa/${fk_id_empresa}/${userID}`);

        } catch (error) {
            console.error('Erro ao enviar lançamento:', error);
            // Adicionar lógica de tratamento de erro, se necessário
          }
    };
  
    return (
        <div className="container">
            <h1>Inserir Lançamento por Empresa</h1>
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

                <label> Conta debitada: 
                    {/* <input
                    type="number" 
                    name="fk_id_conta_debito"
                    value={formData.fk_id_conta_debito}
                    onChange={handleChange}
                    />  */}
                    <ListaContas onSelectConta={handleContaDebitadaSelect} />
                </label>

                <label> Conta creditada: 
                  {/* <input
                    type="number" 
                    name="fk_id_conta_credito"
                    value={formData.fk_id_conta_credito}
                    onChange={handleChange}
                  /> */}
                    <ListaContas onSelectConta={handleContaCreditadaSelect} /> 
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
                
                <button type="submit">Enviar</button>
            </form>
          </div>
        );
}

