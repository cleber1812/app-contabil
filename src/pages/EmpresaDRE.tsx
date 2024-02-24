import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../service/api';
import CustomDatePicker from '../components/DatePickerComponent'; // Importe o novo componente

import '../App.css';

// async function fetchLancamentosEmpresa(fk_id_empresa: string, startDate?: Date, endDate?: Date) {
async function fetchLancamentosEmpresa(
    fk_id_empresa: string, startDate: Date = new Date(), endDate: Date = new Date()
  ) {
  try {    
    const url = `/dre/${fk_id_empresa}?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`;
    const response = await api.get(url); 
    return response.data;    
  } catch (error) {
    throw new Error('Erro ao buscar lançamentos');
  }
}

export function DreEmpresa() {  

  const { fk_id_empresa } = useParams<{ fk_id_empresa: string }>();
  const [startDate, setStartDate] = useState<Date>(new Date()); 
  const [endDate, setEndDate] = useState<Date>(new Date());    
 
  const { data: lancamentos, isLoading, isError } = useQuery(
    ['lancamentos', fk_id_empresa, startDate, endDate], // Adicione startDate e endDate à lista de dependências
    () => fetchLancamentosEmpresa(fk_id_empresa ?? '2', startDate, endDate)
  );    

  if (isLoading) {
    return <div>Carregando...</div>;
  }  
  if (isError) {
    return <p>Ocorreu um erro ao buscar lançamentos.</p>;
  }

  if (lancamentos) {
        return (
          <div className="container">
            <h1>DRE</h1>
                <label>Intervalo de datas:</label>            
              <div>
                <CustomDatePicker selectedDate={startDate} onChangeDate={setStartDate} />
              </div>
              <div>
                <CustomDatePicker selectedDate={endDate} onChangeDate={setEndDate} />
              </div>
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Grupo_Principal</th>
                            <th>Grupo</th>
                            <th>SubGrupo</th>
                            <th>Elemento</th>
                            <th>Nome_Grupo</th>
                            <th>Conta</th>                                                                                   
                            <th>ValorD</th>
                            <th>ValorC</th>
                            <th>Saldo</th>                            
                        </tr>
                    </thead>
                    <tbody> 
                      {lancamentos?.map((lancamento: any) => (                      
                        <tr key={lancamento.id}>                                              
                            <td>{lancamento.grupo_principal}</td>
                            <td>{lancamento.grupo}</td>
                            <td>{lancamento.subgrupo}</td>
                            <td>{lancamento.elemento}</td>
                            <td>{lancamento.nome_grupo}</td>
                            <td>{lancamento.conta}</td>                                 
                            <td>{lancamento.valorD.toFixed(2)}</td>
                            <td>{lancamento.valorC.toFixed(2)}</td> 
                            {/* <td>{parseFloat(lancamento.valorC).toFixed(2)}</td>*/}
                            <td>{lancamento.valor.toFixed(2)}</td>
                            {/* <td>{Number(lancamento.valor)}</td> */}                            
                        </tr>      
                      ))}            
                    </tbody>
                </table> 
          </div>
        );
  }else {
        return <div>Carregando...</div>;
  }
    
}

