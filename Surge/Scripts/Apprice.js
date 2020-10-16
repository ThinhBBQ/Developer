/* Only for Surge
Using Surge Cron */
const region = "us"
const appIds = ["1435082414","1292141449","533054060","1450650398","1392434975","840190547","1483522561","951598770","1461666739","1275979443","1283082051","1317522797","388624839","1291222612","1067596534","1479572902","517329357","1515743741","1488691677","1493095946","961390574","1488149884"]

var cacheData = $persistentStore.read()
if (!cacheData) {
    cacheData = {}
} else {
    cacheData = JSON.parse(cacheData)
}

$httpClient.post('https://itunes.apple.com/lookup?id=' + appIds + "&country=" + region, function (error, response, data) {
    if (error) {
        console.log(error);
        $notification.post(" Apprice", "Bad network connection")
        $done()
    } else {
        let appData = JSON.parse(data).results
        let priceChanged = ""
        let newAppAdded = ""
        for (var i = 0; i < appData.length; i++) {
            if (cacheData[appData[i].trackId]) {
                if (appData[i].formattedPrice != cacheData[appData[i].trackId].price) {
                    priceChanged = priceChanged + "💵 " + appData[i].trackName + " ✮ " + cacheData[appData[i].trackId].price + " ➵ " + appData[i].formattedPrice + "\n"
                    cacheData[appData[i].trackId].price = appData[i].formattedPrice
                }
            } else {
                newAppAdded = newAppAdded + "💵 " + appData[i].trackName + " ✮ " + appData[i].formattedPrice + "\n"
                cacheData[appData[i].trackId] = {
                    name: appData[i].trackName,
                    price: appData[i].formattedPrice
                }
            }
        }
        if (priceChanged) {
            $notification.post(" Apprice", "🥳 Price of apps has changed", priceChanged)
        }
        if (newAppAdded) {
            $notification.post(" Apprice", "🤩 New apps have been added to the list", newAppAdded)
        }
        $persistentStore.write(JSON.stringify(cacheData))
        $done()
    }
})