import React from 'react';
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

function groupBy(array: any[], key: string) {
  return array.reduce((result, item) => {
    (result[item[key]] = result[item[key]] || []).push(item);
    return result;
  }, {});
}

function calcularSomaSaldoGrupoPrincipal(lancamentos: any, grupoPrincipal: any) {  
  const lancamentosGrupoPrincipal = lancamentos.filter((lancamento: any) => lancamento.nome_grupo === grupoPrincipal);
  const somaValorD = lancamentosGrupoPrincipal.reduce((soma: any, lancamento: any) => soma + lancamento.valorD, 0);
  const somaValorC = lancamentosGrupoPrincipal.reduce((soma: any, lancamento: any) => soma + lancamento.valorC, 0);
  const somaSaldo = lancamentosGrupoPrincipal.reduce((soma: any, lancamento: any) => soma + lancamento.valor, 0);  

  return { somaValorD: somaValorD.toFixed(2), somaValorC: somaValorC.toFixed(2),
    somaSaldo: somaSaldo.toFixed(2)};
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

    const groupedLancamentosPrincipal = groupBy(lancamentos, 'nome_grupo'); // Agrupa por Grupo_Principal
    const gruposPrincipal = Object.keys(groupedLancamentosPrincipal);       
    
    // Calcular o saldo total de receitas e despesas
    const saldoReceitasD = calcularSomaSaldoGrupoPrincipal(lancamentos, 'Receita').somaValorD;
    const saldoDespesasD = calcularSomaSaldoGrupoPrincipal(lancamentos, 'Despesa').somaValorD;
    const saldoReceitasC = calcularSomaSaldoGrupoPrincipal(lancamentos, 'Receita').somaValorC;
    const saldoDespesasC = calcularSomaSaldoGrupoPrincipal(lancamentos, 'Despesa').somaValorC;
    const saldoReceitas = calcularSomaSaldoGrupoPrincipal(lancamentos, 'Receita').somaSaldo;    
    const saldoDespesas = calcularSomaSaldoGrupoPrincipal(lancamentos, 'Despesa').somaSaldo;

    // Calcular o lucro líquido
    const lucroLiquidoD = (parseFloat(saldoDespesasD) - parseFloat(saldoReceitasD)).toFixed(2);
    const lucroLiquidoC = (parseFloat(saldoReceitasC) - parseFloat(saldoDespesasC)).toFixed(2);
    const lucroLiquido = (parseFloat(saldoReceitas) + parseFloat(saldoDespesas)).toFixed(2);

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
                            <th>Conta</th>                                                                                   
                            <th>ValorD</th>
                            <th>ValorC</th>
                            <th>Saldo</th>                            
                        </tr>
                    </thead>
                    <tbody>                       
                      {gruposPrincipal.map((grupoPrincipal, index) => {

                        const lancamentosGrupoPrincipal = groupedLancamentosPrincipal[grupoPrincipal];
                        const isResultado = grupoPrincipal === 'Resultado';

                        return (
                          <React.Fragment key={index}>

                            <tr key={`header_${grupoPrincipal}`} className={isResultado ? 'resultado-row' : ''}>                            
                              <td className="BP-subGrupo" colSpan={1}>{grupoPrincipal.toUpperCase()}</td>                         
                              <td className="BP-subGrupo" >{calcularSomaSaldoGrupoPrincipal(lancamentos, grupoPrincipal).somaValorD}</td>
                              <td className="BP-subGrupo" >{calcularSomaSaldoGrupoPrincipal(lancamentos, grupoPrincipal).somaValorC}</td>
                              <td className="BP-subGrupo" >{calcularSomaSaldoGrupoPrincipal(lancamentos, grupoPrincipal).somaSaldo}</td>                              
                            </tr>

                            {lancamentosGrupoPrincipal.map((lancamento: any) => (
                        
                              <tr key={lancamento.id} className={isResultado ? 'resultado-row' : ''}>                               
                                  <td>{lancamento.conta}</td>                                 
                                  <td>{lancamento.valorD.toFixed(2)}</td>
                                  <td>{lancamento.valorC.toFixed(2)}</td>                                   
                                  <td>{lancamento.valor.toFixed(2)}</td>                                  
                              </tr> 
                             ))}
                          </React.Fragment>
                        );     
                      })}                      
                      <tr>
                        <td className="BP-subGrupo" colSpan={1}><strong>LUCRO LÍQUIDO</strong></td>
                        <td className="BP-subGrupo"><strong>{lucroLiquidoD}</strong></td>
                        <td className="BP-subGrupo"><strong>{lucroLiquidoC}</strong></td>
                        <td className="BP-subGrupo"><strong>{lucroLiquido}</strong></td>
                      </tr>                
                    </tbody>
                </table> 
          </div>
        );
  }else {
        return <div>Carregando...</div>;
  }
    
}

