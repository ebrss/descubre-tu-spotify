document.addEventListener('DOMContentLoaded', () => {
    // Extract token from URL hash if present (OAuth redirect)
    const getTokenFromURL = () => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        return params.get('access_token');
    };

    // Check if token is in URL (OAuth callback)
    const tokenFromURL = getTokenFromURL();
    if (tokenFromURL) {
        sessionStorage.setItem('accessToken', tokenFromURL);
        // Clean up URL by removing hash
        window.history.replaceState(null, null, window.location.pathname);
    }
    
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
        fetchRecentSongs(accessToken);
    } else {
        // Redirect to login page if no token
        window.location.href = '../index.html';
    }
});

const fetchRecentSongs = (token) => {
    fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const welcomeTitle = document.getElementById('welcome-title');
        const songList = document.getElementById('song-list');
        
        welcomeTitle.textContent = `Tus canciones recientes`;

        if (!data.items || data.items.length === 0) {
            songList.innerHTML = '<p>No recent songs found.</p>';
            return;
        }

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
    .catch(error => {
        console.error('Error:', error);
        sessionStorage.removeItem('accessToken');
        window.location.href = '../index.html';
    });
};
