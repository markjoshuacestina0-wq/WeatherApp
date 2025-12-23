const checkerForm = document.getElementById('checkerForm');
const spinner = document.getElementById('spinner');
const Area = document.getElementById('Area');
const Temperature = document.getElementById('Temperature');
const Weather = document.getElementById('Weather');
const Feels = document.getElementById('Feels');
const Chance = document.getElementById('Chance');
const UV = document.getElementById('UV');
const Visibility = document.getElementById('Visibility');
const weatherIcon = document.getElementById('weatherIcon');
const campusLocation = document.getElementById('campusLocation');
const errorEl = document.getElementById('error');
const updatedEl = document.getElementById('updated');

const STORAGE_KEY = 'lastWeatherQuery';

function showSpinner() {
    spinner.style.display = 'flex';
    spinner.setAttribute('aria-hidden', 'false');
}
function hideSpinner() {
    spinner.style.display = 'none';
    spinner.setAttribute('aria-hidden', 'true');
}

function chooseIconName(desc){
    // returns a filename (without path) for the matching icon in img/icons/
    if(!desc) return 'sun.svg';
    const d = desc.toLowerCase();
    if(d.includes('thunder') || d.includes('storm')) return 'thunder.svg';
    if(d.includes('rain') || d.includes('shower') || d.includes('drizzle')) return 'rain.svg';
    if(d.includes('snow') || d.includes('sleet') || d.includes('blizzard')) return 'snow.svg';
    if(d.includes('mist') || d.includes('fog') || d.includes('haze')) return 'fog.svg';
    if(d.includes('cloud') || d.includes('overcast')) return 'cloud.svg';
    if(d.includes('partly') || d.includes('sun') || d.includes('clear')) return 'sun.svg';
    return 'partly.svg';
}

async function fetchWeather(query){
    if(!query) throw new Error('Empty query');
    // wttr.in accepts location names. Use JSON format j1.
    const url = `https://wttr.in/${encodeURIComponent(query)}?format=j1`;
    const res = await fetch(url);
    if(!res.ok) throw new Error('Network response not ok');
    return res.json();
}

function render(data, query){
    try{
        const current = data.current_condition[0];
        const nearest = (data.nearest_area && data.nearest_area[0] && data.nearest_area[0].areaName && data.nearest_area[0].areaName[0]) ? data.nearest_area[0].areaName[0].value : query;

        Area.textContent = nearest;
        Temperature.textContent = `${current.temp_C}°C`;
        Weather.textContent = current.weatherDesc && current.weatherDesc[0] ? current.weatherDesc[0].value : '—';
        Feels.textContent = `${current.FeelsLikeC}°C`;
        Chance.textContent = (data.weather && data.weather[0] && data.weather[0].hourly && data.weather[0].hourly[0]) ? `${data.weather[0].hourly[0].chanceofrain}%` : '—';
        UV.textContent = current.uvIndex ?? '—';
        Visibility.textContent = current.visibility ?? '—';
            // set icon image and alt text
            const iconName = chooseIconName(Weather.textContent);
            if(weatherIcon) {
                weatherIcon.src = `img/icons/${iconName}`;
                weatherIcon.alt = Weather.textContent || 'weather icon';
            }
        updatedEl.textContent = new Date().toLocaleString();
        errorEl.textContent = '';
    }catch(e){
        console.error('Render error', e);
        errorEl.textContent = 'Unable to parse weather data.';
    }
}

async function doQuery(query){
    try{
        showSpinner();
        const data = await fetchWeather(query);
        render(data, query);
        localStorage.setItem(STORAGE_KEY, query);
    }catch(err){
        console.error(err);
        errorEl.textContent = 'Could not fetch weather. Try another city or check your connection.';
    }finally{
        hideSpinner();
    }
}

checkerForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    errorEl.textContent = '';
    const campusVal = campusLocation.value && campusLocation.value.trim();
    if(!campusVal){
        errorEl.textContent = 'Please pick a campus from the dropdown.';
        return;
    }
    doQuery(campusVal);
});

// Geolocation button removed; geolocation code has been removed to match the UI.

// On load: try to show last query
window.addEventListener('load', ()=>{
    const last = localStorage.getItem(STORAGE_KEY);
    if(last){
        // if last matches one of the campus options, select it
        for(const opt of campusLocation.options){
            if(opt.value && opt.value.toLowerCase() === last.toLowerCase()){
                campusLocation.value = opt.value;
                break;
            }
        }
        doQuery(last);
    }
});
