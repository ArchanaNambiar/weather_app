const apiKey = '7dca31013fe6b77384e6c18d8b9abe99';
const weatherCards = [];

function fetchWeather(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if(data.message === 'city not found'){
                return;
            }
            const weatherData = {
                city: data.name,
                temperature: Math.round(data.main.temp),
                weather: data.weather[0].main,
                icon: data.weather[0].icon,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                windSpeed: data.wind.speed,
                max_temp: Math.round(data.main.temp_max),
                min_temp: Math.round(data.main.temp_min),
                description:data.weather[0].description,
                main:data.weather[0].main,
                country:data.sys.country

            };

            addWeatherCard(weatherData);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function addWeatherCard(data) {
    weatherCards.push(data);
    weatherCards.sort((a, b) => a.temperature - b.temperature);

    const weatherCardsContainer = document.getElementById('weatherCards');
    weatherCardsContainer.innerHTML = '';

    weatherCards.forEach(cardData => {
        const card = document.createElement('div');
         card.className = 'weather-card';
        //card.className = 'card';

        

        const details = document.createElement('div');
        details.className = 'weather-details';
        
        details.innerHTML = `
        <div class="left-sec">
                                <h2>${cardData.temperature}°</h2>
                                <p class="lh"><span>H:${cardData.max_temp}°</span>  <span>L:${cardData.min_temp}°</span></p>
                                <p>${cardData.city},${cardData.country}</p>
                            </div>
                            
                            <div >
                               <div class="right-sec ${cardData.main}"></div>
                                <p>${cardData.description}</p>
                            </div>
        
    `;

       
        card.appendChild(details);
        weatherCardsContainer.appendChild(card);
    });
}

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();

    if (cityName !== '' && weatherCards.every(card => card.city.toLowerCase() !== cityName.toLowerCase())) {
        fetchWeather(cityName);
        cityInput.value = '';
    }
});
