// Make state object with empty array inside to store list of artists from API
const state = {
  artists: []
}

// Grab elements in html where content will appear.
const body = document.querySelector(`body`);

// Fetch artist list from API
const getArtists = async () => {
  try { 
    const response = await fetch (`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2406-FTB-ET-WEB-FT/artists`);
    const responseJSON = await response.json();
    // Store artists in an array in the state.
    state.artists = responseJSON.data;
    console.log(state.artists);
    renderArtists();
  } catch (e) {
    alert(e);
  }
}

getArtists();

// Render artist list on page
const renderArtists = () => {
  // Make ul inside of which artists will be listed
  const ul = document.createElement(`ul`);
  // Put ul at bottom of body
  body.append(ul);

  // For each artist in the state array, make an LI
  state.artists.forEach( artist => {
    const li = document.createElement(`li`);
    ul.append(li);
    // Put each artist's name in the LI
    li.innerText = artist.name;
  });
}
  