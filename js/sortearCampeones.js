const mezclarLista = (lista) => {
       return lista.sort(()=> Math.random() - 0.5);
}

const seleccionarCampeonAleatorio = (lista) => {

    return Math.floor(Math.random()*lista.length);
    
}

const seleccionarNombreAleatorioIncorrecto = (lista) => {

    let x = seleccionarCampeonAleatorio(lista);
    return lista[x].nombre;
    
    
}

const seleccionarFraseAleatoria = (campeon) => {

    return Math.floor(Math.random()*campeon.frases.length)

}

const sortearOpciones = (n) => {

    return Math.floor(Math.random()*n);

}

export const sorteoServicio = {

    mezclarLista, seleccionarCampeonAleatorio, seleccionarFraseAleatoria, sortearOpciones,seleccionarNombreAleatorioIncorrecto
}
