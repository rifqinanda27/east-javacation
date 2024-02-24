async function apiWeather() {
  const res = await fetch(
    "https://cuaca-gempa-rest-api.vercel.app/weather/jawa-timur/surabaya"
  );
  const data = await res.json();
  const params = data.data.params;

  const currentTimeFormatted = getCurrentTimeFormatted();
  const currentHour = getCurrentHour();
  const matchingWeather = [];

  params.forEach((param) => {
    param.times.forEach((item) => {
      if (
        parseInt(item.datetime) === parseInt(currentTimeFormatted) &&
        parseInt(item.h) === parseInt(currentHour)
      ) {
        matchingWeather.push(item);
      }
    });
  });

  const weather = document.getElementById("weather");

  weather.innerHTML = " ";

  if (matchingWeather.length > 0) {
    weather.innerHTML = `
        <h2 class="text-xl font-bold">${data.data.description}</h2>
        <div class="flex gap-4">
            ${matchingWeather
              .map(
                (item) => `
                ${item.celcius ? `<p class="text-lg">${item.celcius}</p>` : ""}
                ${
                  item.name
                    ? `<p class="text-lg">${translateWeather(item.name)}</p>`
                    : ""
                }
                `
              )
              .join("")}
          </div>
          <p>The weather is updated every 6 hours.</p>
    `;
  } else {
    weather.innerHTML =
      "<p>Weather information is not available at the moment.</p>";
  }
}

function getCurrentTimeFormatted() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = currentDate.getDate();
  day = day < 10 ? "0" + day : day;
  let hours = currentDate.getHours();
  hours = Math.floor(hours / 6) * 6;
  hours = hours < 10 ? "0" + hours : hours;
  return `${year}${month}${day}${hours}00`;
}

function getCurrentHour() {
  const currentDate = new Date();
  const hours = (Math.floor(currentDate.getHours() / 6) * 6) % 66;

  if (hours >= 24) {
    hours = (hours + 6) % 66;
  }

  return hours < 10 ? "0" + hours : hours;
}

function translateWeather(weatherInIndonesian) {
  const weatherTranslations = {
    Cerah: "Clear Skies",
    "Cerah Berawan": "Partly Cloudy",
    Berawan: "Mostly Cloudy",
    "Berawan Tebal": "Overcast",
    "Udara Kabut": "Haze",
    Asap: "Smoke",
    Kabut: "Fog",
    "Hujan Ringan": "Light Rain",
    "Hujan Sedang": "Rain",
    "Hujan Lebat": "Heavy Rain",
    "Hujan Lokal": "Isolated Shower",
    "Hujan Petir": "Severe Thunderstorm",
  };

  return weatherTranslations[weatherInIndonesian] || weatherInIndonesian;
}

apiWeather();
