/*
Shoppe Check in Get Cookie.
The following URL check in once
https://shopee.vn

*/

if ($request.headers['Cookie']) {
    var headerSP = $request.headers['Cookie'];
    var cookie = $persistentStore.write(headerSP, "CookieSP");
    if (!cookie){
      $notification.post("Shopee cookie lỗi", "", "Đăng nhập lại")
    } else {
      $notification.post("Shopee  cookie: Success!", "", "")
    }
  } else {
    $notification.post("Shopee lỗi đọc cookie", "", "Đăng nhập lại")
  }
  $done({})