

const apiKey = 'd3c39f57206d5904890771c822ffaac3';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const inputCiudad = document.querySelector('.search input');
const searchButton = document.getElementById('searchButton');
const errorDiv = document.querySelector('.error');
const weatherDiv = document.querySelector('.weather');

searchButton.addEventListener('click', function () {
    const ciudad = inputCiudad.value.trim();
        // si en el buscador la ciudad es distinta a vacio hacer la consulta, se guarda informacion en "data"
    if (ciudad !== '') {
        errorDiv.style.display = 'none';

        const url = `${apiUrl}${ciudad}&appid=${apiKey}`;

        axios.get(url)
        .then(response => {
                const data = response.data;
                mostrarInfoClima(data);
                })
                .catch(error => {
                    //si no fue valida la peticion mostrar error
                    console.error(`Error al obtener el clima: ${error.message}`);
                    mostrarError();
                });
    } else {
        mostrarError();
        }
    });

function mostrarInfoClima(data) {
        //"Mostrar la informacion"
        weatherDiv.style.display = 'block';

        //cargar cada queryselector que se va a modificar, se hace una pequeña modificacion en el html
        //se usa la variable iconoClima para saber el icono consultando y obteniendo un texto, luego se cambia a un texto para el src de la imagen
        //luego se usa los if para poner la imagen adecuada

        const icono = document.querySelector('.weather-icon');
        const temperatura = document.querySelector('.temp');
        const nombre = document.querySelector('.city');
        const humedad = document.querySelector('.humidity');
        const viento = document.querySelector('.wind');
        

        // Actualizar elementos con la información del clima
        icono.textContent=data.weather[0].main;
        if (icono.textContent=='Clouds'){
            icono.src='images/clouds.png';
        }
        else if(icono.textContent=='Clear'){
            icono.src='images/clear.png';
        }
        else if(icono.textContent=='Snow'){
            icono.src='images/snow.png';
        }
        else if(icono.textContent=='Drizzle'){
            icono.src='images/drizzle.png';
        }
        else if(icono.textContent=='Mist'){
            icono.src='images/mist.png';
        }
        else if(icono.textContent=='Rain'){
            icono.src='images/rain.png';
        }
        //Se carga la informacion
        icono.text = data.weather[0].main;
        temperatura.textContent = `${Math.round(data.main.temp)}°C`;

        nombre.textContent = data.name;
        humedad.textContent = `${data.main.humidity}%`;
        viento.textContent = `${data.wind.speed} km/h`;
}

function mostrarError() {
        weatherDiv.style.display = 'none';
        errorDiv.style.display = 'block';
}



