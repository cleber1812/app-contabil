import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../service/api';
import CustomDatePicker from '../components/DatePickerComponent'; // Importe o novo componente
import ListaContas from '../components/ListaContas';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

  // Calcular o saldo total
  const saldoTotalDebitado = lancamentos.reduce((total: number, lancamento: any) => total + lancamento.valorDebitado, 0);
  const saldoTotalCreditado = lancamentos.reduce((total: number, lancamento: any) => total + lancamento.valorCreditado, 0);
  const saldoFinal = saldoTotalDebitado - saldoTotalCreditado;  

  // Decide onde exibir o saldo final
  let saldoFinalColumn: number;
  if (saldoTotalDebitado > saldoTotalCreditado) {
    saldoFinalColumn = 2; // Se o maior total for em Valor Debitado, o saldo final fica na coluna 3
  } else {
    saldoFinalColumn = 3; // Se o maior total for em Valor Creditado, o saldo final fica na coluna 4
  }

        return (
          <div id="root">
          <Header />
          <main>
          <div className="container">
            <h1>Livro Razão</h1>
              
                <label>Escolha o intervalo de datas</label>            
              <div className="date-picker-container">
                <CustomDatePicker selectedDate={startDate} onChangeDate={setStartDate} />
              </div>
              <div>
                <CustomDatePicker selectedDate={endDate} onChangeDate={setEndDate} />
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
                            <td style={{ textAlign: 'left' }}>{lancamento.descricao}</td>
                            <td style={{ textAlign: 'right' }}>{lancamento.valorDebitado.toFixed(2)}</td>
                            <td style={{ textAlign: 'right' }}>{lancamento.valorCreditado.toFixed(2)}</td>                            
                        </tr>
                              
                      ))}
                      <tr>
                        <td className="BP-subGrupo" style={{ textAlign: 'right' }} colSpan={2}><strong>Saldo Total:</strong></td>
                        <td className="BP-subGrupo" style={{ textAlign: 'right' }}><strong>{saldoTotalDebitado.toFixed(2)}</strong></td>
                        <td className="BP-subGrupo" style={{ textAlign: 'right' }}><strong>{saldoTotalCreditado.toFixed(2)}</strong></td>
                      </tr>
                      <tr>
                        {/* <td style={{ textAlign: 'right' }} colSpan={3}><strong>Saldo Final:</strong></td>
                        <td style={{ textAlign: 'right' }}><strong>{saldoFinal.toFixed(2)}</strong></td> */}
                        <td className="BP-Grupo" style={{ textAlign: 'right' }} colSpan={saldoFinalColumn}><strong>Saldo Final:</strong></td>
                        <td className="BP-Grupo" style={{ textAlign: 'right' }}><strong>{saldoFinal.toFixed(2)}</strong></td>
                      </tr>                                  
                    </tbody>
                </table> 
          </div>
          </main>
          <Footer />
          </div>
        );
}
