import { inicioServicios } from "./crearInicio.js";
import { listaCampeones } from "./menu.js";
import { sorteoServicio } from "./sortearCampeones.js";

var puntajeActual = 0;
var cantidadError = 0;

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
    p2.innerHTML = `Intentos <span class ="intentos__numero">0/3</span>`;

    const main = document.querySelector("[data-main]");

    div.appendChild(p);
    div.appendChild(p2);
    section.appendChild(div);
    main.appendChild(section);
}


const crearOpcion = (nombre, nombreCorrecto, imgCampeonCorrecto) => {

    const opcion = document.createElement("p");
    opcion.className = "juegof__opcion";
    opcion.dataset.content = nombre;

    if (nombre == nombreCorrecto){
        opcion.addEventListener("click", ()=> {
        
            puntajeActual = puntajeActual + 100;

            const puntuador = document.querySelector(".puntuacion__numero");
            puntuador.innerHTML = puntajeActual;

            opcion.classList.add("opcion__acertada");

            const opciones = document.querySelectorAll(".juegof__opcion");
            
                opciones.forEach((opcion)=>{
                   
                    opcion.classList.add("opcion__deshabilitada"); 
                })

            const img = document.querySelector(".juegof__img");
            img.classList.remove("juegof__img");
            img.classList.add("juegof__imgCorrecta");
            img.src = imgCampeonCorrecto;
            
        
        }, {once: true})
    }else {
        opcion.addEventListener("click", ()=> {

            if (cantidadError <3){

                cantidadError++;
                const error = document.querySelector(".intentos__numero")
                error.innerHTML = `${cantidadError}/3`;
            } else {

            }
        })
    }


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

const puntajeMax = (x,y) => {

    if(x>y)
        return true
     else return false

}

const crearJuegoF = (lista,jugando) => {
    
    if (!jugando){
        puntajeActual = 0;
        cantidadError = 0;
    }


    let numcampeonCorrecto = sorteoServicio.seleccionarCampeonAleatorio(lista);
    let campeonCorrecto = lista[numcampeonCorrecto];
    let numFrase = sorteoServicio.seleccionarFraseAleatoria(campeonCorrecto);
    let fraseCampeonCorrecto = campeonCorrecto.frases[numFrase];
    let imgCampeonCorrecto = campeonCorrecto.imagen[0][0];
    console.log(imgCampeonCorrecto);
    
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
    frase.dataset.content = fraseCampeonCorrecto;
  
    const op1 = crearOpcion(campeones[0], campeonCorrecto.nombre, imgCampeonCorrecto);
    const op2 = crearOpcion(campeones[1], campeonCorrecto.nombre, imgCampeonCorrecto);
    const op3 = crearOpcion(campeones[2], campeonCorrecto.nombre, imgCampeonCorrecto);
    const op4 = crearOpcion(campeones[3], campeonCorrecto.nombre, imgCampeonCorrecto);
    
    contenedor.appendChild(frase);
    contenedor.appendChild(op1);
    contenedor.appendChild(op2);
    contenedor.appendChild(op3);
    contenedor.appendChild(op4);
    
    section.appendChild(img);
    section.appendChild(contenedor);
    main.appendChild(section);

}

export const juegofServicios = {
    crearJuegoF, crearOpcion, crearPuntuacion, crearVolver, eliminarJuegoF
}

