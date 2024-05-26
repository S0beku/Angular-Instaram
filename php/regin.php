<?php
require_once 'Database.php';

class RegistrationHandler
{
    private $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function registerUser($data)
    {
        $login = htmlspecialchars($data["login"]);
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
        $age = filter_var($data['age'], FILTER_SANITIZE_NUMBER_FLOAT);

        $returnData = [];

        if (strlen($login) < 5 || strlen($login) > 30) {
            $returnData["errors"]["errlog"] = "Login musi byc od 5 do 30 znakow";
        }

        if (strlen($data['password']) < 5 || strlen($data['password']) > 30) {
            $returnData["errors"]["errpass"] = "Haslo musi byc od 5 do 30 znakow";
        }

        if ($age <= 16) {
            $returnData["errors"]["errage"] = "Musisz byc starszy niz 16 lat";
        }

        if ($age >= 120) {
            $returnData["errors"]["errage1"] = "Prosze o wprowadzenie swoj prawdziwy wiek";
        }

        if (empty ($returnData["errors"])) {
            try {
                $user = $this->db->getUserByLogin($login);

                if ($user) {
                    $returnData["errors"]["errlog"] = "Taki login już istnieje";
                    echo json_encode($returnData);
                } else {
                    $token = $this->db->generatetoken();
                    $this->db->insertUser($login, $password, $age);
                    $using = $this->db->getUserByLogin($login);
                    $this->db->insertToken($token, $using["id_konta"]);
                    echo json_encode(["token" => $token]);
                    exit();
                }
            } catch (PDOException $e) {
                echo "Error: " . $e->getMessage();
            }
        } else {
           echo json_encode($returnData);
        }
    }
}


$db = new Database();
$registrationHandler = new RegistrationHandler($db);
$registrationHandler->registerUser(json_decode(file_get_contents('php://input'), true));
?>
