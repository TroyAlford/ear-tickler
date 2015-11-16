<?php
	if (file_exists('../settings.php'))
		require_once('../settings.php');

	require_once('default_settings.php');

  /*
   * Check if a client IP is in our Server subnet
   *
   * @param string $client_ip
   * @param string $server_ip
   * @return boolean
   */
  function client_is_local() {
    $client_ip = $_SERVER['REMOTE_ADDR'];
    $server_ip = $_SERVER['SERVER_ADDR'];

    // Extract broadcast and netmask from ifconfig
    if (!($p = popen("ifconfig","r"))) return false;
    $out = "";
    while(!feof($p))
        $out .= fread($p,1024);
    fclose($p);

    $match  = "/^.*".$server_ip;
    $match .= ".*Bcast:(\d{1,3}\.\d{1,3}i\.\d{1,3}\.\d{1,3}).*";
    $match .= "Mask:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/im";
    if (!preg_match($match,$out,$regs))
        return false;

    $bcast = ip2long($regs[1]);
    $smask = ip2long($regs[2]);
    $ipadr = ip2long($client_ip);
    $nmask = $bcast & $smask;

    return (($ipadr & $smask) == ($nmask & $smask));
	}

	function client_is_authenticated() {
		return $_COOKIE[USER_ID_COOKIE] != '';
	}

	function enforce_authentication() {
	  if (!ALLOW_ANONYMOUS_USERS && !client_is_authenticated) {
	    header('HTTP/1.0 403 Unauthorized');
      exit();
	  }
	}

	// Enforce authentication settings automatically
	enforce_authentication();
?>
