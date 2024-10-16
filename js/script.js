const apiKey = "a112cbdae0cee39c0ecfa107b47db003"; // Replace with your OpenWeatherMap API key

const citySuggestions = [
    "Barguna", "Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur",
    "Chittagong", "Brahmanbaria", "Chandpur", "Comilla", "Cox's Bazar", "Feni",
    "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati", "Dhaka", "Faridpur",
    "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj",
    "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail", "Khulna",
    "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Kushtia", "Magura",
    "Meherpur", "Narail", "Satkhira", "Mymensingh", "Jamalpur", "Netrokona",
    "Sherpur", "Rajshahi", "Bogura", "Joypurhat", "Naogaon", "Natore",
    "Chapai Nawabganj", "Pabna", "Sirajganj", "Rangpur", "Dinajpur", "Gaibandha",
    "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon", "Sylhet",
    "Habiganj", "Moulvibazar", "Sunamganj"
  ];

const cityInput = document.getElementById("cityInput");
const suggestionsList = document.getElementById("suggestionsList");

cityInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  suggestionsList.innerHTML = "";
  if (query) {
    const filteredCities = citySuggestions.filter((city) =>
      city.toLowerCase().startsWith(query)
    );
    if (filteredCities.length > 0) {
      suggestionsList.style.display = "block";
      filteredCities.forEach((city) => {
        const li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", () => {
          cityInput.value = city;
          suggestionsList.style.display = "none";
        });
        suggestionsList.appendChild(li);
      });
    } else {
      suggestionsList.style.display = "none";
    }
  } else {
    suggestionsList.style.display = "none";
  }
});

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          document.getElementById("weatherDetails").classList.remove("hidden");
          document.querySelector(".city").textContent = data.name;
          document.querySelector(
            ".temperature"
          ).textContent = `${data.main.temp}°C`;
          document.querySelector(
            ".weather-info div:nth-child(1) .value"
          ).textContent = `${data.main.humidity}%`;
          document.querySelector(
            ".weather-info div:nth-child(2) .value"
          ).textContent = data.weather[0].main;
          document.querySelector(
            ".weather-info div:nth-child(3) .value"
          ).textContent = `${data.clouds.all}%`;
          document.querySelector(
            ".weather-info div:nth-child(4) .value"
          ).textContent = `${data.wind.speed} km/h`;
        } else {
          alert("City not found. Please enter a valid city name.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Something went wrong. Please try again later.");
      });
  } else {
    alert("Please enter a city name.");
  }
});
