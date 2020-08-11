/* Only for Surge
Using Surge Cron */
const region = "us"
const appIds = ["347345474","840190547","1483522561","951598770","1461666739","1488616799","1317522797","388624839","1502903102","1485594255","1291222612","502633252","961390574","517329357","1067596534","1295524988","1479572902","1491713518","1373567447","932747118","946930094","993160329","1155470386","1436251125","1466120520","1463315864","1482338564","1470774095","539397400","1282297037","1450936447","1423330822","1465749029","1407249786","1065511007","1490211589","1446549608","1289070327","1459055246","1443988620","1442620678","896694807","904237743","999025824","833406430"]

var cacheData = $persistentStore.read()
if (!cacheData) {
    cacheData = {}
} else {
    cacheData = JSON.parse(cacheData)
}

$httpClient.post('https://itunes.apple.com/lookup?id=' + appIds + "&country=" + region, function (error, response, data) {
    if (error) {
        console.log(error);
        $notification.post(" Apprice", "bad connection")
        $done()
    } else {
        let appData = JSON.parse(data).results
        let priceChanged = ""
        let newAppAdded = ""
        for (var i = 0; i < appData.length; i++) {
            if (cacheData[appData[i].trackId]) {
                if (appData[i].formattedPrice != cacheData[appData[i].trackId].price) {
                    priceChanged = priceChanged + "💵 " + appData[i].trackName + " ✮ " + cacheData[appData[i].trackId].price + " → " + appData[i].formattedPrice + "\n"
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
