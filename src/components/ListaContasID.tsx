// ListaContasID.tsx
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import api from '../service/api';
import '../App.css'; // Importe os estilos

interface ListaContasProps {  
  // onSelectConta: (id: string, conta: string) => void; 
  onSelectConta: (id: string, conta: string, grupo: string) => void; 
}

const compararContas = (contaA: string, contaB: string) => {
  // Utilize a função localeCompare() para comparar as strings com suporte a localização
  return contaA.localeCompare(contaB, 'pt', { sensitivity: 'base' });
};

function ListaContasID({ onSelectConta}: ListaContasProps) {
  const { data: contas, isLoading, isError } = useQuery('contas', async () => {
    const response = await api.get('/contas');
    return response.data;
  });

  const [selectedConta, setSelectedConta] = useState<string>('');
  
  useEffect(() => {    
    if (contas && contas.length > 0) {
      const selectedContaObject = contas.find((conta: any) => conta.conta === selectedConta);      
      if (selectedContaObject) {
        // onSelectConta(selectedContaObject.id, selectedConta);        
        onSelectConta(selectedContaObject.id, selectedContaObject.conta, selectedContaObject.nome_grupo_principal);
      }
    }
  }, [selectedConta, onSelectConta, contas]);    

  if (isLoading) {
    return <div>Carregando contas...</div>;
  }

  if (isError) {
    return <div>Ocorreu um erro ao buscar contas.</div>;
  }

  // Ordenar as contas usando a função de comparação personalizada
  const contasOrdenadas = contas.sort((contaA: any, contaB: any) => compararContas(contaA.conta, contaB.conta));

  return (
    <div>
      {/* <label>Escolha a conta:</label> */}
      <select className="selectConta" value={selectedConta} onChange={(e) => setSelectedConta(e.target.value)}>      
        <option value="">Selecione uma conta</option>
        {/* {contas.map((conta: any) => ( */}
        {contasOrdenadas.map((conta: any) => (
          <option key={conta.id}>          
            {conta.conta}
          </option>
        ))}
      </select>
      {/* Aqui você pode adicionar o elemento div ou span para mostrar informações ao lado do select */}
      {/* {selectedConta && (
        <div style={{ color: "#88A37B" }}>
          <span>Conta "{selectedConta}" é do Grupo </span> */}
          {/* Aqui você pode exibir as informações relevantes da conta, como o grupo ao qual ela pertence */}
           {/* {contas.find((conta: any) => conta.conta === selectedConta)?.nome_grupo_principal}          
        </div>
      )} */}
    </div>
  );
}

export default ListaContasID;
