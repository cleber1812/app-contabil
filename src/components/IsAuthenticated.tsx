// Função ou hook para verificar se o usuário está autenticado
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // Adicione lógica adicional, se necessário (por exemplo, verificar se o token expirou)
    try {
        // Decodificar o JWT para verificar expiração (opcional)
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
    } catch {
        return !!token; // Fallback para apenas verificar se existe
    }
    // return !!token; // Retorna true se o token estiver presente
  };
  
  export default isAuthenticated;