/*
hostname = apivtp.vietteltelecom.vn:0
*/

let body= $request.body;
$notification.post("Data Flow, write cache token: Done! Success", "", "")
$persistentStore.write(body, "bodytoken");
$done({});