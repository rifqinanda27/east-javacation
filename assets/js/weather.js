async function apiWeather() {
    const res = await fetch(
      "https://cuaca-gempa-rest-api.vercel.app/weather/jawa-timur/surabaya"
    );
    const data = await res.json();
    const params = data.data.params;
  
    console.log(params[5].times[0].celcius);
  
    weather.innerHTML = "";
    weather.innerHTML += `
            <h2 class="text-xl font-bold">${data.data.description}</h2>
            <div class="flex gap-4">
              <p class="text-lg">${params[5].times[0].celcius}</p>
              <p class="text-lg">${params[6].times[0].name}</p>
            </div>
        `;
  }
  
  apiWeather();
  