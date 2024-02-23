async function apiWeather() {
  const res = await fetch(
    "https://cuaca-gempa-rest-api.vercel.app/weather/jawa-timur/surabaya"
  );
  const data = await res.json();
  const params = data.data.params;

  const currentTimeFormatted = getCurrentTimeFormatted();
  const matchingWeather = [];

  params.forEach((param) => {
    param.times.forEach((item) => {
      if (parseInt(item.datetime) === parseInt(currentTimeFormatted)) {
        matchingWeather.push(item);
      }
    });
  });

  const weather = document.getElementById("weather");
  if (matchingWeather.length > 0) {
    weather.innerHTML = `
        <h2 class="text-xl font-bold">${data.data.description}</h2>
        <div class="flex gap-4">
            ${matchingWeather
              .map(
                (item) => `
                ${
                  item.celcius
                    ? `<p class="text-lg">Suhu: ${item.celcius}</p>`
                    : ""
                }
                ${item.name ? `<p class="text-lg">Cuaca: ${item.name}</p>` : ""}
            `
              )
              .join("")}
        </div>
    `;
  } else {
    weather.innerHTML = "<p>Cuaca saat ini tidak tersedia.</p>";
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

apiWeather();
