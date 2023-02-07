<?php include 'connection.php';

$json = file_get_contents('php://input');

// decoding the received JSON and store into $obj variable.
$obj = json_decode($json, true);

// same with $email.
$email = $obj['email'];
// name store into $name.
$name = $obj['username'];
// same with $password.
$password = $obj['password'];
// same with $password.
$fullname = $obj['fullname'];
// same with $password.
$surname = $obj['surname'];
// same with $password.
$weight = $obj['weight'];
// same with $password.
$high = $obj['high'];
// same with $password.
$age = $obj['age'];
// same with $password.
$gender = $obj['gender'];
// same with $password.
$details = $obj['details'];


if ($obj['username'] != "") {

	// $result= $mysqli->query("SELECT * FROM users where email='$email'");
	$query = sprintf(
		"SELECT * FROM users WHERE usernamel= '%s' limit 1",
		$mysqli->real_escape_string($usernmae)
	);

	$result = $mysqli->query($query);

	if ($result->num_rows > 0) {
		echo json_encode('username already exist');  // alert msg in react native		 		
	} else {
		//    $add = $mysqli->query("insert into users (name,email,password) values('$name','$email','$password')");
		$query = sprintf(
			"insert into users (email,username,password,fullname,surname,weight,high,age,gender,details) values('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')",
			$mysqli->real_escape_string($email),
			$mysqli->real_escape_string($username)
			$mysqli->real_escape_string($password)
            $mysqli->real_escape_string($fullname),
			$mysqli->real_escape_string($surname)
			$mysqli->real_escape_string($weight)
			$mysqli->real_escape_string($high)
			$mysqli->real_escape_string($age)
			$mysqli->real_escape_string($gender)
			$mysqli->real_escape_string($details)
		);

		$result = $mysqli->query($query);
		if ($add) {
			echo  json_encode('User Registered Successfully'); // alert msg in react native
		} else {
			echo json_encode('check internet connection'); // our query fail 		
		}
	}
} else {
	echo json_encode('try again');
}