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

// function calcularSomaSaldoGrupo(lancamentos: any, nomeGrupo: any) {
//   const somaSaldoGrupo = lancamentos
//     .filter((lancamento: any) => lancamento.nome_grupo === nomeGrupo)
//     .reduce((soma: any, lancamento: any) => soma + lancamento.valor, 0);

//   return somaSaldoGrupo.toFixed(2); // Ajuste conforme necessário
// }

// function calcularSomaSaldoAtualGrupo(lancamentos: any, nomeGrupo: any) {
//   const somaSaldoAtualGrupo = lancamentos
//     .filter((lancamento: any) => lancamento.nome_grupo === nomeGrupo)
//     .reduce((soma: any, lancamento: any) => soma + lancamento.saldoAtual, 0);

//   return somaSaldoAtualGrupo.toFixed(2); // Ajuste conforme necessário
// }


function calcularSomaSaldoGrupo2(lancamentos: any, nomeGrupo: any) {
  const lancamentosGrupo = lancamentos.filter((lancamento: any) => String(lancamento.nome_grupo) === String(nomeGrupo));
  const somaSaldoAnterior2 = lancamentosGrupo.reduce((soma: any, lancamento: any) => soma + lancamento.saldoAnterior, 0);
  const somaValorD2 = lancamentosGrupo.reduce((soma: any, lancamento: any) => soma + lancamento.valorD, 0);
  const somaValorC2 = lancamentosGrupo.reduce((soma: any, lancamento: any) => soma + lancamento.valorC, 0);
  const somaSaldo2 = lancamentosGrupo.reduce((soma: any, lancamento: any) => soma + lancamento.valor, 0);
  const somaSaldoAtual2 = lancamentosGrupo.reduce((soma: any, lancamento: any) => soma + lancamento.saldoAtual, 0);

  return { somaSaldoAnterior2: somaSaldoAnterior2.toFixed(2), 
    somaValorD2: somaValorD2.toFixed(2), somaValorC2: somaValorC2.toFixed(2),
    somaSaldo2: somaSaldo2.toFixed(2), somaSaldoAtual2: somaSaldoAtual2.toFixed(2) };
}

function calcularSomaSaldoGrupoPrincipal(lancamentos: any, grupoPrincipal: any) {
  // const lancamentosGrupoPrincipal = lancamentos.filter((lancamento: any) => String(lancamento.grupo_principal) === String(grupoPrincipal));
  const lancamentosGrupoPrincipal = lancamentos.filter((lancamento: any) => String(lancamento.nome_grupo_principal) === String(grupoPrincipal));
  const somaSaldoAnterior = lancamentosGrupoPrincipal.reduce((soma: any, lancamento: any) => soma + lancamento.saldoAnterior, 0);
  const somaValorD = lancamentosGrupoPrincipal.reduce((soma: any, lancamento: any) => soma + lancamento.valorD, 0);
  const somaValorC = lancamentosGrupoPrincipal.reduce((soma: any, lancamento: any) => soma + lancamento.valorC, 0);
  const somaSaldo = lancamentosGrupoPrincipal.reduce((soma: any, lancamento: any) => soma + lancamento.valor, 0);
  const somaSaldoAtual = lancamentosGrupoPrincipal.reduce((soma: any, lancamento: any) => soma + lancamento.saldoAtual, 0);

  return { somaSaldoAnterior: somaSaldoAnterior.toFixed(2), 
    somaValorD: somaValorD.toFixed(2), somaValorC: somaValorC.toFixed(2),
    somaSaldo: somaSaldo.toFixed(2), somaSaldoAtual: somaSaldoAtual.toFixed(2) };
}

