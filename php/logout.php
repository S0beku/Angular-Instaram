<?php
require_once 'Database.php';

class LogoutHandler
{
    private $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function handleLogout(string $token): void
    {
        try {
            $returnData["success"] = $this->db->deleteToken($token);
            echo json_encode($returnData);
        } catch (PDOException $e) {
            $returnData["errors"]["internal"] = $e->getMessage();
            echo json_encode($returnData);
            exit();
        }
    }
}

$db = new Database();
$logoutHandler = new LogoutHandler($db);

$data = json_decode(file_get_contents('php://input'), true);

$token = htmlspecialchars($data["token"] ?? "");

$logoutHandler->handleLogout($token);
?>