<?php

$conn = new mysqli("localhost", "root", "", "vueDb");

if ($conn->connect_error) {
	# code...
	die("Could not connect");
}

$res = array('error' => false);

$action = 'read';

if (isset($_GET['action'])) {
	# code...
	$action = $_GET['action'];
}

if ($action == 'read') {
	# code...
	$result = $conn->query("SELECT * FROM users");
	$users = array();

	while ($row = $result->fetch_assoc()) {
		# code...
		array_push($users, $row);
	}

	$res['users'] = $users; 
}

if ($action == 'create') {
	# code...
	$username = $_POST['username'];
	$email = $_POST['email'];
	$mobile = $_POST['mobile'];

	$result = $conn->query("INSERT INTO users (username, email, mobile) VALUES ('$username', '$email', '$mobile')");

	if ($result) {
		# code...
		$res['message'] = "User added successfully";
	}else{
		$res['error'] = true;
		$res['message'] = "Could not insert user";
	}
}

if ($action == 'update') {
	# code...
	$id = $_POST['id'];
	$username = $_POST['username'];
	$email = $_POST['email'];
	$mobile = $_POST['mobile'];

	$result = $conn->query("UPDATE users SET username = '$username', email= '$email', mobile = '$mobile' WHERE id = '$id' ");

	if ($result) {
		# code...
		$res['message'] = "User updated successfully";
	}else{
		$res['error'] = true;
		$res['message'] = "Could not update user";
	}
}

if ($action == 'delete') {
	# code...
	$id = $_POST['id'];
	$result = $conn->query("DELETE FROM users WHERE id = '$id' ");

	if ($result) {
		# code...
		$res['message'] = "User deleted successfully";
	}else{
		$res['error'] = true;
		$res['message'] = "Could not delete user";
	}
}

$conn->close();

header("Content-type: application/json");
echo json_encode($res);

?>