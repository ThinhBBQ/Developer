var DIRECT = "PROXY 127.0.0.1:6152; DIRECT";
var PROXY = "PROXY 127.0.0.1:6153";
var blacklist = {
    "su.itunes.apple.com":1,
    "gdmf.apple.com":1,
};
function FindProxyForURL(url, host) {
  host = host.toLowerCase();
  for (i = 0; i < 30; i++) {
    if (blacklist[host]) {
      return PROXY;
    }
    var index = host.indexOf(".");
    if (index == -1) {
      break;
    } else {
      host = host.substring(index + 1);
    }
  }
  return DIRECT;
}