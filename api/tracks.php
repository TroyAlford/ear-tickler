<?php
  if (file_exists('../../data/settings.php'))
    require_once('../../data/settings.php');

  require_once('authentication.php');
	require_once('database.php');
  require_once('default_settings.php');
	require_once('parser.php');

	$functions = [
    '$get' => function($args) {
      $params = $args['$params'];
      $body = $args['$body'];

      $user_id = $_COOKIE[USER_ID_COOKIE] != '' ?
                 $_COOKIE[USER_ID_COOKIE] : 0;

      $db = GetDatabase();
	    $json = $db->querySingle(
	      "SELECT json FROM profiles WHERE user_id = {$user_id}"
      );
	    if (is_null($json)) {
	      $json = $db->querySingle(
	        "SELECT json FROM profiles WHERE user_id = 0"
	      );
	    }
      header('Content-type: application/json');
      echo $json;
    },
    '$post' => function($args) {
      $params = $args['$params'];
      $body = $args['$body'];

      $tracks = json_decode($body);
      echo 'You passed in...<br/>';
      foreach($tracks as $key => $value) {
        echo '&nbsp;&bull;&nbsp;', $key, ': ', $value, '<br/>';
      }

			//$db = GetDatabase();

      header('Content-type: application/json');
      echo 'This is the response from POST.';
    }
  ];

	process_request($functions);
?>