document.addEventListener('DOMContentLoaded', () => {
    
    const accessToken = sessionStorage.getItem('accessToken');


    if (accessToken) {
        fetchRecentSongs(accessToken);
    } else {
        console.error('Access token not found.');
    }
});

const fetchRecentSongs = (token) => {
    fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const welcomeTitle = document.getElementById('welcome-title');
        const songList = document.getElementById('song-list');
        
        welcomeTitle.textContent = `Tus canciones recientes`;

        data.items.forEach(item => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.style = 'height: 18em;';
            cardDiv.style = 'width: 18em;';

            const cardImgE = document.createElement('img');
            cardImgE.src = item.track.album.images[1].url;
            cardImgE.classList.add('card-img-top');
            cardImgE.alt = item.track.name;

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardText = document.createElement('p');
            cardText.classList.add('card-text');

            const songLink = document.createElement('a');
            songLink.href = item.track.external_urls.spotify;
            songLink.textContent = item.track.name;
            songLink.target = '_blank';

            cardText.appendChild(songLink);
            cardText.innerHTML += ' - ' + item.track.artists.map(artist => artist.name).join(', ');

            cardBody.appendChild(cardText);
            cardDiv.appendChild(cardImgE);
            cardDiv.appendChild(cardBody);

            songList.appendChild(cardDiv);
        });
    })
    .catch(error => console.error('Error:', error));
};
