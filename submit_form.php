<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Anpassa dessa uppgifter enligt dina behov
    $to = "casperkvist12@gmail.com";
    $subject = "Nytt meddelande från $name";
    $headers = "From: $email";

    // Skicka e-post
    mail($to, $subject, $message, $headers);

    // Omdirigera till en bekräftelsessida
    header("Location: confirmation.html");
}
?>
