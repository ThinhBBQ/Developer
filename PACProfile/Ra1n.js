var DIRECT = "DIRECT";
var SURGE = "PROXY 127.0.0.1:6152";
var BLACK = "SOCKS5 127.0.0.1:1080; SOCKS 127.0.0.1:1080;";
var blacklist = {
    "ocsp.apple.com":1,
    "gdmf.apple.com":1,
    "mesu.apple.com":1,
    "swscan.apple.com":1,
    "su.itunes.apple.com":1,
    "appldnld.apple.com":1,
    "world-gen.g.aaplimg.com":1
};
function FindProxyForURL(url, host) {
    var lastPos;
    do {
        if (blacklist.hasOwnProperty(host)) {
            return BLACK;
        }
        lastPos = host.indexOf('.') + 1;
        host = host.slice(lastPos);
    } while (lastPos >= 1);
    return SURGE;
}