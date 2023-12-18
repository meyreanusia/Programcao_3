import './Tabela.css';

export default function Tabela({disciplinas}){    
    return(
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Sigla</th>
                    <th>Descrição</th>
                    <th>Período</th>
                    <th>Carga Horária</th>
                </tr>
            </thead>
            <tbody>
                {disciplinas.map((disciplina, index)=> (
                    <tr key={index}>
                        <td>{disciplina.id_disciplina}</td>
                        <td>{disciplina.tx_sigla}</td>
                        <td>{disciplina.tx_descricao}</td>
                        <td>{disciplina.in_periodo}</td>
                        <td>{disciplina.in_carga_horaria}</td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    )
}

