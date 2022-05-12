import { inicioServicios } from "./crearInicio.js";
import { listaCampeones } from "./menu.js";
import { sorteoServicio } from "./sortearCampeones.js";

const eliminarJuegoF = () => {

    const main = document.querySelector("[data-main]");
    main.className = "easeIn";
    main.innerHTML = "";

}

const crearPuntuacion = () => {
    const section = document.createElement("section");
    section.className = "puntuacion";

    const div = document.createElement("div");
    div.className = "puntuacion__container";

    const p = document.createElement("p");
    p.innerHTML = `Puntuación <span class="puntuacion__numero">0</span>`;

    const p2 = document.createElement("p");
    p2.className = "puntuacion__intentos";
    p2.innerHTML = `Intentos <span class ="intentos__numero">1/3</span>`;

    const main = document.querySelector("[data-main]");

    div.appendChild(p);
    div.appendChild(p2);
    section.appendChild(div);
    main.appendChild(section);
}

const crearOpcion = (nombre) => {

    const opcion = document.createElement("p");
    opcion.className = "juegof__opcion";
    opcion.dataset.content = nombre;
    return opcion

}

const crearVolver = () => {
    
    const section = document.createElement("section");
    section.className = "return";
    section.innerHTML = `<p class="volverMenu"></p>`;
    section.addEventListener("click", () => {

        const main = document.querySelector("[data-main]");
        main.className = "easeOut";

        setTimeout(()=> {

            eliminarJuegoF();
            inicioServicios.crearInicio();

        }, 1000);
        
    })
    const main = document.querySelector("[data-main]");
    main.appendChild(section);
}

const actualizarListaFrase = (lista,numCamp,fraseC) => {

    lista[numCamp].frases.forEach((frase)=> {
        //console.log(frase);
        //console.log(fraseC);
        if(fraseC == frase){
            let index = lista[numCamp].frases.indexOf(frase);  
            //console.log(lista[numCamp].frases);
            //console.log(index);
            lista[numCamp].frases.splice(index,1);
            //console.log(lista[numCamp].frases);
            //console.log(lista);
        }
    })

    console.log("Frases length", lista[numCamp].frases.length);

    if (lista[numCamp].frases.length == 0){
        console.log("true");
        lista.splice(numCamp,1);
    }

}

const crearJuegoF = (lista) => {

    let numcampeonCorrecto = sorteoServicio.seleccionarCampeonAleatorio(lista);
    let campeonCorrecto = lista[numcampeonCorrecto];
    //console.log(lista);
    //console.log(numcampeonCorrecto);
    //console.log(lista[numcampeonCorrecto]);
    let numFrase = sorteoServicio.seleccionarFraseAleatoria(campeonCorrecto);
    //console.log(campeonCorrecto);
    //console.log(numFrase);
    let fraseCampeonCorrecto = campeonCorrecto.frases[numFrase];
    //console.log("La frase correcta es ", fraseCampeonCorrecto);
    actualizarListaFrase(lista,numcampeonCorrecto,fraseCampeonCorrecto);
    console.log(numcampeonCorrecto);
    console.log("Lista actualizada", lista);
    

    let campeones = [campeonCorrecto.nombre];

    for (let i=0; i<3; i++){
        let nombre = sorteoServicio.seleccionarNombreAleatorioIncorrecto(lista);
        campeones.push(nombre);
    }

    console.log(campeones)

    const main = document.querySelector("[data-main]");
    main.className = "easeIn"

    const section = document.createElement("section");
    section.className = "juegof";

    const img = document.createElement("img");
    img.className = "juegof__img";
    img.src = "assets/img/campeon300x300.png";
    
    const contenedor = document.createElement("div");
    contenedor.className = "juegof__opciones";


    const frase = document.createElement("p");
    frase.className = "juegof__frase";
    frase.dataset.content = "La espada sombría es la mas mortifera"
    

   

   
    const op = crearOpcion(campeonCorrecto.nombre);
    

    contenedor.appendChild(frase);
    contenedor.appendChild(op);
    
    section.appendChild(img);
    section.appendChild(contenedor);
    main.appendChild(section);
}

export const juegofServicios = {
    crearJuegoF, crearOpcion, crearPuntuacion, crearVolver, eliminarJuegoF
}

