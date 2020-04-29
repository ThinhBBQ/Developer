//Script event auto linked ipv4 nextdns: network-change

/*
[General]
always-real-ip = link-ip.nextdns.io

[Host]
link-ip.nextdns.io = server:My DNS
*/

$httpClient.get('https://link-ip.nextdns.io/f31fe4/68c133178029b700', function(error, response, data){
  if (error) {
console.log(error + '!');
  } else {
console.log(data);
$done();
  }
});
