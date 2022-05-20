import { juegofServicios } from "./crearJuegoF.js";
import { listaCampeones } from "./menu.js";
import { sorteoServicio } from "./sortearCampeones.js";

const eliminarInicio = () => {
    const main = document.querySelector("[data-main]");
    main.innerHTML = "";
    main.classList.remove("easeOut");
}

const crearCardInicio = (imgurl,seccion) => {

    const card = document.createElement("a");
    card.className = "main__card";

    const img = document.createElement("img");
    img.src = imgurl;
    const p = document.createElement("p");
    p.className = "card__nombre";
    p.innerHTML = seccion;

    card.appendChild(img);
    card.appendChild(p);

    return card
}

const crearInicio = () => {
    const main = document.querySelector("[data-main]");
    const container = document.createElement("div");
    container.className = "main__container";

    const titulo = document.createElement("h1");
    titulo.className = "main__titulo";

    const img1 = "https://res.cloudinary.com/laureano/image/upload/v1652248330/Jefesito%20Games/med-yasuo_ccbiuc.png"
    const img2 = "https://res.cloudinary.com/laureano/image/upload/v1652248330/Jefesito%20Games/med-teemo_r0cj0e.png";
    const img3 = "https://res.cloudinary.com/laureano/image/upload/v1652248328/Jefesito%20Games/med-riven_vrkpfi.png"
   

// EVENTOS DE CADA CARD


    const card1 = crearCardInicio(img1,"Campeón por frase");
    card1.id = "porfrase";
    card1.addEventListener("click", ()=>  {

        const main = document.querySelector("[data-main]");
        main.className = "easeOut";

        setTimeout(()=> {
        
        eliminarInicio();
        let lista = [];
        listaCampeones.forEach((campeon)=> {
            lista.push(campeon);
        })
        var jugando = false;
        sorteoServicio.mezclarLista(lista);
        
        
        juegofServicios.crearJuegoF(lista,jugando);
        
        
        },1000);
    })
        
        
    
    const card2 = crearCardInicio(img2, "Campeón por imagen");
    card2.id = "porimagen"
    const card3 = crearCardInicio(img3, "Campeón por audio");
    card3.id = "poraudio";


    const puntuaciones = document.createElement("section");
    puntuaciones.className = "puntuaciones";
    
    const tituloP = document.createElement("h2");
    tituloP.className = "puntuaciones__titulo"
    tituloP.innerHTML = "Tus puntuaciones máximas"

    const p = document.createElement("p");
    p.className = "puntuaciones__parrafo"
    p.innerHTML = `Campeón por frase:  <span style="font-weight:700">700</span>`;

    const p1 = document.createElement("p");
    p1.className = "puntuaciones__parrafo"
    p1.innerHTML = `Campeón por imagen:  <span style="font-weight:700">0</span>`;

    const p2 = document.createElement("p");
    p2.className = "puntuaciones__parrafo"
    p2.innerHTML = `Campeón por audio:  <span style="font-weight:700">0</span>`;

    puntuaciones.appendChild(tituloP);
    puntuaciones.appendChild(p);
    puntuaciones.appendChild(p1);
    puntuaciones.appendChild(p2);


    container.appendChild(titulo);
    container.appendChild(card1);
    container.appendChild(card2);
    container.appendChild(card3);
    main.appendChild(container);
    main.appendChild(puntuaciones);

}

export const inicioServicios = {
    crearCardInicio, crearInicio
}
