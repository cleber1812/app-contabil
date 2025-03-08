import { useState } from 'react';
import api from '../service/api';
import '../App.css';


export function InserirConta() { 
    
    const [formData, setFormData] = useState({
        fk_id_grupo: '',        
        conta: '',
        subgrupo: '',
        elemento: '',
        multiplicador: '',
        fk_id_usuario: '',
      });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          // Fazer a requisição POST para a API
          await api.post('/conta', formData);

          // Limpar o formulário após o sucesso    
          setFormData({
            fk_id_grupo: '',
            conta: '',
            subgrupo: '',
            elemento: '',
            multiplicador: '',
            fk_id_usuario: '',
          });

            // Navegar para a página de plano de contas após o sucesso
            alert('Conta inserida com sucesso')            

        } catch (error) {
            console.error('Erro ao criar conta contábil:', error);
            // Adicionar lógica de tratamento de erro, se necessário
            alert('Erro ao inserir a conta contábil')
        }
    };
  
    return (
        <div className="container">
            <h1>Inserir Conta Contábil</h1>
            <form onSubmit={handleSubmit}>
                
                <label> Id do grupo: <input
                    type="number" 
                    name="fk_id_grupo"
                    value={formData.fk_id_grupo}
                    min={1}
                    onChange={handleChange}
                /> </label>
                <span>(2) para 1 Ativo circulante / </span>
                <span>(3) para 2 Ativo não circulante /</span>
                <span>(4) para 3 Passivo circulante / </span>
                <span>(5) para 4 Passivo não circulante / </span>
                <span>(6) para 5 Patrimômio Líquido / </span>
                <span>(7) para 6 Receita / </span>
                <span>(8) para 7 Despesas / </span>
                <span>(9) para 8 Resultado </span>

                <label> Subgrupo: <input
                    type="number" 
                    name="subgrupo"
                    value={formData.subgrupo}
                    min={1}
                    onChange={handleChange}
                /> </label>

                <label> Elemento: <input
                    type="number" 
                    name="elemento"
                    value={formData.elemento}
                    min={1}
                    onChange={handleChange}
                /> </label>

                <label> Conta contábil: <input
                    type="STRING" 
                    name="conta"
                    value={formData.conta}
                    onChange={handleChange}
                /> </label>

                <label> Multiplicador (1 ou -1):  <input
                    type="number" 
                    name="multiplicador"
                    value={formData.multiplicador}
                    max={1}
                    min={-1}
                    onChange={handleChange}
                /> </label>

                <label> Usuário: <input
                    type="number" 
                    name="fk_id_usuario"
                    value={formData.fk_id_usuario}
                    min={1}
                    onChange={handleChange}
                /> </label>
                
                <button type="submit">Enviar</button>
            </form>
          </div>
        );
}

