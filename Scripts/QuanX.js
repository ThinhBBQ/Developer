/*
hostname = raw.githubusercontent.com, *.github.io,
^https:\/\/(raw.githubusercontent|\w+\.github)\.(com|io)\/.*\.js$ url script-response-body QuanX.js
*/
var body = $response.body;
body = '\/*\n@supported 00DD26467662\n*\/\n' + body;
$done(body);