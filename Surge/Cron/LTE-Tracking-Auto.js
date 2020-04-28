//Author LangKhach
Surge V4
Script type Event network-changed; cron

//Your Account
const account = {
user: "",
pass: "",
};

//APILoginMobile
var body = "account="+account.user + "&build_code=2020.4.15.2&cmnd=&device_id=00000000-0000-0000-0000-000000000000&device_name=L%20ng%20Kh%20ch%20s%20iPhone%20%28iPhone%20X%29&keyDeviceAcc=xxx&os_type=ios&os_version=13.300000&password="+account.pass + "&version_app=4.3.4";

var apiloginmobile = {
url: 'https://apivtp.vietteltelecom.vn:6768/myviettel.php/loginMobile',
headers: {},
body: body,
};

async function launch() {
await loginmobile();
}

launch()

function loginmobile(){ 
$httpClient.post(apiloginmobile, function(error, response, data){
  if (error) {
console.log('error');
  } else {
console.log(data);
if(response.status == 200){
let obj= JSON.parse(data);
if(obj["errorCode"] === "0"){
var token= obj["data"]["data"]["token"];
getdataremain(token);
}
else{
$notification.post("LTE Tracking: Account Username/Password or Token incorrect", "", "");
console.log(data);
}
}
}
 $done();
});
}

function getdataremain(token){ 
var body = "build_code=2020.4.15.2&device_id=00000000-0000-0000-0000-000000000000&device_name=L%20ng%20Kh%20ch%20s%20iPhone%20%28iPhone%20X%29&os_type=ios&os_version=13.300000&token=" + token+ "&version_app=4.3.4";
var dataremain = {
url: 'https://apivtp.vietteltelecom.vn:6768/myviettel.php/getDataRemain',
headers: {},
body: body,
};
$httpClient.post(dataremain, function(error, response, data){
  if (error) {
console.log('error');
  } else {
console.log(data);
if(response.status == 200){
let obj= JSON.parse(data);
if(obj["errorCode"] === "0"){
var data= obj["data"][0];
$notification.post("❀ LTE Cellular: " + data["pack_name"], "",  "❀ Remain/Available: " + data["remain_mb"]+"MB ~ " + Math.round(data["remain_mb"]/1024) + "GB\n❀ Expire date: " + data["expireDate"]);
}
else{
$notification.post("LTE Tracking token expired", "", "Re-Login in the My Viettel app, please!");
}
}
}
 $done();
});
}