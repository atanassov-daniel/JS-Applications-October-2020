export function helper() {
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
        if (innerHTML) span.innerHTML = innerHTML;
        return span;
    };
    const makeSpanWeather = (forecastObj, className) => {
        const span = makeSpan(className);
        span.innerHTML = weatherSymbols[forecastObj.condition];
        return span;
    };
    const checktheForecastElements = function () {
        if (document.querySelector("div#current div.label").textContent === "Error") document.querySelector("div#current div.label").textContent = "Current conditions";
        if (document.querySelector("div#upcoming").style.display === "none") document.querySelector("div#upcoming").style.display = "block";
    };
}