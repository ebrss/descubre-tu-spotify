document.addEventListener('DOMContentLoaded', () => {
    fetchTopSongs(sessionStorage.getItem('accessToken'), 'medium_term');
});

const fetchTopSongs = (token, timeRange) => {
    fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const welcomeTitle = document.getElementById('welcome-title');
        const songList = document.getElementById('song-list');
        welcomeTitle.textContent = `Tus canciones más escuchadas`;
        songList.innerHTML = "";

        data.items.forEach(item => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.style = 'height: 18em;';
            cardDiv.style = 'width: 18em;';

            const cardImgE = document.createElement('img');
            cardImgE.src = item.album.images[0].url;
            cardImgE.classList.add('card-img-top');
            cardImgE.alt = item.name;

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardText = document.createElement('p');
            cardText.classList.add('card-text');

            // Crear un hipervínculo a la URL de la canción
            const songLink = document.createElement('a');
            songLink.href = item.external_urls.spotify;
            songLink.textContent = item.name;
            songLink.target = '_blank'; // Abre el enlace en una nueva pestaña

            // Agregar el nombre del artista después del hipervínculo
            cardText.appendChild(songLink);
            cardText.innerHTML += ' - ' + item.artists.map(artist => artist.name).join(', ');

            cardBody.appendChild(cardText);
            cardDiv.appendChild(cardImgE);
            cardDiv.appendChild(cardBody);

            songList.appendChild(cardDiv);
        });
    })
    .catch(error => console.error('Error:', error));
};

function periodo(term){
    fetchTopSongs(localStorage.getItem('accessToken'), term);
}
