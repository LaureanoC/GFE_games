const mezclarLista = (lista) => {
       lista.sort(()=> Math.random() - 0.5);
}

const mezclarArray = (lista) => {
  return  lista.sort(()=> Math.random() - 0.5);
}

const seleccionarCampeonAleatorio = (lista) => {

    return Math.floor(Math.random()*lista.length);
    
}


const seleccionarFraseAleatoria = (campeon) => {

    return Math.floor(Math.random()*campeon.frases.length)

}

const sortearOpciones = (n) => {

    return Math.floor(Math.random()*n);

}

export const sorteoServicio = {

    mezclarLista, seleccionarCampeonAleatorio, seleccionarFraseAleatoria, sortearOpciones, mezclarArray
}
