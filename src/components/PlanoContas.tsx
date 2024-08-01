// PlanoContas.tsx

import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../service/api';
import '../App.css'; // Importe os estilos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

function PlanoContas() {
    const [isToggled, setIsToggled] = useState(false);
    
    const { data: planocontas, isLoading, isError } = useQuery(
        'planocontas', 
        async () => {
            const response = await api.get('/planocontas');
            return response.data;
        },
        {
        enabled: isToggled, // A consulta só é ativada quando isToggled for true
        }
    );

    const handleToggle = () => {
        setIsToggled((prev) => !prev);
    };

    // if (isLoading) {
    //     return <div>Carregando contas...</div>;
    // }

    // if (isError) {
    //     return <div>Ocorreu um erro ao buscar contas.</div>;
    // }

    return (
        <div>
            <a>Exibir plano de contas </a>
            <div onClick={handleToggle} className='pc-toggle'>
                <FontAwesomeIcon icon={isToggled ? faToggleOn : faToggleOff} className='icon-toggle' />
            </div>

            {isToggled && (
                <div>
                    {isLoading ? (
                        <div>Carregando contas...</div>
                    ) : isError ? (
                        <div>Ocorreu um erro ao buscar contas.</div>
                    ) : (
                        <table className="custom-pc">
                            <tbody>
                                {planocontas.map((conta: any) => (
                                    <tr key={conta.id}>
                                        <td>{conta.nome_grupo_principal}</td>
                                        <td>{conta.nome_grupo}</td>                    
                                        <td>{conta.grupo_principal}.{conta.grupo}.{conta.subgrupo}.{conta.elemento} {conta.conta}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}

export default PlanoContas;
