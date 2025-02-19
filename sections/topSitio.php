<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/x-icon" href="../logo.png" />
    <link href="https://getbootstrap.com/docs/5.3/assets/css/docs.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Descubre Tu Spotify</title>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="TOP.js"></script>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary"data-bs-theme="dark" >
      <div class="container-fluid">
        <a class="navbar-brand"> Descubre Tu Spotify </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link" aria-current="page" href="../index.php">Home</a>
            <a class="nav-link" href="recentSongs.php">Recent Songs</a>
            <a class="nav-link" href="topSongs.php">Top Songs</a>
            <a class="nav-link active">Top DescubreTuSpotify</a>
          </div>
        </div>
      </div>
    </nav>
    
    <div class="container mt-4">
        <h2>Top Canciones</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Artista</th>
                    <th scope="col">Apariciones</th>
                    <th scope="col">Foto</th>
                </tr>
            </thead>
            <tbody id="topSongsTableBody">
            </tbody>
        </table>
    </div>
</body>
</html>
