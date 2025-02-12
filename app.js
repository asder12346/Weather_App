const apiKey = '0bbc44f6751ef4eb134158e0040b2b1b'; // api key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

function getWeather() {
    const city = document.getElementById('city').value;
    if (city === '') {
        document.getElementById('error-message').innerText = 'Please enter a city name';
        return;
    }
    
    fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                document.getElementById('error-message').innerText = 'City not found. Please try again.';
                return;
            }
            document.getElementById('city-name').innerText = data.name;
            document.getElementById('temp').innerText = data.main.temp;
            document.getElementById('humidity').innerText = data.main.humidity;
            document.getElementById('wind').innerText = data.wind.speed;
            document.getElementById('description').innerText = data.weather[0].description;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            document.getElementById('error-message').innerText = '';
        })
        .catch(error => {
            document.getElementById('error-message').innerText = 'Error fetching data. Please try again later.';
            console.error('Error:', error);
        });
}