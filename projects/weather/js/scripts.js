
const API_KEY = "2a117aaf0fe30d168b4ab3a7b34be50f";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const icon = document.getElementById("icon");
const errorMsg = document.getElementById("error");
const forecastContainer = document.getElementById("forecast");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = data.weather[0].description;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;
    weatherResult.classList.remove("hidden");
    errorMsg.classList.add("hidden");

    // Fetch 5-day forecast
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const forecastData = await forecastRes.json();

    // Extract one forecast per day (12:00 PM)
    const daily = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

    forecastContainer.innerHTML = "";
    daily.forEach(day => {
      const date = new Date(day.dt * 1000).toLocaleDateString();
      const temp = Math.round(day.main.temp);
      const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
      const desc = day.weather[0].description;

      const card = document.createElement("div");
      card.className = "forecast-day";
      card.innerHTML = `
        <h4>${date}</h4>
        <img src="${iconUrl}" alt="${desc}" />
        <p>${temp}°C</p>
        <p>${desc}</p>
      `;
      forecastContainer.appendChild(card);
    });
  } catch (err) {
    weatherResult.classList.add("hidden");
    errorMsg.textContent = "City not found. Please try again.";
    errorMsg.classList.remove("hidden");
  }
});


const locationBtn = document.getElementById("locationBtn");

locationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(async position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      cityName.textContent = data.name;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
      description.textContent = data.weather[0].description;
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      icon.alt = data.weather[0].description;
      weatherResult.classList.remove("hidden");
      errorMsg.classList.add("hidden");

      // Forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastRes.json();
      const daily = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

      forecastContainer.innerHTML = "";
      daily.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        const temp = Math.round(day.main.temp);
        const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
        const desc = day.weather[0].description;

        const card = document.createElement("div");
        card.className = "forecast-day";
        card.innerHTML = `
          <h4>${date}</h4>
          <img src="${iconUrl}" alt="${desc}" />
          <p>${temp}°C</p>
          <p>${desc}</p>
        `;
        forecastContainer.appendChild(card);
      });

    } catch (err) {
      weatherResult.classList.add("hidden");
      errorMsg.textContent = "Unable to get weather. Try again.";
      errorMsg.classList.remove("hidden");
    }
  }, () => {
    alert("Unable to retrieve your location.");
  });
});
