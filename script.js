document.addEventListener('DOMContentLoaded', () => {
    const CLIENT_ID = "4c492a9b95534c7a9a022fdc563c4f71";
    const REDIRECT_URI = 'https://ebrss.github.io/descubre-tu-spotify/sections/recentSongs.html';

    const loginButton = document.getElementById('login');
    const scopes = 'user-read-recently-played user-read-private user-top-read';

    const getTokenFromURL = () => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        return params.get('access_token');
    };

    const fetchUserInfo = (token) => {
        fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const userName = data.display_name || data.id;
            const country = data.country;
            const userID = data.id;
            const photoUrl = data.images && data.images.length > 0 ? data.images[0].url : null;
            
            sessionStorage.setItem('userName', userName);
            sessionStorage.setItem('country', country);
            sessionStorage.setItem('photo', photoUrl);
            sessionStorage.setItem('userID', userID);
            
        })
        .catch(error => console.error('Error:', error));
    };

    // Check if user already has a token stored
    const storedToken = sessionStorage.getItem('accessToken');
    if (storedToken) {
        // User is already logged in, redirect to recent songs
        window.location.href = 'sections/recentSongs.html';
        return;
    }

    // Check if this is an OAuth callback with token in URL
    const accessToken = getTokenFromURL();
    if (accessToken) {
        sessionStorage.setItem('accessToken', accessToken);
        fetchUserInfo(accessToken);
        window.location.href = 'sections/recentSongs.html';
        return;
    }

    // User is not logged in, show login button
    loginButton.addEventListener('click', () => {
        window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes}&response_type=token&show_dialog=true`;
    });
});
