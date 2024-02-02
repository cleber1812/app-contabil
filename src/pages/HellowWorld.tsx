import { useQuery } from 'react-query';

function useGetHellowWorld() {
    return useQuery('carrinho', async () => {
      const response = await fetch('http://localhost:3000'); // Atualize com a rota correta da sua API
      const data = await response.json();
      return data;
    });
  }

export function HellowWorld() {
    
    const { data, error, isLoading } = useGetHellowWorld();
    
    if (isLoading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error loading data</p>;
      }

    return (
        <div>
        <h1>Carrinho</h1>
        <p>Mensagem da API: {data.message}</p>        
        </div>
    )
}