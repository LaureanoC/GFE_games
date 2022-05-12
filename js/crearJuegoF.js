import { inicioServicios } from "./crearInicio.js";
import {listaCampeones} from "../js/menu.js"

const eliminarJuegoF = () => {

    const main = document.querySelector("[data-main]");
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
    opcion.innerHTML = `${nombre}`;
    return opcion

}

const crearVolver = () => {
    
    const section = document.createElement("section");
    section.className = "return";
    section.innerHTML = `<p class="volverMenu">Volver al menu principal</p>`;
    section.addEventListener("click", () => {
        eliminarJuegoF();
        inicioServicios.crearInicio();
    })
    const main = document.querySelector("[data-main]");
    main.appendChild(section);
}

const crearJuegoF = () => {

    const main = document.querySelector("[data-main]");
    
    const section = document.createElement("section");
    section.className = "juegof";

    const img = document.createElement("img");
    img.className = "juegof__img";
    img.src = "assets/img/campeon300x300.png";
    
    const contenedor = document.createElement("div");
    contenedor.className = "juegof__opciones";

    const frase = document.createElement("p");
    frase.className = "juegof__frase";
    frase.innerHTML = "La espada sombría es la mas mortifera";

    const op1 = crearOpcion("Zed");
    const op2 = crearOpcion("Yasuo");
    const op3 = crearOpcion("Aatrox");
    const op4 = crearOpcion("Tristana");

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

