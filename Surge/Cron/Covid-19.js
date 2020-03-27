  var ncovUrl = {
    url: 'https://code.junookyo.xyz/api/ncov-moh/data.json',
  }
$httpClient.post(ncovUrl, function(error, response, data){
  if (error) {
$notification.post("Covid-19", "", "Bad connection")
    $done(); 
  } 
 else{
 if(response.status == 200)
{
let obj= JSON.parse(data);
if(obj["success"])
{
obj= obj["data"];
$notification.post("Covid-19 ","","🇻🇳 VN: Người nhiễm: " + obj["vietnam"]["cases"] +", Người chết: " + obj["vietnam"]["deaths"] + ", Hồi phục: " + obj["vietnam"]["recovered"] +"\n🌍 TG:  Người nhiễm: " + obj["global"]["cases"] +", Người chết: " + obj["global"]["deaths"] + ", Hồi phục: " + obj["global"]["recovered"]);
    $done();
}
}
else{
$notification.post("Covid-19", "", "API ERROR");
}
}
});