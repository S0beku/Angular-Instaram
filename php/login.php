<?php
require_once 'Database.php';

class LoginHandler
{
    private $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function handleLogin($login, $password)
    {
        try {
            $returnData = [];
            $user = $this->db->getUserByLogin($login);

            if ($user) {
                if (password_verify($password, $user['Haslo'])) {
                    $token = $this->db->generatetoken();
                    $this->db->insertToken($token, $user["id_konta"]);

                    echo json_encode(["token" => $token]);
                    exit();
                }
            } else {
                $returnData["errors"]["errlog"] = "Login lub Haslo jest niepoprawne";
                echo json_encode($returnData);
                exit();
            }
        } catch (PDOException $e) {
            echo json_encode([["errors"]["internal"] => $e->getMessage()]);
            exit();
        }
    }
}

$db = new Database();
$loginHandler = new LoginHandler($db);

$data = json_decode(file_get_contents('php://input'), true);

$login = htmlspecialchars($data["login"]);
$password = htmlspecialchars($data["password"]);

$loginHandler->handleLogin($login, $password);
?>
