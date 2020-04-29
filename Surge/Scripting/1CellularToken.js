/*
hostname = apivtp.vietteltelecom.vn:0

#LTE Tracking Login
LTE Tracking Login = type=http-request,pattern=^https:\/\/apivtp\.vietteltelecom\.vn:6768\/myviettel\.php\/registerPush$,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/LongThinh/Programer/master/Surge/Script/LTE-Tracking-Login.js,script-update-interval=7200

*/

/*Using Surge Script*/
let body= $request.body;
$notification.post("LTE Tracking write cache token: 🎉 Done, success!", "", "")
$persistentStore.write(body, "bodytoken");
$done({});