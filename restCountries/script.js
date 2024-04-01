const searchInput = document.getElementById('search-country');
const searchBtn = document.getElementById('search-btn');
const countryGrid = document.querySelector('.country-grid');
const countryDetails = document.getElementById('country-details');
const closeDetailsBtn = document.getElementById('close-details');

searchBtn.addEventListener('click', async () => {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return;

  // Clear previous results
  countryGrid.innerHTML = '';

  // Fetch country data using searchTerm and REST Countries API
  const response = await fetch(`https://restcountries.com/v2/name/${searchTerm}`);
  const countries = await response.json();

  if (!countries.length) {
    alert('No countries found for your search.');
    return;
  }

  countries.forEach(country => {
    const countryCard = document.createElement('div');
    countryCard.classList.add('country-card');

    countryCard.innerHTML = `<h3>${country.name}</h3>
                             <img src="${country.flags.png}" alt="${country.name} Flag">
                             <p><b>Region:</b> ${country.region}</p>
                             <button class="details-btn" data-country-code="${country.alpha3Code}">More Details</button>`;

    countryGrid.appendChild(countryCard);
  });

  const detailsBtns = document.querySelectorAll('.details-btn');
  detailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const countryCode = btn.dataset.countryCode;
      fetchCountryDetails(countryCode);
      countryDetails.style.display = 'flex';
    
    });
  });
});

closeDetailsBtn.addEventListener('click', () => {
  countryDetails.style.display = 'none';
  document.body.style.filter = 'none'; // Remove blur effect
});



    // Replace this with your own API key
    const API_KEY = "5a4a244b150449ea4c8ac5fe159deb2a";


async function fetchCountryDetails(countryCode) {


  const response = await fetch(`https://restcountries.com/v2/alpha/${countryCode}`);
  const country = await response.json();

   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryCode}&units=metric&appid=${API_KEY}`)
   .then(response => response.json())
   .then(data =>  work(data))


   function work(data){
   

    document.getElementById('temp').textContent =  `${data.main.temp} °C`;

    document.getElementById('weather').textContent =  data.weather[0].description;

    
   }

  document.getElementById('country-flag').src = country.flags.png;
  document.querySelector('.popup-content h3').textContent = country.name;
  document.getElementById('capital').textContent = country.capital;
  document.getElementById('population').textContent = country.population.toLocaleString();
  document.getElementById('region').textContent = country.region;
}
