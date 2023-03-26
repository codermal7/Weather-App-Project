let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const main = document.querySelector("main");

main.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const mainRect = main.getBoundingClientRect();
  const centerX = mainRect.left + mainRect.width / 2;
  const centerY = mainRect.top + mainRect.height / 2;
  const deltaX = (mouseX - centerX) / (mainRect.width / 2);
  const deltaY = (mouseY - centerY) / (mainRect.height / 2);
  main.style.setProperty(
    "transform",
    `perspective(1000px) rotateX(${deltaY * 10}deg) rotateY(${deltaX * -10}deg)`
  );

  main.style.transition = "transform 0.09s ease-out";
});

main.addEventListener("mouseleave", (e) => {
  main.style.removeProperty("transform");
  main.style.transition = "transform 0.4s ease-out";
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = "";
});

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cc5d2c65aa1183f3d4066870fdca0b7d`,

      { mode: "cors" }
    );

    const weatherData = await response.json();
    console.log(weatherData);
    const { name } = weatherData;
    const { feels_like } = weatherData.main;
    const { id, main } = weatherData.weather[0];
    loc.textContent = name;
    climate.textContent = main;
    tempvalue.textContent = Math.round(feels_like - 273);
    // if (id < 300 && id > 200) {
    //   tempicon.src = "./icons/thunderstorm.svg";
    // } else if (id < 400 && id > 300) {
    //   tempicon.src = "./icons/cloud-solid.svg";
    // } else if (id < 600 && id > 500) {
    //   tempicon.src = "./icons/rain.svg";
    // } else if (id < 700 && id > 600) {
    //   tempicon.src = "./icons/snow.svg";
    // } else if (id < 800 && id > 700) {
    //   tempicon.src = "./icons/clouds.svg";
    // } else if (id == 800) {
    //   tempicon.src = "./icons/clouds-and-sun.svg";
    // }
  } catch (error) {
    alert("city not found");
  }
};

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";

      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=dab3af44de7d24ae7ff86549334e45bd     `;

      fetch(api)
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          const { name } = data;
          const { feels_like } = data.main;
          const { id, main } = data.weather[0];

          loc.textContent = name;
          climate.textContent = main;
          tempvalue.textContent = Math.round(feels_like - 273);
        //   if (id < 300 && id > 200) {
        //     tempicon.src = "./icons/thunderstorm.svg";
        //   } else if (id < 400 && id > 300) {
        //     tempicon.src = "./icons/cloud-solid.svg";
        //   } else if (id < 600 && id > 500) {
        //     tempicon.src = "./icons/rain.svg";
        //   } else if (id < 700 && id > 600) {
        //     tempicon.src = "./icons/snow.svg";
        //   } else if (id < 800 && id > 700) {
        //     tempicon.src = "./icons/cloud.svg";
        //   } else if (id == 800) {
        //     tempicon.src = "./icons/clouds-and-sun.svg";
        //   }

          console.log(data);
        });
    });
  }
});
