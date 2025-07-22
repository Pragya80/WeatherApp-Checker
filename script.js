const API_KEY = 'aa79d11c0c409afba413695c8787e3ed';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const cityInput = document.getElementById('cityInput');
const CheckBtn = document.getElementById('getWeatherBtn');
const voiceSearchBtn = document.getElementById('voiceSearchBtn');
const currentWeatherDiv = document.getElementById('currentWeather');
const currentCity = document.getElementById('currentCity');
const currentTemp = document.getElementById('currentTemp');
const currentFahrenheitTemp = document.getElementById('currentFahrenheitTemp');
const currentDescription = document.getElementById('currentDescription');
const currentHumidityWind = document.getElementById('currentHumidityWind');
const forecastDiv = document.getElementById('forecast');
const forecastContainer = document.getElementById('forecastContainer');
const errorMessageDiv = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const body = document.body;
const cloudsContainer = document.getElementById('cloudsContainer');

const movableIllustration = document.getElementById('movableIllustration');

const cloudyPenguinImageUrl = "https://media.tenor.com/y8Z1af-BApwAAAAj/pengu-pudgy.gif";
const rainyPenguinGifUrl = "https://media.tenor.com/A1w3-6Cr8esAAAAi/pengu-pudgy.gif";
const snowGifUrl = "https://media.tenor.com/ZCgC8-x_HXQAAAAi/snow-winter.gif";
const clearSkyGifUrl = "https://media.tenor.com/qY_nWadrincAAAAi/pengu-pudgy.gif";
const thunderstormGifUrl = "https://media.tenor.com/cvzylG68rRYAAAAi/winter-rain.gif";


function getWeatherIconSVG(weatherMain) {
    const lowerCaseWeather = weatherMain.toLowerCase();
    let svgPath = '';

    if (lowerCaseWeather.includes('clear')) {
        svgPath = '<circle cx="25" cy="25" r="10" fill="currentColor"/><path d="M25 0v5M0 25h5M25 50v-5M50 25h-5M42.07 7.93l-3.54 3.54M7.93 42.07l3.54-3.54M42.07 42.07l-3.54-3.54M7.93 7.93l3.54 3.54" stroke="currentColor" stroke-width="2"/>';
    } else if (lowerCaseWeather.includes('cloud')) {
        svgPath = '<path d="M40 20c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 0-5 0-5 5s5 5 5 5h24c0 0 5 0 5-5s-5-5-5-5z" fill="currentColor"/>';
    } else if (lowerCaseWeather.includes('rain') || lowerCaseWeather.includes('drizzle')) {
        svgPath = '<path d="M40 20c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 0-5 0-5 5s5 5 5 5h24c0 0 5 0 5-5s-5-5-5-5z" fill="currentColor"/><circle cx="15" cy="35" r="2" fill="currentColor"/><circle cx="25" cy="40" r="2" fill="currentColor"/><circle cx="35" cy="35" r="2" fill="currentColor"/>';
    } else if (lowerCaseWeather.includes('thunderstorm')) {
        svgPath = '<path d="M25 30l-5 10h10l-5 10" stroke="currentColor" stroke-width="2" fill="none"/>';
    } else if (lowerCaseWeather.includes('snow')) {
        svgPath = '<path d="M40 20c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 0-5 0-5 5s5 5 5 5h24c0 0 5 0 5-5s-5-5-5-5z" fill="currentColor"/><circle cx="20" cy="35" r="2" fill="currentColor"/><circle cx="30" cy="35" r="2" fill="currentColor"/><circle cx="25" cy="40" r="2" fill="currentColor"/>';
    } else if (lowerCaseWeather.includes('mist') || lowerCaseWeather.includes('fog') || lowerCaseWeather.includes('haze') || lowerCaseWeather.includes('smoke') || lowerCaseWeather.includes('dust') || lowerCaseWeather.includes('sand') || lowerCaseWeather.includes('ash') || lowerCaseWeather.includes('squall') || lowerCaseWeather.includes('tornado')) {
        svgPath = '<path d="M40 20c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 0-5 0-5 5s5 5 5 5h24c0 0 5 0 5-5s-5-5-5-5z" fill="currentColor"/><path d="M10 35h30M15 40h20" stroke="currentColor" stroke-width="2"/>';
    } else {
        svgPath = '<rect x="10" y="10" width="30" height="30" fill="currentColor"/><circle cx="25" cy="20" r="5" fill="#FFFFFF"/><rect x="23" y="28" width="4" height="8" fill="#FFFFFF"/><circle cx="25" cy="39" r="2" fill="#FFFFFF"/>';
    }

    return `<svg class="forecast-icon-svg" viewBox="0 0 50 50">${svgPath}</svg>`;
}

