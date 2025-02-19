<?php

$userId = isset($_POST['userId']) ? $_POST['userId'] : null;
$user = isset($_POST['userName']) ? $_POST['userName'] : null;
$country = isset($_POST['country']) ? $_POST['country'] : null;
$photo = isset($_POST['photo']) ? $_POST['photo'] : null;
$songs = isset($_POST['songs']) ? json_decode($_POST['songs'], true) : [];

$servername = "localhost";
$username = "id21435288_tpfinal";
$password = "TPfinal.1";
$dbname = "id21435288_trabajo_final";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("La conexión falló: " . $conn->connect_error);
}

// Verificar si el usuario ya existe
$checkSql = "SELECT id FROM usuario WHERE id = '$userId'";
$checkResult = $conn->query($checkSql);

if ($checkResult->num_rows == 0) {
    // Si el usuario no existe, insertarlo en la tabla usuario
    $insertUserSql = "INSERT INTO usuario (id, username, pais, foto) VALUES ('$userId', '$user', '$country', '$photo')";
    $conn->query($insertUserSql);
}

// Iterar a través de las canciones y agregarlas a las tablas 'canciones' e 'hist_canciones', borrar registros antiguos del usuario

$cleanHistSql = "DELETE FROM hist_canciones WHERE id_usuario = '$userId'";
$conn->query($cleanHistSql);

foreach ($songs as $song) {
    $songId = $song['track']['id'];
    $songName = $conn->real_escape_string($song['track']['name']);
    $artist = $conn->real_escape_string($song['track']['artists'][0]['name']);
    $album = $conn->real_escape_string($song['track']['album']['name']);
    $photoUrl = $song['track']['album']['images'][1]['url'];
    $url = $song['track']['external_urls']['spotify'];

    // Insertar o actualizar información de la canción en la tabla 'canciones'
    $upsertSongSql = "INSERT INTO canciones (id, nombre, artista, album, foto, url) 
                      VALUES ('$songId', '$songName', '$artist', '$album', '$photoUrl', '$url') 
                      ON DUPLICATE KEY UPDATE nombre='$songName', artista='$artist', album='$album', foto='$photoUrl', url='$url'";
    $conn->query($upsertSongSql);

    // Insertar información en la tabla 'hist_canciones'
    $insertHistSql = "INSERT INTO hist_canciones (id_cancion, id_usuario, apariciones) 
                      VALUES ('$songId', '$userId', 1) 
                      ON DUPLICATE KEY UPDATE apariciones = apariciones + 1";
    $conn->query($insertHistSql);
}

$conn->close();
?>
