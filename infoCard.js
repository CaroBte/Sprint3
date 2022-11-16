//Traemos la constante de API
const API = "http://localhost:3000/propiedades"

let response; //La declaro afuera para usarla después de ejecutar la función

//Función para traer info del server.json
const traerPropiedades = async () => {
    try {
        let peticion = await fetch(API)
        response = await peticion.json()
        traerInfo(); //Ejecuto traer info para que con el array response
        //se muestre la info en el html
    } catch (error) {
        console.log("Se encontró un error" + error)
    }
}

traerPropiedades(); //Invoco para que funcione XD

//Función para traer el id de la card seleccionada del localStorage

const traerInfo = () => {
    let data = JSON.parse(localStorage.getItem("dataJSON"))
    //Obtener id y lo parseamos
    let arr = response.filter((element) => {
        // Filtramos el array response, que traemos del server.json en uno nuevo (arr)
        //comparando los id
        return element.id == data
    })

    //Seleccionamos dónde mostrar la info en el HTML y reemplazamos los datos con los que
    //tenemos en el nuevo array (arr), siempre será [0] porque solo trae un objeto.

    let divContainer = document.querySelector(".container")
    divContainer.innerHTML =
        `<div class="info-property">
        <p class="name-property">${arr[0].name}</p>
        <span class="type-status-price">${arr[0].type}, ${arr[0].status}, ${arr[0].price}</span>
        <span class="location-property">${arr[0].location}</span>
        <p class="description-property">${arr[0].description}</p>
        <div class="iconos-property">
            <img src="./styles/3Hot Deal/Area Icon.png">
            <span class="area-property">${arr[0].area}</span>

            <img src="./styles/3Hot Deal/Garage Icon.png">
            <span class="garage-property">${arr[0].parking}</span>

            <img src="./styles/3Hot Deal/Bathroom Icon.png">
            <span class="baths-property">${arr[0].bathrooms}</span>

            <img src="./styles/3Hot Deal/Bedroom Icon.png">
            <span class="beds-property">${arr[0].rooms}</span>
        </div>
        <span class="agent-property">${arr[0].agent.name}:${arr[0].agent.telefono}</span>
    </div>
    <div class="img-property"><img src="${arr[0].image}"></div>`

    /*  Otra manera de escribirlo en el HTML:
    
        document.querySelector(".name-property").innerHTML = arr[0].name
        document.querySelector(".type-status-price").innerHTML = `${arr[0].type}  ${arr[0].status}  ${arr[0].price}`
        document.querySelector(".location-property").innerHTML = arr[0].location
        document.querySelector(".description-property").innerHTML = arr[0].description
        document.querySelector(".area-property").innerHTML = arr[0].area
        document.querySelector(".garage-property").innerHTML = arr[0].parking
        document.querySelector(".baths-property").innerHTML = arr[0].bathrooms
        document.querySelector(".beds-property").innerHTML = arr[0].rooms
        document.querySelector(".agent-property").innerHTML = ` ${arr[0].agent.name} ${arr[0].agent.telefono}`
        document.querySelector(".img-property").innerHTML = `<img src="${arr[0].image}">` */
}






