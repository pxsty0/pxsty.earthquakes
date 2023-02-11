const fetch = require("node-fetch");
const cheerio = require("cheerio");
module.exports = function () {
  return new Promise(function (myResolve, myReject) {
    let earthquakes = [];
    fetch("https://deprem.afad.gov.tr/last-earthquakes.html")
      .catch(() => myReject("hata meydana geldi"))
      .then((res) => res.text())
      .then((res) => {
        let arr = [];
        const $ = cheerio.load(res);
        $("tbody>tr").each((i, el) => {
          let json = { tr: {}, en: {} };
          cheerio
            .load(el)("td")
            .each((x, y, i) => {
              const html = $(y).html();
              switch (x) {
                case 0:
                  json.tr.tarih = html;
                  json.en.date = html;
                  break;
                case 1:
                  json.tr.enlem = html;
                  json.en.latitude = html;
                  break;
                case 2:
                  json.tr.boylam = html;
                  json.en.longitude = html;
                  break;
                case 3:
                  json.tr.derinlik = html;
                  json.en.depth = html;
                  break;
                case 4:
                  json.tr.tip = html;
                  json.en.type = html;
                  break;
                case 5:
                  json.tr.buyukluk = html;
                  json.en.size = html;
                  break;
                case 6:
                  json.tr.yer = html;
                  json.en.place = html;
                  break;
                case 7:
                  json.afadDepremID = html;
                  break;
              }
              arr.push(json);
            });
          arr.map((a, i) => {
            if (earthquakes.includes(a)) return;
            earthquakes.push(a);
          });
        });
        if (earthquakes.length > 1) {
          myResolve(earthquakes);
        } else {
          myReject();
        }
      });
  });
};
