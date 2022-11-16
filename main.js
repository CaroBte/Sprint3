console.log("Hola mundo");

//Traemos la constante de API
const API = "http://localhost:3000/propiedades"

//Función para traer todas las propiedades e imprimirlas en el HTML

let response; //La declaro afuera para usarla después de ejecutar la función

const traerPropiedades = async () => {
    try {
        let peticion = await fetch(API)
        response = await peticion.json()
        crearTarjetas(response)

    } catch (error) {
        console.log("Se encontró un error" + error)
        cardsDiv.innerHTML = "Sorry, our database is not available at the moment. Please try again "
    }
}

//Función para crear las tarjetas

const cardsDiv = document.querySelector("#cards-div");
const crearTarjetas = (_data) => {
    if (_data.length == 0) {
        //Si el array está vacío porque la selección no encuentra propiedades... 
        cardsDiv.innerHTML = "<h1>Sorry, the requested property was not found</h1>"
    } else {
        cardsDiv.innerHTML = "";
        _data.forEach(element => {
            let cards = document.createElement("div")
            //cards.classList.add("cards"); otra forma de crearle clase a un elemento HTML
            const { id, type, status, name, location, price, agent, image, area, bathrooms, rooms, parking } = element
            cards.setAttribute("class", "cards")
            cards.setAttribute("onclick", `guardarInfo(${id})`)
            cards.innerHTML = `
        <a href="./infoCard.html">
            <div class ="cards-img">
                <img src=${image}>
                <div class= "btns">
                <button class="btn-type">${type}</button>
                <button class="btn-status">${status}</button>
                </div>
                <button class="btn-fav">❤</button>
                <button class="btn-price">${price}</button>
            </div>
            <div class="cards-info">
                <div class="info-container">
                    <span class="span-location">${location}</span>
                    <p class="p-name">${name}</p>
                    <span class="p-agent">${agent.name}</span>
                    <div class="iconos">
                        <img src="./styles/2featured properties/Area_Icon.svg">
                        <span class="icon-area">${area}</span>

                        <img src="./styles/2featured properties/Garage_Icon.svg">
                        <span class="icon-garage">${parking}</span>

                        <img src="./styles/2featured properties/Bathroom_Icon.svg">
                        <span class="icon-baths">${bathrooms}</span>

                        <img src="./styles/2featured properties/Bedroom_Icon.svg">
                        <span class="icon-beds">${rooms}</span>
                    </div>
                </div>
            </div>
        </a>`
            cardsDiv.appendChild(cards); //agregó los div de las cards creadas al contenedor
        })
    }
}

traerPropiedades(); //ejecuto la función para obtener la info del JSON-SERVER,
//Después de ejecutar esta función, response ya tiene el array

//Función para filtrar e imprimir tarjetas según inputs c:

const btnFind = document.querySelector("#btn-find")
const locationSelect = document.querySelector("#location")
const typeSelect = document.querySelector("#type")

btnFind.addEventListener("click", () => {
    let tempArray = [] //Nuevo array con el que se imprimirán las cards filtradas
    response.forEach(item => {
        if (locationSelect.value != "" && typeSelect.value != "") { //Ambas selecciones
            if (locationSelect.value == item.location && typeSelect.value == item.type) {
                tempArray.push(item)
            }

        } else if (locationSelect.value != "") { //Selección por location
            if (locationSelect.value == item.location) {
                tempArray.push(item)
            }

        } else if (typeSelect.value != "") { //Selección por type
            if (typeSelect.value == item.type) {
                tempArray.push(item)
            }
        }
    })

    if (locationSelect.value == "" && typeSelect.value == "") {
        //Si no selecciona nada y clickea el btn, crear todas las cards
        crearTarjetas(response)
    } else { crearTarjetas(tempArray) } //Si seleccionó algo, crear cards filtradas.
})

//Vamos a guardar en localStorage el id de las Cards cuando demos click (linea 36)
function guardarInfo(_id) {
    let dataJSON = JSON.stringify(_id)
    localStorage.setItem("dataJSON", dataJSON)
    console.log(localStorage)
}