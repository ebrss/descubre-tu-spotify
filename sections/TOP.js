document.addEventListener("DOMContentLoaded", function () {
    // Realizar una solicitud AJAX para obtener las canciones más populares
    fetch('https://descubretuspotify.000webhostapp.com/sections/TOP.php')
        .then(response => response.json())
        .then(data => {
            // Manipular los datos y mostrar en la tabla
            const topSongsTableBody = document.getElementById('topSongsTableBody');

            data.forEach(song => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><a href="${song.url}" target="_blank">${song.cancion_nombre}</a></td>
                    <td>${song.cancion_artista}</td>
                    <td>${song.apariciones}</td>
                    <td><img src="${song.cancion_foto}" alt="Foto de la canción" style="max-width: 100px; max-height: 100px;"></td>
                `;
                topSongsTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error al obtener las canciones:', error));
});