export function BalancoEmpresa() {  

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

    // const groupedLancamentosPrincipal = groupBy(lancamentos, 'grupo_principal'); // Agrupa por Grupo_Principal
    const groupedLancamentosPrincipal = groupBy(lancamentos, 'nome_grupo_principal'); // Agrupa por Grupo_Principal
    const gruposPrincipal = Object.keys(groupedLancamentosPrincipal);

    // const groupedLancamentos = groupBy(lancamentos, 'nome_grupo'); // Agrupa por Nome_Grupo
    // const grupos = Object.keys(groupedLancamentos);

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
                            {/* <th>Grupo_Principal</th>
                            <th>Grupo</th>
                            <th>SubGrupo</th>
                            <th>Elemento</th>
                            <th>Nome_Grupo</th> */}
                            <th>Conta</th> 
                            <th>Saldo_Anterior</th>                                                       
                            {/* <th>ValorD</th>
                            <th>ValorC</th> */}
                            <th>Saldo</th>
                            <th>Saldo_Atual</th>
                        </tr>
                    </thead>
                    <tbody> 
                      {/* {lancamentos?.map((lancamento: any) => ( */}
                      {/* {grupos.map((nomeGrupo, index) => { */}
                      {gruposPrincipal.map((grupoPrincipal, index) => {
                        
                        // const grupoPrincipal = lancamentos.find((lancamento: any) => lancamento.nome_grupo === nomeGrupo)?.grupo_principal;
                        // const nomeGrupo = lancamentos.find((lancamento: any) => lancamento.grupo_principal === grupoPrincipal)?.nome_grupo;

                        const lancamentosGrupoPrincipal = groupedLancamentosPrincipal[grupoPrincipal];
                        
                          return (

                            <React.Fragment key={index}>
                              <tr key={`header_${grupoPrincipal}`}>
                                {/* <td colSpan={1}>{`Grupo Principal: ${grupoPrincipal}`}</td> */}
                                <td colSpan={1}>{grupoPrincipal}</td>
                                <td>{calcularSomaSaldoGrupoPrincipal(lancamentos, grupoPrincipal).somaSaldoAnterior}</td>
                                {/* <td>{calcularSomaSaldoGrupoPrincipal(lancamentos, grupoPrincipal).somaValorD}</td>
                                <td>{calcularSomaSaldoGrupoPrincipal(lancamentos, grupoPrincipal).somaValorC}</td> */}
                                <td>{calcularSomaSaldoGrupoPrincipal(lancamentos, grupoPrincipal).somaSaldo}</td>
                                <td>{calcularSomaSaldoGrupoPrincipal(lancamentos, grupoPrincipal).somaSaldoAtual}</td>
                              </tr>

                              {Object.keys(groupBy(lancamentosGrupoPrincipal, 'nome_grupo')).map((nomeGrupo, nomeGrupoIndex) => {
                                const lancamentosNomeGrupo = lancamentosGrupoPrincipal.filter((lancamento: any) => lancamento.nome_grupo === nomeGrupo);

                                return (
                                  <React.Fragment key={`nomeGrupo_${nomeGrupoIndex}`}>

                                    <tr key={`header_${nomeGrupo}`}>
                                      {/* <td colSpan={1}>{nomeGrupo}</td> */}
                                      <td colSpan={1}>{nomeGrupo.toUpperCase()}</td>
                                      {/* <td>{calcularSomaSaldoGrupo(lancamentosNomeGrupo, nomeGrupo)}</td>
                                      <td>{calcularSomaSaldoAtualGrupo(lancamentosNomeGrupo, nomeGrupo)}</td> */}
                                      <td>{calcularSomaSaldoGrupo2(lancamentosNomeGrupo, nomeGrupo).somaSaldoAnterior2}</td>
                                      {/* <td>{calcularSomaSaldoGrupo2(lancamentosNomeGrupo, nomeGrupo).somaValorD2}</td>
                                      <td>{calcularSomaSaldoGrupo2(lancamentosNomeGrupo, nomeGrupo).somaValorC2}</td> */}
                                      <td>{calcularSomaSaldoGrupo2(lancamentosNomeGrupo, nomeGrupo).somaSaldo2}</td>
                                      <td>{calcularSomaSaldoGrupo2(lancamentosNomeGrupo, nomeGrupo).somaSaldoAtual2}</td>                            
                                    </tr>

                                    {/* {groupedLancamentosPrincipal[grupoPrincipal].map((lancamento: any) => ( */}
                                    {/* // {groupedLancamentos[nomeGrupo].map((lancamento: any) => ( */}
                                    {lancamentosNomeGrupo.map((lancamento: any) => (
                                      <tr key={lancamento.id}>                                              
                                          {/* <td>{lancamento.grupo_principal}</td>
                                          <td>{lancamento.grupo}</td>
                                          <td>{lancamento.subgrupo}</td>
                                          <td>{lancamento.elemento}</td>
                                          <td>{lancamento.nome_grupo}</td> */}
                                          <td style={{ textAlign: 'left' }}>{lancamento.conta}</td>     
                                          <td style={{ textAlign: 'right' }}>{lancamento.saldoAnterior.toFixed(2)}</td>                       
                                          {/* <td>{lancamento.valorD.toFixed(2)}</td>
                                          <td>{lancamento.valorC.toFixed(2)}</td>  */}
                                          {/* <td>{parseFloat(lancamento.valorC).toFixed(2)}</td>*/}
                                          <td style={{ textAlign: 'right' }}>{lancamento.valor.toFixed(2)}</td>
                                          {/* <td>{Number(lancamento.valor)}</td> */}
                                          <td style={{ textAlign: 'right' }}>{lancamento.saldoAtual.toFixed(2)}</td> 
                                      </tr>      
                                    ))}
                                  </React.Fragment>
                                );
                              })}
                            </React.Fragment>
                          );
                      })}            
                    </tbody>
                </table> 
          </div>
        );
  }else {
        return <div>Carregando...</div>;
  }
    
}

