<?php
require_once ("Database.php");
class PhotoHandler
{
    private $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function displayPhotos(): void
    {
        $sql = "SELECT * FROM zdjecia ORDER BY Data DESC";
        $photos = [];

        try {
            $query = $this->db->pdo->query($sql);
            while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
                $photo = [];
                $photo['Data'] = $row['Data'];
                $photo['Opis'] = $row['Opis'];
                $photo['Zdj'] = $row['Zdjecie'];
                $photo['ID_zdjecia'] = $row['ID_zdjecia'];
                $photos[] = $photo;
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }

        echo json_encode($photos);
    }
}

$db = new Database();
$photoHandler = new PhotoHandler($db);
$photos = $photoHandler->displayPhotos();
