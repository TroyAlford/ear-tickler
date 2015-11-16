<?php
  if (file_exists('../../data/settings.php'))
    require_once('../../data/settings.php');

  require_once('authentication.php');
	require_once('database.php');
  require_once('default_settings.php');
	require_once('parser.php');

  header('Access-Control-Allow-Headers: Content-Type');

	$functions = [
    '$get' => function($args) {
		  if (ALLOW_CROSS_DOMAIN_REQUESTS)
		    header('Access-Control-Allow-Origin: *');

		  $user_id = $_COOKIE[USER_ID_COOKIE] != '' ?
		             $_COOKIE[USER_ID_COOKIE] : 0;

      $params = $args['$params'];
      $body = $args['$body'];

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
		  $user_id = $_COOKIE[USER_ID_COOKIE] != '' ?
		             $_COOKIE[USER_ID_COOKIE] : 0;

      $params = $args['$params'];
      $body = $args['$body'];

      $tracks = json_decode($body);
      foreach($tracks as $index => $track) {
        if (!property_exists($track, 'name') || !isset($track->name))
          $track->name = 'Unnamed Track';
        if (!property_exists($track, 'origin'))
          $track->origin = '';
      }

			$json = json_encode($tracks);

			$db = GetDatabase();
			$db->exec(
				"INSERT OR REPLACE INTO profiles (user_id, json)".
				"VALUES ({$user_id}, '{$json}')"
			);

      header('Content-type: application/json');
    }
  ];

	process_request($functions);
?>