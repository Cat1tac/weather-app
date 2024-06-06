import "./style.css";

async function getweather(location) {
    
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7fe2dd66f9624c0c9db55340242805&q=${location}&days=3&aqi=yes&alerts=yes`, {mode: 'cors'});
        const weatherdata = await response.json();
        
        if (weatherdata.error != undefined) {
            throw ('No place found');
        } else {
            domDisplay(weatherdata);
            console.log(weatherdata);
        }
    } catch(err) {
         alert(err);
    }
    
}

function domDisplay(weatherdata) {
    //location
    const country = document.getElementById('country');
    country.textContent = weatherdata.location.country;

    const place = document.querySelector('#search');
    place.textContent = weatherdata.location.name;
    
    //current day
    const currentDayImg = document.querySelector('#currentday > div > img');
    currentDayImg.src = weatherdata.current.condition.icon;
    //second day
    const secondDayImg = document.querySelector('#secondday > div > img');
    secondDayImg.src = weatherdata.forecast.forecastday[1].day.condition.icon;
    //thrid day
    const thirdDayImg = document.querySelector('#thirdday > div > img');
    thirdDayImg.src = weatherdata.forecast.forecastday[2].day.condition.icon;

    //hours display
    const currentdayhours = document.querySelector('#currentday > #hours');
    const seconddayhours = document.querySelector('#secondday > #hours');
    const thirdhours = document.querySelector('#thirdday > #hours');

    //overviewdisplay
    const currentdayoverview = document.querySelector('#currentday > * > .weatherinfo');
    const seconddayoverview = document.querySelector('#secondday > * > .weatherinfo');
    const thirddayoverview = document.querySelector('#thirdday > * > .weatherinfo');

    for(let i = 0; i < 3; i++){
        if (i === 0){
            currentdayoverview.children[0].textContent = weatherdata.forecast.forecastday[i].date;
            currentdayoverview.children[1].textContent = weatherdata.forecast.forecastday[i].day.condition.text;
            currentdayoverview.children[2].children[0].textContent = `F: ${weatherdata.forecast.forecastday[i].day.avgtemp_f}°`;
            currentdayoverview.children[2].children[1].textContent = `C: ${weatherdata.forecast.forecastday[i].day.avgtemp_c}°`;
        } else if (i === 1) {
            seconddayoverview.children[0].textContent = weatherdata.forecast.forecastday[i].date;
            seconddayoverview.children[1].textContent = weatherdata.forecast.forecastday[i].day.condition.text;
            seconddayoverview.children[2].children[0].textContent = `F: ${weatherdata.forecast.forecastday[i].day.avgtemp_f}°`;
            seconddayoverview.children[2].children[1].textContent = `C: ${weatherdata.forecast.forecastday[i].day.avgtemp_c}°`;
        } else {
            thirddayoverview.children[0].textContent = weatherdata.forecast.forecastday[i].date;
            thirddayoverview.children[1].textContent = weatherdata.forecast.forecastday[i].day.condition.text;
            thirddayoverview.children[2].children[0].textContent = `F: ${weatherdata.forecast.forecastday[i].day.avgtemp_f}°`;
            thirddayoverview.children[2].children[1].textContent = `C: ${weatherdata.forecast.forecastday[i].day.avgtemp_c}°`;
        }
        for(let j = 0; j < 24; j += 4){
            weatherdata.forecast.forecastday[i].hour[j].icon;
            if (i === 0){
                currentdayhours.children[j/4].children[0].textContent = `F: ${weatherdata.forecast.forecastday[i].hour[j].temp_f}°`;
                currentdayhours.children[j/4].children[1].src = weatherdata.forecast.forecastday[i].hour[j].condition.icon;
                currentdayhours.children[j/4].children[2].textContent = weatherdata.forecast.forecastday[i].hour[j].time.slice(11,16);
            } else if (i === 1) {
                seconddayhours.children[j/4].children[0].textContent = `F: ${weatherdata.forecast.forecastday[i].hour[j].temp_f}°`;
                seconddayhours.children[j/4].children[1].src = weatherdata.forecast.forecastday[i].hour[j].condition.icon;
                seconddayhours.children[j/4].children[2].textContent = weatherdata.forecast.forecastday[i].hour[j].time.slice(11,16)
            } else {
                thirdhours.children[j/4].children[0].textContent = `F: ${weatherdata.forecast.forecastday[i].hour[j].temp_f}°`;
                thirdhours.children[j/4].children[1].src = weatherdata.forecast.forecastday[i].hour[j].condition.icon;
                thirdhours.children[j/4].children[2].textContent = weatherdata.forecast.forecastday[i].hour[j].time.slice(11,16)
            }
        }
    }
}

const button = document.querySelector('button')
button.addEventListener('click', () => {
    let searchbar = document.querySelector('input');
    getweather(searchbar.value);
    searchbar.value = "";
    
});

getweather("Ru");
