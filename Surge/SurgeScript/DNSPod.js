//Author Lang Khach

/*
#DNSPod
dns DNSPod script-path=https://raw.githubusercontent.com/LongThinh/Programer/master/Sripting/Scripts/Surge-Script/DNSPod.js,script-update-interval=7200 //DNSPod

[Host]

#Special
imap.gmail.com = script:DNSPod
*googleapis.com* = script:DNSPod
*github.com* = script:DNSPod
iosnoops.com = script:DNSPod
ipsw.me = script:DNSPod
iosapps.itunes.apple.com = script:DNSPod
*/

const url = 'http://119.29.29.29/d?dn=' + $domain;
if ($network.v4.primaryInterface === 'en0') {
  $httpClient.get(url, function(error, response, data) {
    if (error) {
      $done({server: '8.8.4.4'});
    } else {
      $done({addresses: data.split(';'), ttl: 600});
    }
  });
} else {
  $done({server: '8.8.4.4'});
}