function attachEvents() {
    const weatherSymbols = {
        "Sunny": "&#x2600;",
        "Partly sunny": "&#x26C5;",
        "Overcast": "&#x2601;",
        "Rain": "&#x2614;",
        "Degrees": "&#176;"
    };
    const handleError = (err) => {
        document.querySelector("div#forecast").style.display = "block";
        Array.from(document.querySelector("div#current").children).filter(child => child.textContent !== "Current conditions").forEach(el => el.remove());
        document.querySelector("div#current div.label").textContent = "Error";
        document.querySelector("div#upcoming").style.display = "none";
    };
    const makeSpan = (className) => {
        const span = document.createElement("span");
        span.className = className;
        // span.innerHTML = ;
        return span;
    };
    const makeSpanWeather = (forecastObj, className) => {
        const span = makeSpan(className);
        span.innerHTML = weatherSymbols[forecastObj.condition];
        return span;
    };
    const checktheForecastElements = function () {
        if (document.querySelector("div#current div.label").textContent === "Error") {
            document.querySelector("div#current div.label").textContent = "Current conditions";
        }
        if (document.querySelector("div#upcoming").style.display === "none") {
            document.querySelector("div#upcoming").style.display = "block";
        }
    };



    const getWeatherButton = document.querySelector("input#submit");
    const locationInput = document.querySelector("input#location");
    let locationsArray, shouldStop;

    fetch(`https://judgetests.firebaseio.com/locations.json`)
        .then(response => response.json())
        .then(locationsArr => {
            locationsArray = locationsArr;
        })
        .catch(err => {
            handleError(err);
            if (!locationsArray) {
                shouldStop = true;
            }
        });


    getWeatherButton.addEventListener("click", function (e) {
        if (shouldStop) {
            return;
        }

        checktheForecastElements();
        // if (locationInput.trim() === "") return;
        const arrayLocationNames = locationsArray.map(obj => obj.name); //.map(name => name.toLowerCase());

        let townIndex = arrayLocationNames.map(name => name.toLowerCase()).indexOf(locationInput.value.trim().toLowerCase());
        if (townIndex === -1) {
            handleError();
            return;
        }
        // console.log(locationsArray.filter(obj => obj === locationInput.value));
        const townCode = locationsArray.find(obj => obj.name === arrayLocationNames[townIndex]).code; // returns the object of the town of which I then take the propery "code" -> the town's code

        document.querySelector("div#forecast").style.display = "block";


        (function getCurrentForecast() {
            fetch(`https://judgetests.firebaseio.com/forecast/today/${townCode}.json`)
                .then(response => response.json())
                .then(function displayCurrentForecast(data) {
                    if (document.querySelector("div.forecasts")) document.querySelector("div.forecasts").remove();

                    const forecast = data.forecast;

                    const divCurrentForecast = document.querySelector("div#current");

                    const divForecasts = document.createElement("div");
                    divForecasts.className = "forecasts";
                    divCurrentForecast.appendChild(divForecasts);

                    divForecasts.appendChild(makeSpanWeather(forecast, "condition symbol"));

                    const spanCondition = makeSpan("condition"); //document.createElement('span');
                    //spanCondition.className = "condition";

                    divForecasts.appendChild(spanCondition);


                    const spanCityName = makeSpan("forecast-data");
                    // spanCityName.textContent = data.name;
                    spanCityName.innerHTML = data.name;
                    const spanTemperature = makeSpan("forecast-data");
                    spanTemperature.innerHTML = `${forecast.low}${weatherSymbols.Degrees}/${forecast.high}${weatherSymbols.Degrees}`;
                    const spanWeatherCondition = makeSpan("forecast-data");
                    // spanWeatherCondition.textContent = forecast.condition;
                    spanWeatherCondition.innerHTML = forecast.condition;

                    spanCondition.appendChild(spanCityName);
                    spanCondition.appendChild(spanTemperature);
                    spanCondition.appendChild(spanWeatherCondition);
                })
                .catch(err => handleError(err));
        })();

        (function get3DayForecast() {
            fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${townCode}.json`)
                .then(response => response.json())
                .then(function display3DayForecast(data) {
                    if (document.querySelector("div.forecast-info")) document.querySelector("div.forecast-info").remove();

                    const forecastsArray = data.forecast;

                    const divForecastInfo = document.createElement("div");
                    divForecastInfo.className = "forecast-info";
                    document.querySelector("div#upcoming").appendChild(divForecastInfo);

                    forecastsArray.forEach(dayForecastObj => {
                        const spanUpcoming = makeSpan("upcoming");
                        divForecastInfo.appendChild(spanUpcoming);

                        const spanSymbol = makeSpanWeather(dayForecastObj, "symbol");
                        const spanTemperature = makeSpan("forecast-data");
                        spanTemperature.innerHTML = `${dayForecastObj.low}${weatherSymbols.Degrees}/${dayForecastObj.high}${weatherSymbols.Degrees}`;
                        const spanCondition = makeSpan("forecast-data");
                        // spanCondition.textContent = dayForecastObj.condition;
                        spanCondition.innerHTML = dayForecastObj.condition;

                        spanUpcoming.appendChild(spanSymbol);
                        spanUpcoming.appendChild(spanTemperature);
                        spanUpcoming.appendChild(spanCondition);
                    });
                })
                .catch(err => handleError(err));
        })();
    });
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// ако при първата функция съм получил правилно име на града, то и при втората то ще с същото
attachEvents();