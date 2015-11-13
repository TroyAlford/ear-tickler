<?php
	define("DB_FILENAME", "../../data/database.db");
	function DB() {
		return new SQLite3(DB_FILENAME);
	}
?>
