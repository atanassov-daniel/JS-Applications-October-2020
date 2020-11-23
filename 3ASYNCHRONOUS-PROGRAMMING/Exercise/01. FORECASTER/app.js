(async () => {
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
    const makeSpan = (className, innerHTML) => {
        const span = document.createElement("span");
        span.className = className;
        if (innerHTML)
            span.innerHTML = innerHTML;
        return span;
    };
    const makeSpanWeather = (forecastObj, className) => {
        const span = makeSpan(className);
        span.innerHTML = weatherSymbols[forecastObj.condition];
        return span;
    };
    const checktheForecastElements = function () {
        if (document.querySelector("div#current div.label").textContent === "Error")
            document.querySelector("div#current div.label").textContent = "Current conditions";
        if (document.querySelector("div#upcoming").style.display === "none")
            document.querySelector("div#upcoming").style.display = "block";
    };


    const getWeatherButton = document.querySelector("input#submit");
    const locationInput = document.querySelector("input#location");

    const responseLocations = await fetch(`https://judgetests.firebaseio.com/locations.json`);
    if (responseLocations.ok === false) {
        handleError(err);
        return;
    }
    const locationsArray = await responseLocations.json();


    getWeatherButton.addEventListener("click", function (e) {
        checktheForecastElements();
        const arrayLocationNames = locationsArray.map(obj => obj.name);

        let townIndex = arrayLocationNames.map(name => name.toLowerCase()).indexOf(locationInput.value.trim().toLowerCase());
        if (townIndex === -1) {
            handleError();
            return;
        }

        const townCode = locationsArray.find(obj => obj.name === arrayLocationNames[townIndex]).code;

        (async function getCurrentForecast() {
            const responseCurrentForecast = await fetch(`https://judgetests.firebaseio.com/forecast/today/${townCode}.json`);

            if (responseCurrentForecast.ok === false) {
                handleError(err);
                return;
            }

            document.querySelector("div#forecast").style.display = "block";

            const object = await responseCurrentForecast.json(); // includes the currentForecast and cityName
            const forecastObj = object.forecast;

            if (document.querySelector("div.forecasts")) document.querySelector("div.forecasts").remove();
            const divForecasts = document.createElement("div");
            divForecasts.className = "forecasts";
            divForecasts.appendChild(makeSpanWeather(forecastObj, "condition symbol"));

            const spanCondition = makeSpan("condition");
            spanCondition.appendChild(makeSpan("forecast-data", forecastObj.name));
            spanCondition.appendChild(makeSpan("forecast-data", `${forecastObj.low}${weatherSymbols.Degrees}/${forecastObj.high}${weatherSymbols.Degrees}`));
            spanCondition.appendChild(makeSpan("forecast-data", forecastObj.condition));
            divForecasts.appendChild(spanCondition);

            document.querySelector("div#current").appendChild(divForecasts);
        })();

        (async function get3DayForecast() {
            const response3DayForecast = await fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${townCode}.json`);

            if (response3DayForecast.ok === false) {
                handleError(err);
                return;
            }
            const data = await response3DayForecast.json();
            const forecastsArray = data.forecast;

            if (document.querySelector("div.forecast-info")) document.querySelector("div.forecast-info").remove();
            const divForecastInfo = document.createElement("div");
            divForecastInfo.className = "forecast-info";
            document.querySelector("div#upcoming").appendChild(divForecastInfo);

            forecastsArray.forEach(dayForecastObj => {
                const spanUpcoming = makeSpan("upcoming");
                spanUpcoming.appendChild(makeSpanWeather(dayForecastObj, "symbol"));
                spanUpcoming.appendChild(makeSpan("forecast-data", `${dayForecastObj.low}${weatherSymbols.Degrees}/${dayForecastObj.high}${weatherSymbols.Degrees}`));
                spanUpcoming.appendChild(makeSpan("forecast-data", dayForecastObj.condition));

                divForecastInfo.appendChild(spanUpcoming);
            });
        })();
    });
})();