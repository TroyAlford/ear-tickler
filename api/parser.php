<?php
	function noop() {
		return;
	}

	function process_request($fn) {
		$verb = $_SERVER['REQUEST_METHOD'];
		parse_str($_SERVER['QUERY_STRING'], $params);
		$body = file_get_contents('php://input');

		switch ($verb) {
			case 'GET':
				$action = is_callable($fn['$get']) ? $fn['$get'] : noop;
				break;
			case 'POST':
				$action = is_callable($fn['$post']) ? $fn['$post'] : noop;
				break;
			case 'DELETE':
				$action = is_callable($delete) ? $delete : noop;
				break;
			case 'PUT':
				$action = is_callable($fn['$put']) ? $fn['$put'] : noop;
				break;
			case 'OPTIONS':
				$action = is_callable($fn['$options']) ? $fn['$options'] : noop;
				break;
			case 'HEAD':
				$action = is_callable($fn['$head']) ? $fn['$head'] : noop;
				break;
			default:
				$action = is_callable($fn['$error']) ? $fn['$error'] : noop;
		}

		$action([
			'$params' => $params,
			'$body'   => $body
		]);
	}
?>