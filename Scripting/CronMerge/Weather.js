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
/*Using Surge & Quantumult X Cron*/
const lang = "vi"
var lat_lon = "11.07641837795593,107.2654109254687"
var api = "3d70c64edae04ea7e679baf3d6384e89"
async function launch() {
    await weather();
    $done();
}

launch()

function weather() {
    let info = {
        url: "https://api.darksky.net/forecast/" + api + "/" + lat_lon + "?lang=" + lang + "&units=si&exclude=currently,minutely",
        headers: {},
    }
    $httpClient.get(info, async function (error, response, data) {
        if (error) {
            console.log(error);
            $notification.post("Dark Sky", lat_lon + '\nConnection error\n', error);
        } else {
            var obj = JSON.parse(data);
            console.log(obj);
            var hour_summary = obj.hourly.summary;
            var icon_text = obj.hourly.icon;
            var icon = "❓"
            if (icon_text == "clear-day") icon = "☀️";
            if (icon_text == "partly-cloudy-day") icon = "🌤";
            if (icon_text == "cloudy") icon = "☁️";
            if (icon_text == "rain") icon = "⛈";
            if (icon_text == "snow") icon = "❄️";
            if (icon_text == "sleet") icon = "🌨";
            if (icon_text == "wind") icon = "🌬";
            if (icon_text == "fog") icon = "💨";
            if (icon_text == "partly-cloudy-night") icon = "🌑";
            if (icon_text == "clear-night") icon = "🌜✨";
            var daily_prec_chance = obj.daily.data[0].precipProbability;
            var daily_maxtemp = obj.daily.data[0].temperatureMax;
            var daily_mintemp = obj.daily.data[0].temperatureMin;
            $notification.post("🇻🇳 Đồng Nai City", icon + " " + Math.round(daily_mintemp) + " - " + Math.round(daily_maxtemp) + "  ☔️ " + (Number(daily_prec_chance) * 100).toFixed(1)+ "%", hour_summary);        }
    });
}