const user= "";//
const pass="";//
async function launch() {
const token = await login()
var data = await getdata(token)
const widget = createWidget(data)
Script.setWidget(widget)
Script.complete()
}
launch()

async function login(){
const url = "https://apivtp.vietteltelecom.vn:6768/myviettel.php/loginMobile"
  const request = new Request(url)
  request.method = "post"
  request.body = "account="+ user + "&build_code=2020.4.15.2&cmnd=&device_id=00000000-0000-0000-0000-000000000000&device_name=iPhone%207%20-%20MN8X2B%2FA&keyDeviceAcc=xxx&os_type=ios&os_version=13.300000&password="+ pass+ "&version_app=4.3.4"
  const resp = await request.loadJSON()

  const token = resp.data.data.token
  return token
}

async function getdata(token){
const url = "https://apivtp.vietteltelecom.vn:6768/myviettel.php/getDataRemain"
  const request = new Request(url)
  request.method = "post"
  request.body = "build_code=2020.4.15.2&device_id=00000000-0000-0000-0000-000000000000&device_name=iPhone%207%20-%20MN8X2B%2FA&os_type=ios&os_version=13.300000&token=" + token+ "&version_app=4.3.4"
  const resp = await request.loadJSON()
  console.log(resp)
  var data = resp["data"][0]
  return data
}


  function createWidget(data) {
  const w = new ListWidget()
  const bgColor = new LinearGradient()
  bgColor.colors = [new Color("#1c1c1c"), new Color("#29323c")]
  bgColor.locations = [0.0, 1.0]
  w.backgroundGradient = bgColor
  w.centerAlignContent()

  const time = new Date()
  const dfTime = new DateFormatter()
  dfTime.locale = "en"
  dfTime.useMediumDateStyle()
  dfTime.useNoTimeStyle()

  const firstLine = w.addText(`[📱] ${device()} now`)
  firstLine.textSize = 12
  firstLine.textColor = Color.white()
  firstLine.textOpacity = 0.7
  
  const timeLine = w.addText(`[🗓] ${dfTime.string(time)}`)
  timeLine.textSize = 12
  timeLine.textColor = Color.white()
  
  const pack = w.addText(`[📶] ${data["pack_name"]}`)
  pack.textSize = 12
  pack.textColor = new Color("#ffcc66")

  const ex = w.addText(`${data["expireDate"]}`)
  ex.textSize = 12
  ex.textColor = Color.white()
  
  const remain = w.addText(`${data["remain"]}`)
  remain.textSize = 24
  remain.textColor = Color.green()
  return w
}
function device() {
  const Level = "LTE Tracking"
  return Level
}