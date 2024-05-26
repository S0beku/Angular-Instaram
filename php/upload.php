<?php
require_once 'Database.php';

class PictureUpload
{
    private $db;
    private $opis;
    private $id;
    private $fileName;
    private $imageData;
    private $fileLocation;

    public function __construct(Database $db)
    {
        $this->db = $db;
        $jsonr = file_get_contents('php://input');
        $data = json_decode($jsonr);
        $this->opis = $data->opiss;
        $this->id = $data->id;
        $base64Image = $data->photo;

        $this->imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));
        $this->fileName = uniqid() . '.png'; // Generate unique file name
        $this->fileLocation = 'images/' . $this->fileName;
    }

    public function addPicture(): void
    {
        $uploadOk = 1;
        $returnData = [];
        if (empty ($this->opis) || empty ($this->imageData)) {
            $returnData["errors"]["inputs"] = "Zadne z pol nie moze byc puste!";
            $uploadOk = 0;
        }

        if ($uploadOk == 0) {
            $returnData["errors"]["file"] = "Oops! Plik nie zostal dodany!";
        } else {
            if (file_put_contents($this->fileLocation, $this->imageData)) {
                $data = date("Y-m-d H:i:s");
                $zdj = $this->fileName;

                try {
                    $stmt = $this->db->pdo->prepare("INSERT INTO zdjecia (Opis, Zdjecie, id_konta, Data) VALUES (:opis, :zdj, :id, :data)");
                    $stmt->bindParam(':opis', $this->opis);
                    $stmt->bindParam(':zdj', $zdj);
                    $stmt->bindParam(':id', $this->id);
                    $stmt->bindParam(':data', $data);
                    $stmt->execute();

                    $returnData["status"] = true;
                } catch (PDOException $e) {
                    $returnData["errors"]["internal"] = "Napotkalismy problem z przeslaniem twojego obrazu. " . $e->getMessage();
                }
            } else {
                $returnData["errors"]["internal"] = "Napotkalismy problem z przeslaniem twojego obrazu.";
            }
        }

        echo json_encode($returnData);
    }
    public function displayErrors(): void
    {
        if (isset ($this->err)) {
            echo $this->err;
        }
        if (isset ($this->end)) {
            echo $this->end;
        }
    }
}

$db = new Database();
$picUploader = new PictureUpload($db);
$picUploader->addPicture();
?>
