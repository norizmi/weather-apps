
async function getWeather(cityName) {
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityName}&days=3`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f87d415b12msh9bf1b572378f517p11ddabjsn4d83229f2b8f',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  await fetch(url, options)
  .then(response => response.json())
  .then(data => {
    const cuaca = document.getElementById("cuaca")
    const judul = document.createElement("h1");
    judul.innerHTML = data.location.country;
    cuaca.appendChild(judul)
    getCurrentWeather(data, cuaca)
    getTomorrowWeather(data, cuaca)
  })
  .catch(err => console.error(err))
  
  
  
}


const btn = document.getElementById("get-city");
btn.addEventListener("click", () => {
  const city = document.getElementById("city").value
  getWeather(city);
})


function getCurrentWeather(currentWeather, placeholder) {
    let current = currentWeather.current;
    console.log(current)
    let temp = current.temp_c;
    let condition = current.condition;
    let img = document.createElement("img");
    img.src = condition.icon;
    placeholder.appendChild(img)
    let temperature = document.createElement("div");
    let keterangan = document.createElement("p");
    keterangan.innerHTML = condition.text;
    placeholder.appendChild(keterangan)
    temperature.innerHTML = temp;
    placeholder.appendChild(temperature);
}

function getTomorrowWeather(data, placeholder) {
  let tomorrow = data.forecast.forecastday[1]
  let maxtemp = tomorrow.day.maxtemp_c;
  let img = tomorrow.day.condition.icon;
  console.log(img)
  let keterangan = tomorrow.day.condition.text;
  let gambar = document.createElement("img");
  let temp = document.createElement("div")
  let ket = document.createElement("p")
  gambar.src = img;
  temp.innerHTML = maxtemp;
  ket.innerHTML = keterangan
  placeholder.appendChild(gambar)
  placeholder.appendChild(temp)
  placeholder.appendChild(ket)
}
