<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Email validation</title>
		<link rel="stylesheet" type="text/css" href="styles/validation.css">
	</head>
	<body>
		<?php
			$name = $_POST['name'];
			$email = $_POST['email'];
			$tel = $_POST['tel'];
			$address = $_POST['address'];
			$message = $_POST['message'];
			$from = "From: $email";
			$to = 'regalhomerenovations@gmail.com';
			$subject = 'Message';
					
			$body = "From: $name\nE-Mail: $email\nPhone Number: $tel\nAddress: $address\n\n$message";
						
			if ($_POST['submit']) {
    			if ($name != '' && $email != '' && $tel != '' && $message != '') { 
        			if (mail ($to, $subject, $body, $from)) { 
        				echo '<p>Thank you! Your message has been sent!</p><p><a href="\">Back to the homepage.</a></p>';

    				} else { 
        				echo '<p>Something went wrong, if you want go back and try again!</p><p><a href="\">Back to the homepage.</a></p>'; 
    				}
    			} else {
        			echo '<p>You need to fill in all required fields!!</p><p><a href="\">Back to the homepage.</a></p>';
    			}
			}
		?>
	</body>
</html>