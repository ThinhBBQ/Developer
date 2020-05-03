//Smartcode Quantumult X
let isQuantumultX = $task !== undefined;
let isSurge = $httpClient !== undefined;
var $task = isQuantumultX ? $task : {};
var $httpClient = isSurge ? $httpClient : {};
var $prefs = isQuantumultX ? $prefs : {};
var $persistentStore = isSurge ? $persistentStore : {};
var $notify = isQuantumultX ? $notify : {};
var $notification = isSurge ? $notification : {};
if (isQuantumultX) {
    var errorInfo = {
        error: ''
    };
    $httpClient = {
        get: (url, cb) => {
            var urlObj;
            if (typeof (url) == 'string') {
                urlObj = {
                    url: url
                }
            } else {
                urlObj = url;
            }
            $task.fetch(urlObj).then(response => {
                cb(undefined, response, response.body)
            }, reason => {
                errorInfo.error = reason.error;
                cb(errorInfo, response, '')
            })
        },
        post: (url, cb) => {
            var urlObj;
            if (typeof (url) == 'string') {
                urlObj = {
                    url: url
                }
            } else {
                urlObj = url;
            }
            url.method = 'POST';
            $task.fetch(urlObj).then(response => {
                cb(undefined, response, response.body)
            }, reason => {
                errorInfo.error = reason.error;
                cb(errorInfo, response, '')
            })
        }
    }
}
if (isSurge) {
    $task = {
        fetch: url => {
            return new Promise((resolve, reject) => {
                if (url.method == 'POST') {
                    $httpClient.post(url, (error, response, data) => {
                        response.body = data;
                        resolve(response, {
                            error: error
                        });
                    })
                } else {
                    $httpClient.get(url, (error, response, data) => {
                        response.body = data;
                        resolve(response, {
                            error: error
                        });
                    })
                }
            })

        }
    }
}
if (isQuantumultX) {
    $persistentStore = {
        read: key => {
            return $prefs.valueForKey(key);
        },
        write: (val, key) => {
            return $prefs.setValueForKey(val, key);
        }
    }
}
if (isSurge) {
    $prefs = {
        valueForKey: key => {
            return $persistentStore.read(key);
        },
        setValueForKey: (val, key) => {
            return $persistentStore.write(val, key);
        }
    }
}
if (isQuantumultX) {
    $notification = {
        post: (title, subTitle, detail) => {
            $notify(title, subTitle, detail);
        }
    }
}
if (isSurge) {
    $notify = function (title, subTitle, detail) {
        $notification.post(title, subTitle, detail);
    }
}
//End
/*Using Quantumult X Cron*/

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
if(response.statusCode == 200){
let obj= JSON.parse(data);
if(obj["errorCode"] === "0"){
var token= obj["data"]["data"]["token"];
getdataremain(token);
}
else{
$notification.post("", "Login failed or the token has expired", "Trying to Re-Login! Please wait...");
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
if(response.statusCode == 200){
let obj= JSON.parse(data);
if(obj["errorCode"] === "0"){
var data= obj["data"][0];
$notification.post("❀ Cellular (2G/3G/LTE): " + data["pack_name"], "",  "✮ Available/Remain: " + data["remain_mb"]+"MB ~ " + Math.round(data["remain_mb"]/1024) + "GB\n❀ Expire date: " + data["expireDate"]);
}
else{
$notification.post("Token expired", "Re-Login in the My Viettel app", "Please!");
}
}
}
 $done();
});
}