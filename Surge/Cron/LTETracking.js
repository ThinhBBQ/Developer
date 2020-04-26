/*Using Surge Cron*/

if($network.v4.primaryInterface == "pdp_ip0"){
var bodytoken = $persistentStore.read("bodytoken");
var dataremain = {
url: 'https://apivtp.vietteltelecom.vn:6768/myviettel.php/getDataRemain',
headers: {},
body: bodytoken,
};

async function launch() {
await getdataremain();
}
launch()
function getdataremain(){ 
$httpClient.post(dataremain, function(error, response, data){
  if (error) {
console.log('error');
  } else {
console.log(data);
if(response.status == 200){
let obj= JSON.parse(data);
if(obj["errorCode"] === "0"){
var data= obj["data"][0];
$notification.post("LTE Cellular " + data["pack_name"], "",  "Remain/Available: " + data["remain"] +"( ~ " + Math.round(data["remain_mb"]/1024) + "GB)\nExpire date: " + data["expireDate"]);
}
else{
$notification.post("LTE-Tracking token expired", "", "Please login again in the My Viettel application");
}
}
}
 $done();
});
}