function showErrorMessage(message) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.classList.remove('hidden');
}

function hideErrorMessage() {
    errorMessageDiv.classList.add('hidden');
}

function showLoadingSpinner() {
    loadingSpinner.style.display = 'block';
}

function hideLoadingSpinner() {
    loadingSpinner.style.display = 'none';
}

function updateBackground(weatherMain) {
    body.classList.remove(
        'weather-clear', 'weather-clouds', 'weather-rain', 'weather-thunderstorm',
        'weather-snow', 'weather-drizzle', 'weather-mist', 'weather-fog', 'weather-haze',
        'weather-smoke', 'weather-dust', 'weather-sand', 'weather-ash', 'weather-squall', 'weather-tornado'
    );

    cloudsContainer.classList.remove('active');

    const lowerCaseWeather = weatherMain.toLowerCase();

    body.style.backgroundColor = '#FFD700';
    body.style.backgroundImage = 'none';

    movableIllustration.classList.add('hidden');
    movableIllustration.src = '';

    if (lowerCaseWeather.includes('clear')) {
        body.classList.add('weather-clear');
        movableIllustration.src = clearSkyGifUrl;
        movableIllustration.classList.remove('hidden');
    } else if (lowerCaseWeather.includes('cloud')) {
        body.classList.add('weather-clouds');
        cloudsContainer.classList.add('active');
        movableIllustration.src = cloudyPenguinImageUrl;
        movableIllustration.classList.remove('hidden');
    } else if (lowerCaseWeather.includes('rain') || lowerCaseWeather.includes('drizzle')) {
        body.classList.add('weather-rain');
        movableIllustration.src = rainyPenguinGifUrl;
        movableIllustration.classList.remove('hidden');
    } else if (lowerCaseWeather.includes('snow')) {
        body.classList.add('weather-snow');
        movableIllustration.src = snowGifUrl;
        movableIllustration.classList.remove('hidden');
    } else if (lowerCaseWeather.includes('thunderstorm')) {
        body.classList.add('weather-thunderstorm');
        movableIllustration.src = thunderstormGifUrl;
        movableIllustration.classList.remove('hidden');
    }
}


function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

async function getWeatherData(options) {
    const { city, lat, lon } = options;

    if (!city && (!lat || !lon)) {
        showErrorMessage('Please enter a city name or enable geolocation.');
        return;
    }
    if (API_KEY === 'YOUR_WEATHER_API_KEY' || API_KEY === '') {
        showErrorMessage('Please replace "YOUR_WEATHER_API_KEY" with your actual API key in the code.');
        return;
    }

    hideErrorMessage();
    currentWeatherDiv.classList.add('hidden');
    forecastDiv.classList.add('hidden');
    showLoadingSpinner();

    let apiUrlCurrent;
    let apiUrlForecast;

    if (city) {
        apiUrlCurrent = `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`;
        apiUrlForecast = `${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`;
    } else {
        apiUrlCurrent = `${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        apiUrlForecast = `${BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    }

    try {
        const currentWeatherResponse = await fetch(apiUrlCurrent);
        if (!currentWeatherResponse.ok) {
            const errorData = await currentWeatherResponse.json();
            throw new Error(errorData.message || 'City not found or API error.');
        }
        const currentWeatherData = await currentWeatherResponse.json();
        displayCurrentWeather(currentWeatherData);
        updateBackground(currentWeatherData.weather[0].main);

        const forecastResponse = await fetch(apiUrlForecast);
        if (!forecastResponse.ok) {
            const errorData = await forecastResponse.json();
            throw new Error(errorData.message || 'Could not fetch forecast data.');
        }
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

    } catch (error) {
        console.error('Error fetching weather data:', error);
        if (error.message.includes('city not found')) {
            showErrorMessage('Error: City not found. Please check the spelling or try another city.');
        } else if (error.message.includes('user denied geolocation')) {
            showErrorMessage('Geolocation denied. Please enter a city manually.');
        } else {
            showErrorMessage(`Error: ${error.message}`);
        }
        body.classList.remove(
            'weather-clear', 'weather-clouds', 'weather-rain', 'weather-thunderstorm',
            'weather-snow', 'weather-drizzle', 'weather-mist', 'weather-fog', 'weather-haze',
            'weather-smoke', 'weather-dust', 'weather-sand', 'weather-ash', 'weather-squall', 'weather-tornado'
        );
        body.style.backgroundColor = '#FFD700';
        body.style.backgroundImage = 'none';
        cloudsContainer.classList.remove('active');
        movableIllustration.src = '';
        movableIllustration.classList.add('hidden');
    } finally {
        hideLoadingSpinner();
    }
}

function displayCurrentWeather(data) {
    const celsiusTemp = Math.round(data.main.temp);
    const fahrenheitTemp = Math.round(celsiusToFahrenheit(celsiusTemp));

    currentCity.textContent = `${data.name}, ${data.sys.country}`;
    currentTemp.textContent = `${celsiusTemp}°C`;
    currentFahrenheitTemp.textContent = `${fahrenheitTemp}°F`;
    currentDescription.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    currentHumidityWind.textContent = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;
    currentWeatherDiv.classList.remove('hidden');
}

function displayForecast(data) {
    forecastContainer.innerHTML = '';
    forecastDiv.classList.remove('hidden');

    const dailyForecasts = {};
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        if (!dailyForecasts[day]) {
            dailyForecasts[day] = {
                date: day,
                temp_max: item.main.temp_max,
                temp_min: item.main.temp_min,
                description: item.weather[0].description,
                main: item.weather[0].main,
            };
        } else {
            dailyForecasts[day].temp_max = Math.max(dailyForecasts[day].temp_max, item.main.temp_max);
            dailyForecasts[day].temp_min = Math.min(dailyForecasts[day].temp_min, item.main.temp_min);
        }
    });

    const forecastArray = Object.values(dailyForecasts).slice(1, 4);

    forecastArray.forEach(dayData => {
        const svgIcon = getWeatherIconSVG(dayData.main);
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card', 'flex', 'flex-col', 'items-center');
        forecastCard.innerHTML = `
            ${svgIcon}
            <div class="card-text-content">
                <p class="forecast-date">${dayData.date}</p>
                <p class="forecast-temp">${Math.round(dayData.temp_max)}°C / ${Math.round(dayData.temp_min)}°C</p>
                <p class="forecast-description capitalize">${dayData.description}</p>
            </div>
        `;
        forecastContainer.appendChild(forecastCard);
    });
}

