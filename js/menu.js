import campeon from "../db.json" assert { type: "json" };

import { inicioServicios } from "./crearInicio.js";

export const listaCampeones = campeon.campeon;
console.log(listaCampeones);
console.log(listaCampeones[0].frases[0]);
console.log(listaCampeones[0].imagen[0][0]) //elijo campeon,imagen,par ordenado, componente
console.log(listaCampeones[0].audios[0]);




const pp = () => {

    inicioServicios.crearInicio();
}

pp();


/*
crearJuegoF();
crearPuntuacion();
crearVolver();

*/
//crearInicio ();
