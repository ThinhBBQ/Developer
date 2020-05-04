// test for surge
var domains = {
    "www.dropbox.com":1,
    "imap.gmail.com":1,
    "smtp.gmail.com":1,
    "pop.gmail.com":1,
};
 
var surge = "SOCKS5 127.0.0.1:6153; PROXY 127.0.0.1:6152;";
 
var direct = 'DIRECT;';
 
function FindProxyForURL(url, host) {
    var lastPos;
    do {
        if (domains.hasOwnProperty(host)) {
            return direct;
        }
        lastPos = host.indexOf('.') + 1;
        host = host.slice(lastPos);
    } while (lastPos >= 1);
    return surge;
}