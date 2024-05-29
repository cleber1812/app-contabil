import { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../service/api';
import CustomDatePicker from '../components/DatePickerComponent'; // Importe o novo componente
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClipLoader from "react-spinners/ClipLoader"; // Importe o ClipLoader


// async function fetchLancamentosEmpresa(fk_id_empresa: string, startDate?: Date, endDate?: Date) {
async function fetchLancamentosEmpresa(fk_id_empresa: string, startDate: Date = new Date(), endDate: Date = new Date()) {
  try {
    // const url = `/diarioempresa/${fk_id_empresa}?startDate=${startDate}&endDate=${endDate}`;
    const url = `/diarioempresa/${fk_id_empresa}?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`;
    const response = await api.get(url);    
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar lançamentos');
  }
}

export function DiarioEmpresa() {  
  const navigate = useNavigate();
  const { fk_id_empresa } = useParams<{ fk_id_empresa: string }>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  // const [startDate, setStartDate] = useState<Date>(new Date('2023-01-01'));  
  const [endDate, setEndDate] = useState<Date>(new Date());   

  // const { data: lancamentos, isLoading, isError, refetch } = useQuery(
  const { data: lancamentos, isLoading, isError } = useQuery(
    // 'lancamentos', 
    ['lancamentos', fk_id_empresa, startDate, endDate], // Adicione startDate e endDate à lista de dependências
    () => fetchLancamentosEmpresa(fk_id_empresa ?? '2', startDate, endDate)
  );

  if (isLoading) {    
    return (
      <div className="loader-container">
        <ClipLoader color={"#19647E"} loading={isLoading} size={150} />
        <p>Carregando...</p>
      </div>
    );
  }  
  if (isError) {
    // return <p>Ocorreu um erro ao buscar lançamentos.</p>;        
    navigate('/');
    return null; // Retorna null para parar a renderização
  }

        return (
          <div id="root">
          <Header />
          <main>
          <div className="container">
            <h1>Livro Diário</h1>
                <label>Intervalo de datas:</label>            
              <div>
                {/* <DatePicker 
                  selected={startDate}
                  onChange={(date) => date && setStartDate(date)} // Verifica se date não é null                  
                  // onChange={(date) => date && setStartDate(new Date(date).toISOString().split('T')[0])}
                  
                  dateFormat="dd/MM/yyyy" // Define o formato desejado
                  // dateFormat="yyyy/MM/dd" // Define o formato desejado
                /> */}
                <CustomDatePicker selectedDate={startDate} onChangeDate={setStartDate} />
              </div>
              <div>
                {/* <DatePicker 
                  selected={endDate} 
                  onChange={(date) => date && setEndDate(date)}                   
                  // onChange={(date) => date && setEndDate(new Date(date).toISOString().split('T')[0])}                  
                  dateFormat="dd/MM/yyyy" // Define o formato desejado
                  // dateFormat="yyyy/MM/dd" // Define o formato desejado
                /> */}
                <CustomDatePicker selectedDate={endDate} onChangeDate={setEndDate} />
              </div>
              {/* <button onClick={() => refetch()}>Atualizar</button> */}            
                <table className="custom-table">
                    <thead>
                        <tr>                           
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Conta Débito</th>
                            <th>Conta Crédito</th>
                            <th>Valor</th>
                            {/* <th>Usuário</th>                                                        */}
                        </tr>
                    </thead>
                    <tbody>                      
                      {lancamentos.map((lancamento: any) => (
                        <tr key={lancamento.id}>                            
                            <td>{lancamento.data}</td>
                            <td style={{ textAlign: 'left' }}>{lancamento.descricao}</td>
                            <td>{lancamento.contaDebito}</td>
                            <td>{lancamento.contaCredito}</td>
                            <td style={{ textAlign: 'right' }}>{lancamento.valor.toFixed(2)}</td>
                            {/* <td>{lancamento.usuario}</td>                                                        */}
                        </tr>      
                      ))}            
                    </tbody>
                </table> 
          </div>
          </main>
          <Footer />
          </div>
        );
}
