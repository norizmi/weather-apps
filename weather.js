async function getWeather(cityName) {
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityName}&days=3`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f87d415b12msh9bf1b572378f517p11ddabjsn4d83229f2b8f",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  await fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const cuaca = document.getElementById("cuaca");
      const judul = document.createElement("h1");
      const nameCountry = data.location.name;
      const country = data.location.country;
      judul.innerHTML = `Showing the weather of ${nameCountry}, ${country}`;
      judul.classList.add("title");
      cuaca.appendChild(judul);
      getCurrentWeather(data, cuaca);
      getTomorrowWeather(data, cuaca);
      getAfterTomorrow(data, cuaca)
    })
    .catch((err) => console.error(err));
}

const btn = document.getElementById("get-city");
btn.addEventListener("click", () => {
  const city = document.getElementById("city").value;

  if (city == "") {
    alert("input tidak boleh kosong");
  } else {
    getWeather(city);
  }
});

function getCurrentWeather(currentWeather, placeholder) {
  let current = currentWeather.current;
  let humidity = current.humidity;
  let temp = current.temp_c;
  let condition = current.condition;
  let lastUpdated = current["last_updated"];
  let titleCurrentWeather = document.createElement("h1");
  let img = document.createElement("img");
  let temperature = document.createElement("div");
  let keterangan = document.createElement("p");
  let item = document.createElement("div");
  let lembab = document.createElement("p");
  let update = document.createElement("p");
  titleCurrentWeather.innerHTML = `Current Weather`;
  titleCurrentWeather.setAttribute(
    "style",
    "font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; color:white; font-size: 20px"
  );
  img.src = condition.icon;
  keterangan.innerHTML = `"${condition.text}"`;
  temperature.innerHTML = `Temperature: ${temp}°C`;
  lembab.innerHTML = `Humidity: ${humidity}%`;
  update.innerHTML = `(updated at ${lastUpdated})`;

  item.append(
    titleCurrentWeather,
    keterangan,
    img,
    temperature,
    lembab,
    update
  );

  item.classList.add("item");
  placeholder.appendChild(item);
}

function getTomorrowWeather(data, placeholder) {
  let tomorrow = data.forecast.forecastday[1];
  let avgTemp = tomorrow.day["avgtemp_c"];
  let maxtemp = tomorrow.day["maxtemp_c"];
  let mintemp = tomorrow.day["mintemp_c"];
  let img = tomorrow.day.condition.icon;
  let keterangan = tomorrow.day.condition.text;
  let newUpdated = tomorrow.date;
  let humidity = tomorrow.day.avghumidity;
  let gambar = document.createElement("img");
  let temp = document.createElement("div");
  let ket = document.createElement("p");
  let item = document.createElement("div");
  let tomorrowWeather = document.createElement("h1");
  let maxMin = document.createElement("p");
  let avghumidity = document.createElement("p");
  gambar.src = img;
  temp.innerHTML = `Average temperature: ${avgTemp}°C`;
  ket.innerHTML = `"${keterangan}"`;
  maxMin.innerHTML = `(Maximum: ${maxtemp}°C, Minimum: ${mintemp}°C)`;
  avghumidity.innerHTML = `Average Humidity: ${humidity}%`;
  tomorrowWeather.innerHTML = `Weather of ${newUpdated}`;
  tomorrowWeather.setAttribute(
    "style",
    "font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; color:white; font-size: 20px"
  );

  item.append(tomorrowWeather, ket, gambar, temp, maxMin, avghumidity);
  item.classList.add("item");
  placeholder.appendChild(item);
}

function getAfterTomorrow(data, placeholder) {
  let afterTomorrow = data.forecast.forecastday[2];
  console.log(data.forecast)
  let avgTemp = afterTomorrow.day["avgtemp_c"];
  let maxtemp = afterTomorrow.day["maxtemp_c"];
  let mintemp = afterTomorrow.day["mintemp_c"];
  let img = afterTomorrow.day.condition.icon;
  let keterangan = afterTomorrow.day.condition.text;
  let newUpdated = afterTomorrow.date;
  let humidity = afterTomorrow.day.avghumidity;
  let gambar = document.createElement("img");
  let temp = document.createElement("div");
  let ket = document.createElement("p");
  let item = document.createElement("div");
  let afterWeather = document.createElement("h1");
  let maxMin = document.createElement("p");
  let avghumidity = document.createElement("p");
  gambar.src = img;
  temp.innerHTML = `Average temperature: ${avgTemp}°C`;
  ket.innerHTML = `"${keterangan}"`;
  maxMin.innerHTML = `(Maximum: ${maxtemp}°C, Minimum: ${mintemp}°C)`;
  avghumidity.innerHTML = `Average Humidity: ${humidity}%`;
  afterWeather.innerHTML = `Weather of ${newUpdated}`;
  afterWeather.setAttribute(
    "style",
    "font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; color:white; font-size: 20px"
  );

  item.append(afterWeather, ket, gambar, temp, maxMin, avghumidity);
  item.classList.add("item");
  placeholder.appendChild(item);
}