let body= $request.body;
$notification.post("Data Flow write cache token done", "", "")
$persistentStore.write(body, "bodytoken");
$done({});