<?php
	if (file_exists('../settings.php'))
		require_once('../settings.php');

	require_once('default_settings.php');

	function GetDatabase() {
	  $setup_required = !file_exists(PATH_TO_DATABASE_FILE);
	  $db = new SQLite3(PATH_TO_DATABASE_FILE);

		if ($setup_required) {
			$default_tracks = file_get_contents(PATH_TO_DEFAULT_TRACKS_JSON);
			$default_tracks_sql = SQLite3::escapeString($default_tracks);

			$db = new SQLite3(PATH_TO_DATABASE_FILE);
			$db->exec("
				CREATE TABLE profiles (
					user_id INTEGER PRIMARY KEY AUTOINCREMENT,
					json TEXT NOT NULL DEFAULT '{}'
				);
			");
			$db->exec("
				INSERT INTO profiles (user_id, json)
				VALUES (0, '{$default_tracks_sql}')
			");
		}

		return $db;
	}
?>
