/* Only for Surge
Using Surge Cron */
const region = "us"
const appIds = ["1543280334","1529119045","1546719359","1048431763","1488691677","1392434975"]

var cacheData = $persistentStore.read()
if (!cacheData) {
    cacheData = {}
} else {
    cacheData = JSON.parse(cacheData)
}

$httpClient.post('https://itunes.apple.com/lookup?id=' + appIds + "&country=" + region, function (error, response, data) {
    if (error) {
        console.log(error);
        $notification.post(" Apprice - Leͥgeͣnͫd", "⚠ Request failed", error)
        $done()
    } else {
        let appData = JSON.parse(data).results
        let priceChanged = ""
        let newAppAdded = ""
        for (var i = 0; i < appData.length; i++) {
            if (cacheData[appData[i].trackId]) {
                if (appData[i].formattedPrice != cacheData[appData[i].trackId].price) {
                    priceChanged = priceChanged + "💰 " + appData[i].trackName + " ☞ " + cacheData[appData[i].trackId].price + " ➵ " + appData[i].formattedPrice + "\n"
                    cacheData[appData[i].trackId].price = appData[i].formattedPrice
                }
            } else {
                newAppAdded = newAppAdded + "💰 " + appData[i].trackName + " ☞ " + appData[i].formattedPrice + "\n"
                cacheData[appData[i].trackId] = {
                    name: appData[i].trackName,
                    price: appData[i].formattedPrice
                }
            }
        }
        if (priceChanged) {
            $notification.post("🥳 Price of apps has changed", "", priceChanged)
        }
        if (newAppAdded) {
            $notification.post(" Apprice - Leͥgeͣnͫd", "", newAppAdded)
        }
        $persistentStore.write(JSON.stringify(cacheData))
        $done()
    }
})