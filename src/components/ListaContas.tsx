// ListaContas.tsx
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import api from '../service/api';
import '../styles/ReactModal.css'; // Importe os estilos

interface ListaContasProps {
  onSelectConta: (conta: string) => void;
}

function ListaContas({ onSelectConta }: ListaContasProps) {
  const { data: contas, isLoading, isError } = useQuery('contas', async () => {
    const response = await api.get('/contas');
    return response.data;
  });

  const [selectedConta, setSelectedConta] = useState<string>('');

  useEffect(() => {
    onSelectConta(selectedConta);
  }, [selectedConta, onSelectConta]);

  if (isLoading) {
    return <div>Carregando contas...</div>;
  }

  if (isError) {
    return <div>Ocorreu um erro ao buscar contas.</div>;
  }

  return (
    <div>
      <label>Escolha a conta:</label>
      <select value={selectedConta} onChange={(e) => setSelectedConta(e.target.value)}>
        <option value="">Selecione uma conta</option>
        {contas.map((conta: any) => (
          <option key={conta.id}>
            {conta.conta}            
          </option>
        ))}
      </select>
    </div>
  );
}

export default ListaContas;
