/*
hostname = api.picsart.com
*/

  var shopeeUrl = {
    url: 'https://shopee.vn/mkt/coins/api/v2/checkin',
    headers: {
      Cookie: $persistentStore.read("CookieSP"),
    }
  }
$httpClient.post(shopeeUrl, function(error, response, data){
  if (error) {
$notification.post("Shopee checkin", "", "Lỗi kết nối")
    $done(); 
  } 
 else{
 if(response.statusCode == 200)
{
let obj= JSON.parse(data);
if(obj["data"]["success"])
{
var user = obj["data"]["username"];
var coins = obj["data"]["increase_coins"];
$notification.post("Shopee " + user, "", "Đã nhận được " + coins + "💰");
    $done();
}
}
else{
$notification.post("Shopee cookie đã hết hạn", "", "Hãy đăng nhập lại");
}
}
});