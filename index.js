// Make state object with empty array inside to store list of artists from API
const state = {
  artists: []
}

// Grab elements in html where content will appear.
const main = document.querySelector(`main`);

// Fetch artist list from API
const getArtists = async () => {
  try { 
    const response = await fetch (`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2406-FTB-ET-WEB-FT/artists`);
    const responseJSON = await response.json();
    // Store artists in an array in the state.
    state.artists = responseJSON.data;
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
  // Put ul at bottom of main
  main.append(ul);

  // For each artist in the state array, make an LI
  state.artists.forEach( artist => {
    const li = document.createElement(`li`);
    ul.append(li);
    // Put each artist's name in the LI
    li.innerText = artist.name;
  });

  // When you click on an artist, you go to a page that shows an image, their name, and a biography.
    // Grab the artist LIs
  const artistListItems = document.querySelectorAll(`li`);

  // Put an event listener on them, for a click event
  artistListItems.forEach((artistLI) => {
    // When you click, it matches their details in state with the LI by the name.
    artistLI.addEventListener(`click`, (event) => {
      const clickedArtist = state.artists.find((artist) => {
        return artist.name === event.target.innerText;
      })
      

      // Re-render the page with the image, name, and bio from that artist's object in artists.state
      main.innerHTML = `
      <img src="${clickedArtist.imageUrl}" alt="Photo of the artist">
      <h2>${clickedArtist.name}</h2>
      <p>${clickedArtist.description}</p>
      <button>Back to Artist List</button>
      ` 
      //Include a back button, which re-renders the original page. This requires: 
        // Grabbing it
      const button = document.querySelector(`button`);
      console.log(button);
        // Attaching an event listener
      button.addEventListener(`click`, () => {
        // Re-rendering main page
        main.innerHTML = ``;
        renderArtists();
      })
    })
    
  })
}
  