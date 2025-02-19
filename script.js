document.addEventListener('DOMContentLoaded', () => {
    const CLIENT_ID = "4c492a9b95534c7a9a022fdc563c4f71";
    const REDIRECT_URI = 'https://ebrss.github.io/descubre-tu-spotify/sections/recentSongs.html';

    const loginButton = document.getElementById('login');
    const scopes = 'user-read-recently-played user-read-private user-top-read';

    const getTokenFromURL = () => {
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        return urlParams.get('access_token');
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

    const accessToken = getTokenFromURL();

    if (accessToken) {
        sessionStorage.setItem('accessToken', accessToken);
        fetchUserInfo(accessToken);
        window.location = `sections/recentSongs.html`;
    } else {
        console.error('Access token not found in URL');
    }

    loginButton.addEventListener('click', () => {
        window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes}&response_type=token&show_dialog=true`;
    });
});