function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        showLoadingSpinner();
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                await getWeatherData({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            (error) => {
                hideLoadingSpinner();
                let message = 'Geolocation failed. Please enter a city manually.';
                if (error.code === error.PERMISSION_DENIED) {
                    if (error.message && error.message.includes('permissions policy')) {
                        message = 'Location access disabled by browser permissions policy. Please check your browser settings or enter a city manually.';
                    } else {
                        message = 'Location access denied. Please allow location access or enter a city manually.';
                    }
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    message = 'Location information unavailable. Please enter a city manually.';
                } else if (error.code === error.TIMEOUT) {
                    message = 'The request to get user location timed out. Please try again or enter a city manually.';
                }
                showErrorMessage(message);
                console.error('Geolocation error:', 'Code:', error.code, 'Message:', error.message, 'Full error object:', error);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    } else {
        showErrorMessage('Geolocation is not supported by your browser. Please enter a city manually.');
    }
}


CheckBtn.addEventListener('click', () => {
    if (cityInput.value.trim()) {
        getWeatherData({ city: cityInput.value.trim() });
    } else {
        getWeatherByGeolocation();
    }
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        if (cityInput.value.trim()) {
            getWeatherData({ city: cityInput.value.trim() });
        } else {
            getWeatherByGeolocation();
        }
    }
});

let recognition;

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        voiceSearchBtn.classList.add('listening');
        cityInput.placeholder = 'Listening... Speak now!';
        cityInput.value = '';
        hideErrorMessage();
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        cityInput.value = transcript;
        cityInput.placeholder = 'Directly click on \'Check\' button or enter city name';
        getWeatherData({ city: transcript });
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        voiceSearchBtn.classList.remove('listening');
        cityInput.placeholder = 'Directly click on \'Check\' button or enter city name';
        if (event.error === 'not-allowed') {
            showErrorMessage('Microphone access denied. Please allow microphone access in your browser settings.');
        } else if (event.error === 'no-speech') {
            showErrorMessage('No speech detected. Please try again.');
        } else {
            showErrorMessage(`Voice search error: ${event.error}`);
        }
    };

    recognition.onend = () => {
        voiceSearchBtn.classList.remove('listening');
        cityInput.placeholder = 'Directly click on \'Check\' button or enter city name';
    };

    voiceSearchBtn.addEventListener('click', () => {
        try {
            recognition.start();
        } catch (e) {
            console.error('Speech recognition already started or error:', e);
            showErrorMessage('Voice search is already active or an error occurred. Please try again.');
        }
    });
} else {
    voiceSearchBtn.style.display = 'none';
    console.warn('Web Speech API is not supported in this browser.');
}
