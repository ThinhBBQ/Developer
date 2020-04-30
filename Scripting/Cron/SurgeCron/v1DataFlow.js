/*Using Surge Cron*/
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
$notification.post("✿ LTE Cellular: " + data["pack_name"], "",  "❀ Remain/Available: " + data["remain_mb"]+"MB ~ " + Math.round(data["remain_mb"]/1024) + "GB\n❀ Expire date: " + data["expireDate"]);
}
else{
$notification.post("LTE Tracking token expired", "", "Re-Login in the My Viettel app, please!");
}
}
}
 $done();
});
}