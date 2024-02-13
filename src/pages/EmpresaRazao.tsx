import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../service/api';
import '../App.css';
import ListaContas from '../components/ListaContas';


// async function fetchLancamentosEmpresa(fk_id_empresa: string, startDate?: Date, endDate?: Date, contaConsultada?: string) {
async function fetchLancamentosEmpresa(fk_id_empresa: string, startDate: Date = new Date(), endDate: Date = new Date(), contaConsultada?: string) {

  try {
    // const url = `/razaoempresa/${fk_id_empresa}?startDate=${startDate}&endDate=${endDate}&contaConsultada=${contaConsultada}`;
    const url = `/razaoempresa/${fk_id_empresa}?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}&contaConsultada=${contaConsultada}`;
    const response = await api.get(url);    
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar lançamentos');
  }
}

export function RazaoEmpresa() {  
  
  const { fk_id_empresa } = useParams<{ fk_id_empresa: string }>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  // const [startDate, setStartDate] = useState<Date>(new Date('2023-01-01'));  
  const [endDate, setEndDate] = useState<Date>(new Date());  
  const [contaConsultada, setContaConsultada] = useState('Caixa'); 
  
  

  const { data: lancamentos, isLoading, isError } = useQuery(
    ['lancamentos', fk_id_empresa, startDate, endDate, contaConsultada], // Adicione startDate e endDate à lista de dependências
    () => fetchLancamentosEmpresa(fk_id_empresa ?? '2', startDate, endDate, contaConsultada)
  );

  if (isLoading) {
    return <div>Carregando...</div>;
  }  
  if (isError) {
    return <p>Ocorreu um erro ao buscar lançamentos.</p>;
  }

        return (
          <div className="container">
            <h1>Livro Diário</h1>
              
                <label>Intervalo de datas:</label>            
              <div>
                <DatePicker 
                  selected={startDate}
                  onChange={(date) => date && setStartDate(date)} // Verifica se date não é null
                  dateFormat="dd/MM/yyyy" // Define o formato desejado
                />
              </div>
              <div>
                <DatePicker 
                  selected={endDate} 
                  onChange={(date) => date && setEndDate(date)} 
                  dateFormat="dd/MM/yyyy" // Define o formato desejado
                />
              </div> 
              <div>                                  
                  <ListaContas onSelectConta={setContaConsultada} />                  
              </div>            
                <table className="custom-table">
                    <thead>
                        <tr>                           
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Valor Debitado</th>
                            <th>Valor Creditado</th>                            
                        </tr>
                    </thead>
                    <tbody>                      
                      {lancamentos.map((lancamento: any) => (
                        <tr key={lancamento.id}>                            
                            <td>{lancamento.data}</td>
                            <td>{lancamento.descricao}</td>
                            <td>{lancamento.valorDebitado}</td>
                            <td>{lancamento.valorCreditado}</td>                            
                        </tr>      
                      ))}            
                    </tbody>
                </table> 
          </div>
        );
}
