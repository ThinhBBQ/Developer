/*Using Surge Cron*/

//Your Account
const account = {
user: "Username",
pass: "Password",
};

//APILoginMobile
var body = "account="+account.user + "&build_code=2020.4.15.2&cmnd=&device_id=00000000-0000-0000-0000-000000000000&device_name=%23LongThinh%20iPhone%207%20%28GSM%29%20B%2FA&keyDeviceAcc=xxx&os_type=ios&os_version=13.300000&password="+account.pass + "&version_app=4.3.4";

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
$notification.post("Username/Password incorrect", "Token expired", "Trying to Re-Login! Please wait...");
console.log(data);
}
}
}
 $done();
});
}

function getdataremain(token){ 
var body = "build_code=2020.4.15.2&device_id=00000000-0000-0000-0000-000000000000&device_name=%23LongThinh%20iPhone%207%20%28GSM%29%20B%2FA&os_type=ios&os_version=13.300000&token=" + token+ "&version_app=4.3.4";
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
$notification.post("Token expired", "Re-Login in the My Viettel app", "Please!");
}
}
}
 $done();
});
}