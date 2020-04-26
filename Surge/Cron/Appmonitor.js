/*Using Surge Cron*/

console.log("Appmonitor");
let apps=["1450936447","1476831789","1488616799","603037910","388624839","1447621189","1496970054","1423330822","1062022008","1493488946","804637783","1476300963","1445270056","1038175626","1446584073","1162704202","932747118","904237743","1498218685","1392434975","833406430","1441863446","1504268557","388627783","1047223162","1126386264","1470774095","288113403","1497324992","1282297037","539397400","1373567447","1457369322","1404384367","979274575","1441490807","1126314052","1454921448","1465749029","1506375654","946930094","1407249786","1065511007","1448744070","492648096","1289070327","1446549608","1459055246","1443988620","1442620678","896694807","1477376905","1436251125","797395252"];
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
                notifys.push(`ID error:${n}`)
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
                                    notifys.push(`${flag(k)} 💸 ${x.trackName} ❀ ${x.formattedPrice}`)
                                }
                            }}
                        else{
                            notifys.push(`${flag(k)} 🔘 ${x.trackName} ❀ ${x.version}`);
                            notifys.push(`${flag(k)} 💸 ${x.trackName} ❀ ${x.formattedPrice}`)
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
            console.log("Appmonitor：🥴 No change")
        }
    }catch (e) {
        console.log(e);
    }
}
function notify(notifys){
    notifys=notifys.join("\n");
    console.log(notifys);
    $notify("Appmonitor","",notifys)
}
function flag(x){
  var flags = new Map([[ "AC" , "🇦🇨" ] , [ "AF" , "🇦🇫" ] , [ "AI" , "🇦🇮" ] , [ "AL" , "🇦🇱" ] , [ "AM" , "🇦🇲" ] , [ "AQ" , "🇦🇶" ] , [ "AR" , "🇦🇷" ] , [ "AS" , "🇦🇸" ] , [ "AT" , "🇦🇹" ] , [ "AU" , "🇦🇺" ] , [ "AW" , "🇦🇼" ] , [ "AX" , "🇦🇽" ] , [ "AZ" , "🇦🇿" ] , [ "BB" , "🇧🇧" ] , [ "BD" , "🇧🇩" ] , [ "BE" , "🇧🇪" ] , [ "BF" , "🇧🇫" ] , [ "BG" , "🇧🇬" ] , [ "BH" , "🇧🇭" ] , [ "BI" , "🇧🇮" ] , [ "BJ" , "🇧🇯" ] , [ "BM" , "🇧🇲" ] , [ "BN" , "🇧🇳" ] , [ "BO" , "🇧🇴" ] , [ "BR" , "🇧🇷" ] , [ "BS" , "🇧🇸" ] , [ "BT" , "🇧🇹" ] , [ "BV" , "🇧🇻" ] , [ "BW" , "🇧🇼" ] , [ "BY" , "🇧🇾" ] , [ "BZ" , "🇧🇿" ] , [ "CA" , "🇨🇦" ] , [ "CF" , "🇨🇫" ] , [ "CH" , "🇨🇭" ] , [ "CK" , "🇨🇰" ] , [ "CL" , "🇨🇱" ] , [ "CM" , "🇨🇲" ] , [ "CN" , "🇨🇳" ] , [ "CO" , "🇨🇴" ] , [ "CP" , "🇨🇵" ] , [ "CR" , "🇨🇷" ] , [ "CU" , "🇨🇺" ] , [ "CV" , "🇨🇻" ] , [ "CW" , "🇨🇼" ] , [ "CX" , "🇨🇽" ] , [ "CY" , "🇨🇾" ] , [ "CZ" , "🇨🇿" ] , [ "DE" , "🇩🇪" ] , [ "DG" , "🇩🇬" ] , [ "DJ" , "🇩🇯" ] , [ "DK" , "🇩🇰" ] , [ "DM" , "🇩🇲" ] , [ "DO" , "🇩🇴" ] , [ "DZ" , "🇩🇿" ] , [ "EA" , "🇪🇦" ] , [ "EC" , "🇪🇨" ] , [ "EE" , "🇪🇪" ] , [ "EG" , "🇪🇬" ] , [ "EH" , "🇪🇭" ] , [ "ER" , "🇪🇷" ] , [ "ES" , "🇪🇸" ] , [ "ET" , "🇪🇹" ] , [ "EU" , "🇪🇺" ] , [ "FI" , "🇫🇮" ] , [ "FJ" , "🇫🇯" ] , [ "FK" , "🇫🇰" ] , [ "FM" , "🇫🇲" ] , [ "FO" , "🇫🇴" ] , [ "FR" , "🇫🇷" ] , [ "GA" , "🇬🇦" ] , [ "GB" , "🇬🇧" ] , [ "HK" , "🇭🇰" ] , [ "ID" , "🇮🇩" ] , [ "IE" , "🇮🇪" ] , [ "IL" , "🇮🇱" ] , [ "IM" , "🇮🇲" ] , [ "IN" , "🇮🇳" ] , [ "IS" , "🇮🇸" ] , [ "IT" , "🇮🇹" ] , [ "JP" , "🇯🇵" ] , [ "KR" , "🇰🇷" ] , [ "MO" , "🇲🇴" ] , [ "MX" , "🇲🇽" ] , [ "MY" , "🇲🇾" ] , [ "NL" , "🇳🇱" ] , [ "PH" , "🇵🇭" ] , [ "RO" , "🇷🇴" ] , [ "RS" , "🇷🇸" ] , [ "RU" , "🇷🇺" ] , [ "RW" , "🇷🇼" ] , [ "SA" , "🇸🇦" ] , [ "SB" , "🇸🇧" ] , [ "SC" , "🇸🇨" ] , [ "SD" , "🇸🇩" ] , [ "SE" , "🇸🇪" ] , [ "SG" , "🇸🇬" ] , [ "TH" , "🇹🇭" ] , [ "TN" , "🇹🇳" ] , [ "TO" , "🇹🇴" ] , [ "TR" , "🇹🇷" ] , [ "TV" , "🇹🇻" ] , [ "TW" , "🇨🇳" ] , [ "UK" , "🇬🇧" ] , [ "UM" , "🇺🇲" ] , [ "US" , "🇺🇸" ] , [ "UY" , "🇺🇾" ] , [ "UZ" , "🇺🇿" ] , [ "VA" , "🇻🇦" ] , [ "VE" , "🇻🇪" ] , [ "VG" , "🇻🇬" ] , [ "VI" , "🇻🇮" ] , [ "VN" , "🇻🇳" ]])
  return flags.get(x.toUpperCase())
}