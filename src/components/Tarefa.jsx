import { useState, useEffect } from "react"
import '../css/estilo.css'
import Contador from './Contador'

const Tarefa = () => {

    // HOOK - useState - Manipula o estado da variavel
    const [tarefas, setTarefas]=useState(()=>{
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });

    const [campo,setCampo]=useState("");
    // HOOK - userEffect - Realiza p efeito colateral, nesse exemplo
    // vai mostrar a tarefa adicionada em tempo real
    useEffect(()=>{
        localStorage.setItem("item-tarefa",JSON.stringify(tarefas))
    },[tarefas])

    //FUNÇÃO ADICIONAR TAREFA - "e" é um evento poe ser encontrado com "e" ou "event"
    const AdicionarTarefa = (e)=>{
        //Previne que a página se recarregeue automaticamente
        e.preventDefault();
        //Valida se o campo estiver vazio
        if(!campo.trim()) return;

        //novo objeto
        const novaTarefa={
            id: Date.now(),
            texto:campo,
        }
        setTarefas([...tarefas,novaTarefa]);
        setCampo('');
    }
    const RemoverTarefa=(id)=>{
        //VERIFICA SE O ID DA TAREFA ATUAL É DIFERENTE DO ID QUE DESEJA APAGAR
        //SE O ID FOR IGUAL(TAREFA QUE DESEJA APAGAR) A CONDIÇÃO RETORNA FALSO
        //E O ITEM É EXCLUIDO
        const apagarTarefa = tarefas.filter((tarefa)=> tarefa.id !== id);
        setTarefas(apagarTarefa);
    }
    return (
        <div className="todo-container">
            <h1>Minha Lista de Tarefas</h1>
            <form onSubmit={AdicionarTarefa}>
                <input
                 type="text"
                 value={campo} 
                 onChange={(e)=>setCampo(e.target.value)}
                 placeholder="Digite sua tarefa"
                 className="todo-input"
                 />
                 <button type="submit">Adicionar</button>
            </form>

            <ul>
                {tarefas.map((tarefa)=>(
                    <li key={tarefa.id}>
                        <span>{tarefa.texto}</span>
                        <button onClick={()=>RemoverTarefa(tarefa.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
            {/* COMPARA SE NÃO TIBER TAREFAS DEIXA A MENSAGEM NENHUMA TAREFA SALVA */}
            {tarefas.lenght === 0 && <P>Nenhuma tarefa Salva</P>}
            <Contador></Contador>

        </div>
    )
}

export default Tarefa
