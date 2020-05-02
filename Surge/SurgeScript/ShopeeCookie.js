/*
hostname = shopee.vn
*/

/*Using Surge Script*/
if ($request.headers['Cookie']) {
    var headerSP = $request.headers['Cookie'];
    var cookie = $persistentStore.write(headerSP, "CookieSP");
    if (!cookie){
      $notification.post("Shopee cookie error", "", "Re-Login, please!")
    } else {
      $notification.post("Shopee cookie", "Great!", "🥳 Done, success!")
    }
  } else {
    $notification.post("Shopee read the cookie faile", "", "Re-Login, please!")
  }
  $done({})