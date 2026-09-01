import { useState, useEffect } from "react"

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

    return (
        <>

        </>
    )
}

export default Tarefa
