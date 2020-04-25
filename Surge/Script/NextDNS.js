//Script event auto linked ipv4 nextdns: network-change

$httpClient.get('https://link-ip.nextdns.io/f31fe4/68c133178029b700', function(error, response, data){
  if (error) {
console.log(error + '!');
  } else {
console.log(data);
$done();
  }
});
