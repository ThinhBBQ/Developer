/*
hostname = raw.githubusercontent.com, *.github.io,
^https:\/\/(raw.githubusercontent|\w+\.github)\.(com|io)\/.*\.js$ url script-response-body QuaX.js
*/
var body = $response.body;
body = '\/*\n@supported 1AD0C62ADBBC\n*\/\n' + body;
$done(body);