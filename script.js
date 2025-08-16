async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "36ff54f53fa1928611f022c1909cdbac"; 

  if (!city) {
    document.getElementById("weatherResult").innerHTML =
      `<p style="color:red">Please enter a city name.</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message); // catch "city not found", "invalid key", etc.
    }

    document.getElementById("weatherResult").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
      <p>🌡️ Temp: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML =
      `<p style="color:red">${error.message}</p>`;
  }
}
