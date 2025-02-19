document.addEventListener('DOMContentLoaded', () => {
    //CLAVE API Y LINK REDIRECCIÓN LUEGO DEL LOGIN
    const CLIENT_ID = MYKEY;
    const REDIRECT_URI = 'https://ebrss.github.io/descubre-tu-spotify/sections/topSongs.html';


    const loginButton = document.getElementById('login');
    const scopes = 'user-read-recently-played user-read-private user-top-read';

    //SE GUARDA EL TOKEN DE LA URL Y LUEGO SE ALMACENA LOCALMENTE
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
            
            localStorage.setItem('userName', userName);
            localStorage.setItem('country', country);
            localStorage.setItem('photo', photoUrl);
            localStorage.setItem('userID', userID);
            
        })
        .catch(error => console.error('Error:', error));
    };

    const accessToken = getTokenFromURL();

    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        fetchUserInfo(accessToken);
        window.location = 'sections/recentSongs.html';
    } 

    loginButton.addEventListener('click', () => {
        window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes}&response_type=token&show_dialog=true`;
    });
});

