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
    // const url = `/balanco/${fk_id_empresa}?startDate=${startDate}&endDate=${endDate}`;
    const url = `/balanco/${fk_id_empresa}?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`;
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

function calcularSomaSaldoGrupo(lancamentos: any, nomeGrupo: any) {
  const somaSaldoGrupo = lancamentos
    .filter((lancamento: any) => lancamento.nome_grupo === nomeGrupo)
    .reduce((soma: any, lancamento: any) => soma + lancamento.valor, 0);

  return somaSaldoGrupo.toFixed(2); // Ajuste conforme necessário
}

function calcularSomaSaldoAtualGrupo(lancamentos: any, nomeGrupo: any) {
  const somaSaldoAtualGrupo = lancamentos
    .filter((lancamento: any) => lancamento.nome_grupo === nomeGrupo)
    .reduce((soma: any, lancamento: any) => soma + lancamento.saldoAtual, 0);

  return somaSaldoAtualGrupo.toFixed(2); // Ajuste conforme necessário
}

// function calcularSomaSaldoGrupoPrincipal(lancamentos: any, grupoPrincipal: any) {
//   const lancamentosGrupoPrincipal = lancamentos.filter((lancamento: any) => lancamento.grupo_principal === grupoPrincipal);
//   const somaSaldo = lancamentosGrupoPrincipal.reduce((soma: any, lancamento: any) => soma + lancamento.valor, 0);
//   const somaSaldoAtual = lancamentosGrupoPrincipal.reduce((soma: any, lancamento: any) => soma + lancamento.saldoAtual, 0);

//   return { somaSaldo: somaSaldo.toFixed(2), somaSaldoAtual: somaSaldoAtual.toFixed(2) };
// }


export function BalancoEmpresa() {  

  const { fk_id_empresa } = useParams<{ fk_id_empresa: string }>();
  const [startDate, setStartDate] = useState<Date>(new Date()); 
  const [endDate, setEndDate] = useState<Date>(new Date());    
 
  const { data: lancamentos, isLoading, isError } = useQuery(
    ['lancamentos', fk_id_empresa, startDate, endDate], // Adicione startDate e endDate à lista de dependências
    () => fetchLancamentosEmpresa(fk_id_empresa ?? '2', startDate, endDate)
  ); 
  
  // const gruposPrincipaisProcessados: string[] = []; 

  if (isLoading) {
    return <div>Carregando...</div>;
  }  
  if (isError) {
    return <p>Ocorreu um erro ao buscar lançamentos.</p>;
  }

  if (lancamentos) {      

    const groupedLancamentos = groupBy(lancamentos, 'nome_grupo'); // Agrupa por Nome_Grupo
    const grupos = Object.keys(groupedLancamentos);

        return (
          <div className="container">
            <h1>Balanço</h1>
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
                            <th>Saldo_Anterior</th>                                                       
                            <th>ValorD</th>
                            <th>ValorC</th>
                            <th>Saldo</th>
                            <th>Saldo_Atual</th>
                        </tr>
                    </thead>
                    <tbody> 
                      {/* {lancamentos?.map((lancamento: any) => ( */}
                      {grupos.map((nomeGrupo, index) => {
                        // const grupoPrincipal = lancamentos.find((lancamento: any) => lancamento.nome_grupo === nomeGrupo)?.grupo_principal;
                        
                        // if (grupoPrincipal && !gruposPrincipaisProcessados.includes(grupoPrincipal)) {
                        //   gruposPrincipaisProcessados.push(grupoPrincipal);
          
                          return (

                            <React.Fragment key={index}>
                              {/* <tr key={`header_${grupoPrincipal}`}>
                                <td colSpan={9}>{`Grupo Principal: ${grupoPrincipal}`}</td>
                                <td>{calcularSomaSaldoGrupoPrincipal(lancamentos, grupoPrincipal).somaSaldo}</td>
                                <td>{calcularSomaSaldoGrupoPrincipal(lancamentos, grupoPrincipal).somaSaldoAtual}</td>
                              </tr> */}
                              <tr key={`header_${nomeGrupo}`}>
                                <td colSpan={9}>{nomeGrupo}</td>
                                <td>{calcularSomaSaldoGrupo(lancamentos, nomeGrupo)}</td>
                                <td>{calcularSomaSaldoAtualGrupo(lancamentos, nomeGrupo)}</td>                            
                              </tr>
                              {groupedLancamentos[nomeGrupo].map((lancamento: any) => (
                                <tr key={lancamento.id}>                                              
                                    <td>{lancamento.grupo_principal}</td>
                                    <td>{lancamento.grupo}</td>
                                    <td>{lancamento.subgrupo}</td>
                                    <td>{lancamento.elemento}</td>
                                    <td>{lancamento.nome_grupo}</td>
                                    <td>{lancamento.conta}</td>     
                                    <td>{lancamento.saldoAnterior.toFixed(2)}</td>                       
                                    <td>{lancamento.valorD.toFixed(2)}</td>
                                    <td>{lancamento.valorC.toFixed(2)}</td> 
                                    {/* <td>{parseFloat(lancamento.valorC).toFixed(2)}</td>*/}
                                    <td>{lancamento.valor.toFixed(2)}</td>
                                    {/* <td>{Number(lancamento.valor)}</td> */}
                                    <td>{lancamento.saldoAtual.toFixed(2)}</td> 
                                </tr>      
                              ))}
                            </React.Fragment>
                          );
                        // }
                      })}            
                    </tbody>
                </table> 
          </div>
        );
  }else {
        return <div>Carregando...</div>;
  }
    
}

