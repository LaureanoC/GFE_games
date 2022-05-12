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

const actualizarListaFrase = (l,numCamp,fraseC) => {

    l[numCamp].frases.forEach((frase)=> {
        
        if(fraseC == frase){
            let index = l[numCamp].frases.indexOf(frase);  
            
            l[numCamp].frases.splice(index,1);
           
        }
    })

    if (l[numCamp].frases.length == 0){
        l.splice(numCamp,1);
    }

}

const verificarOpciones = (nombre,campeones) => {

    for(let i=0; i<campeones.length; i++){
        if(nombre == campeones[i]){
            return false;
        }
    }

    return true

}

const crearJuegoF = (lista) => {
    
    let numcampeonCorrecto = sorteoServicio.seleccionarCampeonAleatorio(lista);
    let campeonCorrecto = lista[numcampeonCorrecto];
    let numFrase = sorteoServicio.seleccionarFraseAleatoria(campeonCorrecto);
    let fraseCampeonCorrecto = campeonCorrecto.frases[numFrase];
    
    actualizarListaFrase(lista,numcampeonCorrecto,fraseCampeonCorrecto);
   
    let campeones = [campeonCorrecto.nombre];
    
    while(campeones.length<4){
        let nombre = lista[Math.floor(Math.random()*lista.length)].nombre;

        if(verificarOpciones(nombre,campeones) && campeonCorrecto.nombre != nombre){
            campeones.push(nombre);
            
        }
    }

    campeones = sorteoServicio.mezclarLista(campeones);
    

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
    frase.dataset.content = fraseCampeonCorrecto
    

   
    const op1 = crearOpcion(campeones[0]);
    const op2 = crearOpcion(campeones[1]);
    const op3 = crearOpcion(campeones[2]);
    const op4 = crearOpcion(campeones[3]);
    

    contenedor.appendChild(frase);
    contenedor.appendChild(op1);
    contenedor.appendChild(op2);
    contenedor.appendChild(op3);
    contenedor.appendChild(op4);
    
    section.appendChild(img);
    section.appendChild(contenedor);
    main.appendChild(section);

    const opcionCorrecta = document.querySelector(`[data-content="${campeonCorrecto.nombre}"]`);
    opcionCorrecta.addEventListener("click", ()=> {
        console.log("Esta el la opcion correcta");
    })
}

export const juegofServicios = {
    crearJuegoF, crearOpcion, crearPuntuacion, crearVolver, eliminarJuegoF
}

