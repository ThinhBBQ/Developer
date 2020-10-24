const express = require("express");
const app = express();
const isgd = require("isgd");
const fs = require("fs");
const ui = require("ui");
const port = 14302;
const plist = `https://raw.githubusercontent.com/longthinh/Programer/master/Toolbox/JSBox/Test.plist`;
const ipa = `http://127.0.0.1:${port}`;
const safari = require("safari");

async function run() {
  const names = fs.readdirSync("ipas");
  const { title } = await ui.menu(names);
  if (title == null) {
    return;
  }
  //ipa
  app.get("/app.ipa", (req, res) => {
    res.sendFile(__dirname + `/ipas/${title}`);
  });
  app.listen(port, () => {
    var plistencode = encodeURIComponent(`${plist}`);
    isgd.shorten(
      `itms-services://?action=download-manifest&url=${plistencode}`,
      function(res) {
        console.log(res);
        safari.open(res);
      }
    );
  });
}
run();