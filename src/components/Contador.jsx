import {useState} from "react" 

const Contador = () => {

    // HOOK - useState - Manipula o estado da variavel
const [contador,setContador]=useState(0); //setContador -> funcao da variavel

    ///* funcao que chama outra funcao -> callback
  return (
    <>
      <h1>Contagem Inicial: {contador}</h1>
      <button onClick={()=>setContador(contador +1)}>Aumentar</button>
    <button onClick={() => setContador(contador -1)}>Diminuir</button>  
    </>
  )
}

export default Contador
