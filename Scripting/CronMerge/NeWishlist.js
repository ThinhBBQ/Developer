let isQuantumultX = $task != undefined; 
let isSurge = $httpClient != undefined; 
//HTTP
var $task = isQuantumultX ? $task : {};
var $httpClient = isSurge ? $httpClient : {};
//Cookie
var $prefs = isQuantumultX ? $prefs : {};
var $persistentStore = isSurge ? $persistentStore : {};
// 
var $notify = isQuantumultX ? $notify : {};
var $notification = isSurge ? $notification : {};
//Endregion
//Region 
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
                        if (response) {
                            response.body = data;
                            resolve(response, {
                                error: error
                            });
                        } else {
                            resolve(null, {
                                error: error
                            })
                        }
                    })
                } else {
                    $httpClient.get(url, (error, response, data) => {
                        if (response) {
                            response.body = data;
                            resolve(response, {
                                error: error
                            });
                        } else {
                            resolve(null, {
                                error: error
                            })
                        }
                    })
                }
            })

        }
    }
}
//Endregion
//Region cookie
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
//Endregion
//Region 
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
//Endregion

/*
Example:
apps=["833406430:hk","833406430/us","833406430-uk","833406430_jp","833406430 au","833406430|vn"] /:|_-
*/

/*Using Surge & Quantumult X Cron*/
console.log(" Wishlist");
apps=["1450936447","993160329","833406430"]; //appid :hk /us -uk _jp au |vn
let reg="us";
let notifys=[];
format_apps(apps);
function format_apps(x) {
    let apps_f={};
    x.forEach((n)=>{
        if(/^[a-zA-Z0-9:/|\-_\s]{1,}$/.test(n))
        {
            n=n.replace(/[/|\-_\s]/g,":");
            let n_n=n.split(":");
            if(n_n.length===1){
                if(apps_f.hasOwnProperty(reg)){
                    apps_f[reg].push(n_n);
                }
                else
                {
                    apps_f[reg]=[];
                    apps_f[reg].push(n_n[0])
                }
            }
            else if(n_n.length===2){
                if(apps_f.hasOwnProperty(n_n[1])){
                    apps_f[n_n[1]].push(n_n[0]);
                }
                else
                {
                    apps_f[n_n[1]]=[];
                    apps_f[n_n[1]].push(n_n[0])
                }
            }
            else{
                notifys.push(`ID error: ${n}`)
            }
        }
        else{
            notifys.push(`ID error: ${n}`)
        }
    });
    if(Object.keys(apps_f).length>0){
        post_data(apps_f);
    }
}
async function post_data(d) {
    try{
        let app_monitor=$prefs.valueForKey("app_monitor");
        if(app_monitor===""||app_monitor===undefined){
            app_monitor={}
        }
        else{
            app_monitor=JSON.parse(app_monitor)
        }
        let infos={};
        await Promise.all(Object.keys(d).map(async (k)=>{
            let config={
                url:'https://itunes.apple.com/lookup?id=' + d[k] + "&country=" + k,
                method:"post"
            };
            await $task.fetch(config).then((res)=>{
                let results=JSON.parse(res.body).results;
                if(Array.isArray(results)&&results.length>0){
                    results.forEach((x=>{
                        infos[x.trackId]={
                            n:x.trackName,
                            v:x.version,
                            p:x.formattedPrice
                        };
                        if(app_monitor.hasOwnProperty(x.trackId)){
                            if(JSON.stringify(app_monitor[x.trackId])!==JSON.stringify(infos[x.trackId])){
                                if(x.version!==app_monitor[x.trackId].v){
                                    notifys.push(`${flag(k)} 🔘 ${x.trackName} ❀ ${x.version}`)
                                }
                                if(x.formattedPrice!==app_monitor[x.trackId].p){
                                    notifys.push(`${flag(k)} 💵 ${x.trackName} ❀ ${x.formattedPrice}`)
                                }
                            }}
                        else{
                            notifys.push(`${flag(k)} 🔘 ${x.trackName} ❀ ${x.version}`);
                            notifys.push(`${flag(k)} 💵 ${x.trackName} ❀ ${x.formattedPrice}`)
                        }
                    }));
                }
                return Promise.resolve()
            }).catch((e)=>{
                console.log(e);
            });
        }));
        infos=JSON.stringify(infos);
        $prefs.setValueForKey(infos,"app_monitor");
        if(notifys.length>0){
            notify(notifys)
        }
        else{
            console.log(" Wishlist：🥴 No change")
        }
    }catch (e) {
        console.log(e);
    }
}
function notify(notifys){
    notifys=notifys.join("\n");
    console.log(notifys);
    $notify(" Wishlist","👨🏼‍💻 Price or version app has changed ✮ New apps added",notifys)
}
function flag(x){
  var flags = new Map([[ "AC" , "🇦🇨" ] , [ "AF" , "🇦🇫" ] , [ "AI" , "🇦🇮" ] , [ "AL" , "🇦🇱" ] , [ "AM" , "🇦🇲" ] , [ "AQ" , "🇦🇶" ] , [ "AR" , "🇦🇷" ] , [ "AS" , "🇦🇸" ] , [ "AT" , "🇦🇹" ] , [ "AU" , "🇦🇺" ] , [ "AW" , "🇦🇼" ] , [ "AX" , "🇦🇽" ] , [ "AZ" , "🇦🇿" ] , [ "BB" , "🇧🇧" ] , [ "BD" , "🇧🇩" ] , [ "BE" , "🇧🇪" ] , [ "BF" , "🇧🇫" ] , [ "BG" , "🇧🇬" ] , [ "BH" , "🇧🇭" ] , [ "BI" , "🇧🇮" ] , [ "BJ" , "🇧🇯" ] , [ "BM" , "🇧🇲" ] , [ "BN" , "🇧🇳" ] , [ "BO" , "🇧🇴" ] , [ "BR" , "🇧🇷" ] , [ "BS" , "🇧🇸" ] , [ "BT" , "🇧🇹" ] , [ "BV" , "🇧🇻" ] , [ "BW" , "🇧🇼" ] , [ "BY" , "🇧🇾" ] , [ "BZ" , "🇧🇿" ] , [ "CA" , "🇨🇦" ] , [ "CF" , "🇨🇫" ] , [ "CH" , "🇨🇭" ] , [ "CK" , "🇨🇰" ] , [ "CL" , "🇨🇱" ] , [ "CM" , "🇨🇲" ] , [ "CN" , "🇨🇳" ] , [ "CO" , "🇨🇴" ] , [ "CP" , "🇨🇵" ] , [ "CR" , "🇨🇷" ] , [ "CU" , "🇨🇺" ] , [ "CV" , "🇨🇻" ] , [ "CW" , "🇨🇼" ] , [ "CX" , "🇨🇽" ] , [ "CY" , "🇨🇾" ] , [ "CZ" , "🇨🇿" ] , [ "DE" , "🇩🇪" ] , [ "DG" , "🇩🇬" ] , [ "DJ" , "🇩🇯" ] , [ "DK" , "🇩🇰" ] , [ "DM" , "🇩🇲" ] , [ "DO" , "🇩🇴" ] , [ "DZ" , "🇩🇿" ] , [ "EA" , "🇪🇦" ] , [ "EC" , "🇪🇨" ] , [ "EE" , "🇪🇪" ] , [ "EG" , "🇪🇬" ] , [ "EH" , "🇪🇭" ] , [ "ER" , "🇪🇷" ] , [ "ES" , "🇪🇸" ] , [ "ET" , "🇪🇹" ] , [ "EU" , "🇪🇺" ] , [ "FI" , "🇫🇮" ] , [ "FJ" , "🇫🇯" ] , [ "FK" , "🇫🇰" ] , [ "FM" , "🇫🇲" ] , [ "FO" , "🇫🇴" ] , [ "FR" , "🇫🇷" ] , [ "GA" , "🇬🇦" ] , [ "GB" , "🇬🇧" ] , [ "HK" , "🇭🇰" ] , [ "ID" , "🇮🇩" ] , [ "IE" , "🇮🇪" ] , [ "IL" , "🇮🇱" ] , [ "IM" , "🇮🇲" ] , [ "IN" , "🇮🇳" ] , [ "IS" , "🇮🇸" ] , [ "IT" , "🇮🇹" ] , [ "JP" , "🇯🇵" ] , [ "KR" , "🇰🇷" ] , [ "MO" , "🇲🇴" ] , [ "MX" , "🇲🇽" ] , [ "MY" , "🇲🇾" ] , [ "NL" , "🇳🇱" ] , [ "PH" , "🇵🇭" ] , [ "RO" , "🇷🇴" ] , [ "RS" , "🇷🇸" ] , [ "RU" , "🇷🇺" ] , [ "RW" , "🇷🇼" ] , [ "SA" , "🇸🇦" ] , [ "SB" , "🇸🇧" ] , [ "SC" , "🇸🇨" ] , [ "SD" , "🇸🇩" ] , [ "SE" , "🇸🇪" ] , [ "SG" , "🇸🇬" ] , [ "TH" , "🇹🇭" ] , [ "TN" , "🇹🇳" ] , [ "TO" , "🇹🇴" ] , [ "TR" , "🇹🇷" ] , [ "TV" , "🇹🇻" ] , [ "TW" , "🇨🇳" ] , [ "UK" , "🇬🇧" ] , [ "UM" , "🇺🇲" ] , [ "US" , "🇺🇸" ] , [ "UY" , "🇺🇾" ] , [ "UZ" , "🇺🇿" ] , [ "VA" , "🇻🇦" ] , [ "VE" , "🇻🇪" ] , [ "VG" , "🇻🇬" ] , [ "VI" , "🇻🇮" ] , [ "VN" , "🇻🇳" ]])
  return flags.get(x.toUpperCase())
}
$done()
