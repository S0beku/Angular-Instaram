<?php
class Database
{
    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "instaram";
    public $conn;
    public $pdo;

    // Konstruktor - łączy się z bazą danych przy tworzeniu obiektu
    public function __construct()
    {
        $this->pdo = new PDO('mysql:host=localhost;dbname=instaram', 'root', '');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getUserIdByToken(string $token): int|bool
    {
        $stmt = $this->pdo->prepare("SELECT * FROM tokeny WHERE Token = :token");
        $stmt->bindParam(':token', $token);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC)["id_uzytkownika"] ?? null;

        if ($user)
            return $user;
        else
            return false;
    }

    public function getUserData(int $id): array|bool
    {
        $stmt = $this->pdo->prepare("SELECT * FROM dane_uzytkownika WHERE id_konta = :idi");
        $stmt->bindParam(':idi', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserByLogin(string $login): array|bool
    {
        $stmt = $this->pdo->prepare("SELECT * FROM dane_uzytkownika WHERE Login = :logini");
        $stmt->bindParam(':logini', $login);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function insertUser(string $login, string $password, int $age): void
    {
        $img = "anon.png";
        $stmt = $this->pdo->prepare("INSERT INTO dane_uzytkownika (Login, Haslo, Wiek) VALUES (:logini, :passwordi, :age)");
        $stmt->bindParam(':logini', $login);
        $stmt->bindParam(':passwordi', $password);
        $stmt->bindParam(':age', $age);
        $stmt->execute();
    }

    public function insertToken(string $token, int $id_user): void
    {
        $stmt = $this->pdo->prepare("INSERT INTO tokeny (Token, id_konta) VALUES (:token, :id_user)");
        $stmt->bindParam(':token', $token);
        $stmt->bindParam(':id_user', $id_user);
        $stmt->execute();
    }

    public function generatetoken(): string
    {
        $token = bin2hex(random_bytes(10));
        return $token;
    }

    public function deleteToken(string $token): array|bool
    {
        $stmt = $this->pdo->prepare("DELETE FROM Tokeny WHERE Token = :token");
        $stmt->bindParam(':token', $token);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

    }
}
