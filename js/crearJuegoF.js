import { inicioServicios } from "./crearInicio.js";
import { listaCampeones } from "./menu.js";
import { sorteoServicio } from "./sortearCampeones.js";

var puntajeActual = 0;
var cantidadError = 0;
var frasesAcertadas = [];

const eliminarJuegoF = () => {

    const main = document.querySelector("[data-main]");
    main.className = "easeIn";
    main.innerHTML = "";

}

const actualizarBarra = () => {

    let porcentaje = (puntajeActual/calcularTamañoListaFrases());
    porcentaje = porcentaje * 100;
    porcentaje = parseFloat(porcentaje).toFixed(2);
    
    const x = document.querySelector(".barraC__barra");
    x.innerHTML = `${porcentaje}%`
    x.style = `width:${porcentaje}%`;
}

const crearBarraProgreso = () => {
    
    const barraC = document.createElement("section");
    barraC.className = "puntuacion__barraC";
    
    const barra = document.createElement("div");
    barra.className = "barraC__barra";
    barra.style =`width:0%`;
    barra.innerHTML = "0%";
   
    barraC.appendChild(barra);
    return barraC


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

    const barra = crearBarraProgreso();

    div.appendChild(p);
    div.appendChild(p2);
   
    section.appendChild(barra);
    section.appendChild(div);
    main.appendChild(section);
}



const crearOpcion = (nombre, nombreCorrecto, imgCampeonCorrecto,lista,jugando,frase) => {

    const opcion = document.createElement("p");
    opcion.className = "juegof__opcion";
    opcion.dataset.content = nombre;

    if (nombre == nombreCorrecto){
        opcion.addEventListener("click", ()=> {
        
            puntajeActual = puntajeActual + 1;

            frasesAcertadas.push(frase);

            const puntuador = document.querySelector(".puntuacion__numero");
            puntuador.innerHTML = puntajeActual*100;

            opcion.classList.add("opcion__acertada");
            const opciones = document.querySelectorAll(".juegof__opcion");
                opciones.forEach((opcion)=>{
                   
                    opcion.classList.add("opcion__deshabilitada"); 
                })

            const img = document.querySelector(".juegof__img");
            img.classList.remove("juegof__img");
            img.classList.add("juegof__imgCorrecta");
            img.src = imgCampeonCorrecto;

            const siguiente = document.querySelector(".siguiente");
            siguiente.classList.add("siguiente__hab");
            
            actualizarBarra();

            siguiente.addEventListener("click", ()=> {

                if(calcularTamañoListaFrases()==0){

                } else {
                    document.querySelector(".juegof").remove();
                    crearJuegoF(lista,jugando);
                }
              

            })
            
        
        }, {once: true})
    }else {
        opcion.addEventListener("click", ()=> {

            if (cantidadError <2){
                cantidadError++;
                const error = document.querySelector(".intentos__numero");
                error.innerHTML = `${cantidadError}/3`;
                if(cantidadError == 2){
                    error.classList.add("intentos__numeroMargen");
                }
            } else {
                
                cantidadError++;
                const error = document.querySelector(".intentos__numero")
                error.innerHTML = `${cantidadError}/3`;
                const opciones = document.querySelectorAll(".juegof__opcion");
            
                opciones.forEach((opcion)=>{
                   
                    opcion.classList.add("opcion__deshabilitada");
                    
                    if(opcion.dataset.content == nombreCorrecto){
                        opcion.classList.add("opcion__acertada");
                    }else {
                        opcion.classList.add("opcion__erronea");
                    }

                })

                console.log("GAME OVER");

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

const calcularTamañoListaFrases = ()=> {
   
    let cantidad = 0;
    for (let i=0; i< listaCampeones.length; i++){
        cantidad = cantidad +listaCampeones[i].frases.length  
    }

    
    
    return cantidad

}

const seEncuentraEnFrasesAcertadas = (fraseEncontrada) => {

    if (frasesAcertadas.length == 0){
        return false
    }

 for (let i=0; i< frasesAcertadas.length; i++){
     if (fraseEncontrada == frasesAcertadas[i]){
         return true
     }
 }

 return false

}

const crearJuegoF = (lista,jugando) => {
    
    if (!jugando){
        puntajeActual = 0;
        cantidadError = 0;
        jugando = true;
        frasesAcertadas = [];
        crearPuntuacion();
        crearVolver();    
    }

  

    if (puntajeActual == calcularTamañoListaFrases()){
        console.log("Completaste todos los campeones FALTA AGREGAR FIN");
    } else {

    let numcampeonCorrecto ;
    let campeonCorrecto ;
    let numFrase ;
    let fraseCampeonCorrecto ; //aca está el problema, frase undefined
    let imgCampeonCorrecto ;
    let bandera = false;

    while(bandera == false){
        numcampeonCorrecto = sorteoServicio.seleccionarCampeonAleatorio(lista);
        campeonCorrecto = lista[numcampeonCorrecto];
        numFrase = sorteoServicio.seleccionarFraseAleatoria(campeonCorrecto);
        fraseCampeonCorrecto = campeonCorrecto.frases[numFrase];
        
       if (seEncuentraEnFrasesAcertadas(fraseCampeonCorrecto) == false){
           bandera = true;
       }
    }
    
 
    imgCampeonCorrecto = campeonCorrecto.imagen[0][0];
        
    
    let campeones = [campeonCorrecto.nombre];

    
    
    while(campeones.length<4){
        let nombre = lista[Math.floor(Math.random()*lista.length)].nombre;

        if(verificarOpciones(nombre,campeones) && campeonCorrecto.nombre != nombre){
            campeones.push(nombre);
            
        }
    }

    campeones = sorteoServicio.mezclarArray(campeones);
    

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
  
   

    const op1 = crearOpcion(campeones[0], campeonCorrecto.nombre, imgCampeonCorrecto,lista,jugando,fraseCampeonCorrecto);
    const op2 = crearOpcion(campeones[1], campeonCorrecto.nombre, imgCampeonCorrecto,lista,jugando,fraseCampeonCorrecto);
    const op3 = crearOpcion(campeones[2], campeonCorrecto.nombre, imgCampeonCorrecto,lista,jugando,fraseCampeonCorrecto);
    const op4 = crearOpcion(campeones[3], campeonCorrecto.nombre, imgCampeonCorrecto,lista,jugando,fraseCampeonCorrecto);

    const i = document.createElement("i");
    i.classList.add("fa-solid", "fa-arrow-right", "siguiente");
    
    contenedor.appendChild(frase);
    contenedor.appendChild(op1);
    contenedor.appendChild(op2);
    contenedor.appendChild(op3);
    contenedor.appendChild(op4);
    
    section.appendChild(img);
    section.appendChild(contenedor);
    section.appendChild(i);
    main.insertAdjacentElement("afterbegin",section);


    }

}

export const juegofServicios = {
    crearJuegoF, crearOpcion, crearPuntuacion, crearVolver, eliminarJuegoF
}

