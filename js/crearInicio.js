
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

    const card1 = crearCardInicio(img1,"Campeón por frase");
    const card2 = crearCardInicio(img2, "Campeón por imagen");
    const card3 = crearCardInicio(img3, "Campeón por audio");

    container.appendChild(titulo);
    container.appendChild(card1);
    container.appendChild(card2);
    container.appendChild(card3);
    main.appendChild(container);

}

crearInicio ();