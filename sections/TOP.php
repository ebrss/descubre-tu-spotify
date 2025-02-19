<?php
$servername = "localhost";
$username = "id21435288_tpfinal";
$password = "TPfinal.1";
$dbname = "id21435288_trabajo_final";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Consulta SQL para obtener las canciones más populares
$sql = "SELECT c.nombre as cancion_nombre, c.artista as cancion_artista, c.foto as cancion_foto, c.url as url, SUM(h.apariciones) as apariciones
        FROM canciones c
        JOIN hist_canciones h ON c.id = h.id_cancion
        GROUP BY c.id
        ORDER BY apariciones DESC";

$result = $conn->query($sql);

// Crear un array para almacenar los resultados
$songs = array();

// Obtener los resultados de la consulta
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $songs[] = $row;
    }
}

// Devolver los resultados como JSON
header('Content-Type: application/json');
echo json_encode($songs);

// Cerrar la conexión a la base de datos
$conn->close();
?>
