<?php
	require_once('database.php');
	require_once('parser.php');

	$functions = [
    '$get' => function($args) {
      header('Content-type: application/json');

      $params = $args['$params'];
      $body = $args['$body'];

      $db = new DB()->$db;


      echo 'This is the response from GET.';
    },
    '$post' => function($args) {
      $params = $args['$params'];
      $body = $args['$body'];
      echo 'This is the response from POST.';
    }
  ];

	process_request($functions);
?>