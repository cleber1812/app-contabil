// Função ou hook para verificar se o usuário está autenticado
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    // Adicione lógica adicional, se necessário (por exemplo, verificar se o token expirou)
    return !!token; // Retorna true se o token estiver presente
  };
  
  export default isAuthenticated;