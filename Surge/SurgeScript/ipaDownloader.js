//ipaDownloader by Lang Khach
var url = $request.url;
var obj = $request.body;

const api= "unlimapps";
const buy= "buyProduct";

if(url.indexOf(api) != -1){
var appidget = url.match(/\d{6,}$/);
console.log("appid: " + appidget);
$persistentStore.write(appidget.toString(),"appid");
$notification.post('ipaDowloader', 'iTunes PC: Search app and click Get', 'Author Lang Khach');
$done({body});
}
if(url.indexOf(buy) != -1){ 
var appid= $persistentStore.read("appid");
var body= obj.replace(/\d{6,}/, appid);
console.log('ipaDownloader \nappid: ' + appid);
$notification.post("ipaDownloader rewrite status: OK","","");
$done({body});
}