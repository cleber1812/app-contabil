// ListaContas.tsx
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import api from '../service/api';
import '../App.css'; // Importe os estilos

interface ListaContasProps {  
  onSelectConta: (id: string, conta: string) => void;  
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
        onSelectConta(selectedContaObject.id, selectedConta);
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
            {conta.conta} | {conta.nome_grupo_principal}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ListaContasID;
