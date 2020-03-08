<?php
if(isset($_GET['q'])){
    $q=$_GET['q'];
    $fullQuery="Location: https://www.google.co.il/search?q=".$q;
    header($fullQuery);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>test4-php</title>
</head>
<body>
    <form action='http://localhost/test4/start.php' method='get'>
        <input placeholder='search' name="q" type="text"/>
        <button type="submit">SEARCH</button>
    </form>
</body>
</html>