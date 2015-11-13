<?php
	require_once('database.php');
	require_once('parser.php');

	$functions = [
		// Create a new user
		'$post'  => function($args) {
			header('Content-type: application/json');
			$db = DB();
			$body = json_decode($args['$body']);

			$username = $body->username;
			$password = $body->password;
			$data     = $body->data;

			if ($db->query("SELECT username FROM users WHERE username = {$username};")) {
				header('HTTP/1.0 409 Conflict');
				echo json_encode([
					'success' => false,
					'message' => "The username '{$username}' is already in use."
				]);
				return;
			}

			$hash = hash('sha256', $password);
			$db->query("INSERT INTO users (username, password, data) VALUES ('{$username}', '{$hash}', '{$data}')");
			$rows = $db->query("SELECT username FROM users WHERE username = '{$username}';");

			if (!$rows) {
				header('HTTP/1.0 500 Server Error');
				echo json_encode([
					'success' => false,
					'message' => "Error in creating your account. Please try again."
				]);
				return;
		  }

			$user = $rows->fetchArray(SQLITE3_ASSOC);
		  header('HTTP/1.0 201 Created');
		  echo json_encode([
		    'success'  => true,
		    'message'  => 'User created.',
		    'data'     => [
		      'user_id'  => $user['user_id'],
					'username' => $user['username'],
					'data'     => $user['data']
				]
		  ]);
		},
    '$get'  => function($args) {
      $params = $args['$params'];
      $body = $args['$body'];

      echo 'This is the response from GET.';
    }
  ];

	process_request($functions);
?>