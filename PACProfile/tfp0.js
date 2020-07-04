//Global proxy map Local

var DIRECT="DIRECT";
var PROXY_DIRECT="PROXY 127.0.0.1:6789; PROXY 127.0.0.1:6152; DIRECT";
var BLACK="PROXY 127.0.0.1:1080";
var WHITE=DIRECT;
function s(u,r){return shExpMatch(u,r);}
function d(h,r){return dnsDomainIs(h,r);}
function n(h,r,m){return isInNet(h,r,m);}
function e(u){var h;if(u.indexOf("://")>-1){h=u.split('/')[2];}else{h=u.split('/')[0];}h=h.split(':')[0];var s=h.split('.').reverse();return s;}
function FindProxyForURL(url,host)
{var u=url.toLowerCase();
var h=host.toLowerCase();
var a=e(u);
var b=a[0];
var c=a[1];
var f=c.length;
var t=c[f-1];
var z=c[f-2];

//VIF
if(d(h,"ffapple.com")||d(h,"dropbox.com")||d(h,"dropboxapi.com")||d(h,"windscribe.com")||d(h,"google.com")||d(h,"gmail.com")||d(h,"fbcdn.net")||d(h,"facebook.com")||d(h,"twitter.com")||d(h,"icloud.com")||d(h,"guzzoni.apple.com")||d(h,"in.appcenter.ms")||d(h,"gsa.apple.com")||d(h,"ess.apple.com")||d(h,"mzstatic.com")||d(h,"icloud-content.com"))
{return WHITE;}

//BLACK
if(d(h,"ocsp.apple.com")||
(d(h,"su.itunes.apple.com")||(d(h,"mesu.apple.com")||(d(h,"gdmf.apple.com")||(d(h,"appldnld.apple.com")
{return BLACK;}
return PROXY_DIRECT;}