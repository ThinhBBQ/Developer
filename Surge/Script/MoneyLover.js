var twicevn = JSON.parse($response.body);

twicevn.data.rwExpire = "2099-10-04T12:59:59.000Z"
twicevn.data.rwProduct = "finsify_sub_year_1"
twicevn.data.rwFirstPurchase = "2000-10-04T12:59:59.000Z"
twicevn.data.purchased = true
twicevn.data.rwMarket = "apple_store"
twicevn.data.rwLastPurchase = "9999-10-04T12:59:59.000Z"

$done({body: JSON.stringify(twicevn)});