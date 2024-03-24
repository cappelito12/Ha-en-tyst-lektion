<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Hämta formulärdata
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Skapa e-postmeddelandet
    $to = "example@example.com"; // Ändra till rätt e-postadress dit meddelandet ska skickas
    $subject = "Meddelande från Team Kvist Go-Kart";
    $msg = "Namn: $name\n";
    $msg .= "E-post: $email\n\n";
    $msg .= "Meddelande:\n$message\n";
    
    // Skicka e-postmeddelandet
    $headers = "From: $email";

    if (mail($to, $subject, $msg, $headers)) {
        echo "Ditt meddelande har skickats!";
    } else {
        echo "Något gick fel. Försök igen senare.";
    }
} else {
    echo "Ogiltig förfrågan";
}
?>
