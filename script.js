let data = null;

fetch('data.json')
  .then(response => response.json())
  .then(json => {
 
    data = json;
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });

function searchRecommendations() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const results = document.getElementById('results');
  results.innerHTML = ''; 

  if (!data) {
    results.innerHTML = 'Loading data...';
    return;
  }

  let found = false;

  data.countries.forEach(country => {
    country.cities.forEach(city => {
      if (city.name.toLowerCase().includes(input) || city.description.toLowerCase().includes(input)) {
        const cityCard = document.createElement('div');
        cityCard.classList.add('city-card');
        cityCard.innerHTML = `
          <h3>${city.name}</h3>
          <img src="${city.imageUrl}" alt="${city.name}">
          <p>${city.description}</p>
        `;
        results.appendChild(cityCard);
        found = true;
      }
    });
  });

  data.temples.forEach(temple => {
    if (temple.name.toLowerCase().includes(input) || temple.description.toLowerCase().includes(input)) {
      const templeCard = document.createElement('div');
      templeCard.classList.add('temple-card');
      templeCard.innerHTML = `
        <h3>${temple.name}</h3>
        <img src="${temple.imageUrl}" alt="${temple.name}">
        <p>${temple.description}</p>
      `;
      results.appendChild(templeCard);
      found = true;
    }
  });

  data.beaches.forEach(beach => {
    if (beach.name.toLowerCase().includes(input) || beach.description.toLowerCase().includes(input)) {
      const beachCard = document.createElement('div');
      beachCard.classList.add('beach-card');
      beachCard.innerHTML = `
        <h3>${beach.name}</h3>
        <img src="${beach.imageUrl}" alt="${beach.name}">
        <p>${beach.description}</p>
      `;
      results.appendChild(beachCard);
      found = true;
    }
  });

  // If no matches found
  if (!found) {
    results.innerHTML = '<p>No matching destinations, temples, or beaches found.</p>';
  }
}
