/*
hostname = shopee.vn

if (isSurge) {
    $notify = function (title, subTitle, detail) {
        $notification.post(title, subTitle, detail);
    }
}
if ($request.headers['Cookie']) {
    var headerSP = $request.headers['Cookie'];
    var cookie = $persistentStore.write(headerSP, "CookieSP");
    if (!cookie){
      $notification.post("Shopee cookie lỗi", "", "Đăng nhập lại")
    } else {
      $notification.post("Shopee cookie: Done! Success", "", "")
    }
  } else {
    $notification.post("Shopee lỗi đọc cookie", "", "Đăng nhập lại")
  }
  $done({})
  */
  if ($request.headers['Cookie']) {
    var headerSP = $request.headers['Cookie'];
    var cookie = $persistentStore.write(headerSP, "CookieSP");
    if (!cookie){
      $notification.post("Shopee Cookie lỗi‼️", "", "Đăng nhập lại")
    } else {
      $notification.post("Shopee  Cookie done🎉🎉", "", "")
    }
  } else {
    $notification.post("Shopee lỗi đọc cookiee‼️", "", "Đăng nhập lại")
  }
  $done({})