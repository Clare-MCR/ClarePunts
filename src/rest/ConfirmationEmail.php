<?php
function sendConfirmation($booker, $timeFrom, $timeTo)
{
    $to = $booker . '@cam.ac.uk';
    $subject = "Punt Booking Confirmation";

    $message = "Congratulations! You have successfully booked a punt ";
    $message .= "on " . gmdate('l dS F Y', $timeFrom) . " between ";
    $message .= gmdate('g:i a', $timeFrom) . ' and ' . gmdate('g:i a', $timeTo). '.';

    $headers = 'From: Clare Punts<clarepunts-webmaster@srcf.net>' ."\r\n";
    $headers .= 'Reply-To: MCR Admiral <mcr-admiral@clare.cam.ac.uk>' . "\r\n";

    mail($to, $subject, $message, $headers);
}
