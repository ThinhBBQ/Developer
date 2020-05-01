/*
hostname = apivtp.vietteltelecom.vn:0
*/

/*Using Surge Script*/
let body= $request.body;
$notification.post("v1DataFlow write cache token: 🎉 Done, success!", "", "")
$persistentStore.write(body, "bodytoken");
$done({});