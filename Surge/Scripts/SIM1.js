/*Using Surge Cron*/

//Your Account
const account = {
user: "Username",
pass: "Password",
};

//APILoginMobile
var body = "account="+account.user + "&build_code=2020.4.15.2&cmnd=&device_id=00000000-0000-0000-0000-000000000000&device_name=iPhone%207%20-%20MN8X2B%2FA&keyDeviceAcc=xxx&os_type=ios&os_version=13.300000&password="+account.pass + "&version_app=4.3.4";

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
$notification.post("Viettel", "Login failed or the token has expired", "Trying to Re-Login! Please wait...");
console.log(data);
}
}
}
 $done();
});
}

function getdataremain(token){ 
var body = "build_code=2020.4.15.2&device_id=00000000-0000-0000-0000-000000000000&device_name=iPhone%207%20-%20MN8X2B%2FA&os_type=ios&os_version=13.300000&token=" + token+ "&version_app=4.3.4";
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
$notification.post("SIM 1: " + data["pack_name"], "",  "Available: " + data["remain_mb"]+"MB ~ " + Math.round(data["remain_mb"]/1024) + "GB\nRenewal: ⚠ " + data["expireDate"]);
}
}
}
 $done();
});
}