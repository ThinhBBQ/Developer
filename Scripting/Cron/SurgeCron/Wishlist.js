// Only for Surge

/*Using Surge Cron*/
const region = "us"
const appIds = ["1468074490","1508908939","1450936447","1476831789","1488616799","603037910","388624839","1447621189","1496970054","1423330822","1062022008","1493488946","804637783","1476300963","1445270056","1038175626","1446584073","1162704202","932747118","904237743","1498218685","1392434975","833406430","1441863446","1504268557","388627783","1047223162","1126386264","1470774095","288113403","1497324992","1282297037","539397400","1373567447","1457369322","1404384367","979274575","1441490807","1126314052","1454921448","1465749029","1506375654","946930094","1407249786","1065511007","1448744070","492648096","1289070327","1446549608","1459055246","1443988620","1442620678","896694807","1477376905","1436251125","797395252"]

var cacheData = $persistentStore.read()
if (!cacheData) {
    cacheData = {}
} else {
    cacheData = JSON.parse(cacheData)
}

$httpClient.post('https://itunes.apple.com/lookup?id=' + appIds + "&country=" + region, function (error, response, data) {
    if (error) {
        console.log(error);
        $notification.post(" Wishlist", "bad connection")
        $done()
    } else {
        let appData = JSON.parse(data).results
        let priceChanged = ""
        let newAppAdded = ""
        for (var i = 0; i < appData.length; i++) {
            if (cacheData[appData[i].trackId]) {
                if (appData[i].formattedPrice != cacheData[appData[i].trackId].price) {
                    priceChanged = priceChanged + "💸 " + appData[i].trackName + "  " + cacheData[appData[i].trackId].price + " → " + appData[i].formattedPrice + "\n"
                    cacheData[appData[i].trackId].price = appData[i].formattedPrice
                }
            } else {
                newAppAdded = newAppAdded + "💸 " + appData[i].trackName + "  " + appData[i].formattedPrice + "\n"
                cacheData[appData[i].trackId] = {
                    name: appData[i].trackName,
                    price: appData[i].formattedPrice
                }
            }
        }
        if (priceChanged) {
            $notification.post(" Wishlist：🥳 Price changed", "", priceChanged)
        }
        if (newAppAdded) {
            $notification.post(" Wishlist", "", newAppAdded)
        }
        $persistentStore.write(JSON.stringify(cacheData))
        $done()
    }
})