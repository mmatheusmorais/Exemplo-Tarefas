import { useState, useEffect } from "react"
import '../css/estilo.css'

const Tarefa = () => {

    // HOOK - useState - Manipula o estado da variavel
    const [tarefas, setTarefas] = useState(() => {
        const salvarTarefas = localStorage.getItem("item-tarefa");
        return salvarTarefas ? JSON.parse(salvarTarefas) : [];
    });

    const [campo, setCampo] = useState("");
    // HOOK - userEffect - Realiza p efeito colateral, nesse exemplo
    // vai mostrar a tarefa adicionada em tempo real
    useEffect(() => {
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas))
    }, [tarefas])

    //FUNÇÃO ADICIONAR TAREFA - "e" é um evento poe ser encontrado com "e" ou "event"
    const AdicionarTarefa = (e) => {
        //Previne que a página se recarregeue automaticamente
        e.preventDefault();
        //Valida se o campo estiver vazio
        if (!campo.trim()) return;

        //novo objeto
        const novaTarefa = {
            id: Date.now(),
            texto: campo,
        }
        setTarefas([...tarefas, novaTarefa]);
        setCampo('');
    }
    const RemoverTarefa = (id) => {
        //VERIFICA SE O ID DA TAREFA ATUAL É DIFERENTE DO ID QUE DESEJA APAGAR
        //SE O ID FOR IGUAL(TAREFA QUE DESEJA APAGAR) A CONDIÇÃO RETORNA FALSO
        //E O ITEM É EXCLUIDO
        const apagarTarefa = tarefas.filter((tarefa) => tarefa.id !== id);
        setTarefas(apagarTarefa);
    }
    return (
        <div className="max-w-md mx-auto mt-10 bg-indigo-500 rounded-2xl shadow-lg shadow-blue-400 border border-white">
            <h1 className="text-2xl font-bold text-white mb-6 text-center">Minha Lista de Tarefas</h1>
            <form onSubmit={AdicionarTarefa} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={campo}
                    onChange={(e) => setCampo(e.target.value)}
                    placeholder="Digite sua tarefa"
                    className="flex-1 px-4 py-2 broder border-gray-700 rounded-2xl focus:outline-none focus:ring-1 focus:border-transparent text-black placeholder:text-gray-700"
                />
                <button type="submit"
                    className="bg-indigo-950 hover:bg-indigo-400 text-white font-medium px-5 py-2 rounded-2xl transition-colors cursor-pointer"


                >Adicionar</button>
            </form>

            <ul className="space-y-3">
                {tarefas.map((tarefa) => (
                    <li key={tarefa.id} className="flex items-center justify-between p-3 bg-indigo-300 border-amber-300 rounded-2xl shadow-sm hover:bg-indigo-900 transition-colors cursor-pointer">
                        <span>{tarefa.texto}</span>
                        <button onClick={() => RemoverTarefa(tarefa.id)}
                            className="bg-red-600 hover:bg-indigo-400 text-white font-medium px-5 py-2 rounded-2xl transition-colors cursor-pointer">Excluir</button>
                    </li>
                ))}
            </ul>
            {/* COMPARA SE NÃO TIBER TAREFAS DEIXA A MENSAGEM NENHUMA TAREFA SALVA */}
            {tarefas.lenght === 0 && <P>Nenhuma tarefa Salva</P>}

        </div>
    )
}

export default Tarefa
