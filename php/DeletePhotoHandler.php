<?php
require_once ("Database.php");
class DeletePhotoHandler
{
    private $db;
    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function deletePhoto(string $id): void {
        $stmt = $this->db->pdo->prepare("DELETE FROM zdjecia WHERE ID_zdjecia=:zdj");
        $stmt->bindParam(':zdj', $id);
        $returnn = $stmt->execute();
        
        if ($returnn) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }
    }
}

$db = new Database();
$DeletePhotoHandler = new DeletePhotoHandler($db);
$data = json_decode(file_get_contents('php://input'), true);
$photos = $DeletePhotoHandler->deletePhoto($data["id"]);
