# pxsty.earthquakes

## pxsty.earthquakes, AFAD (Afet ve Acil Durum Yönetimi Başkanlığı) web sitesinden son depremleri çekmek için geliştirilmiş bir Node.js kütüphanesidir.

Kütüphaneyi, depremin 2. yılını anarken yeniliyorum. Vefat eden herkese Allah'tan rahmet, yaralanan herkese şifalar diliyorum. Ülkemiz için böyle acı dolu anların bir daha yaşanmaması dileğiyle.

## Kurulum

```sh
npm install pxsty.earthquakes
```

veya

```sh
yarn add pxsty.earthquakes
```

## Kullanım

### TypeScript Örneği

```ts
import EarthquakeAPI from "pxsty.earthquakes";

const fetchEarthquakes = async () => {
  const response = await EarthquakeAPI.getAllEarthquakes();
  if (response.type === "SUCCESS") {
    console.log("Depremler:", response.data);
  } else {
    console.error("Veri çekme hatası!");
  }
};

fetchEarthquakes();
```

### JavaScript Örneği

```js
const EarthquakeAPI = require("pxsty.earthquakes").default;

async function fetchEarthquakes() {
  const response = await EarthquakeAPI.getAllEarthquakes();
  if (response.type === "SUCCESS") {
    console.log("Depremler:", response.data);
  } else {
    console.error("Veri çekme hatası!");
  }
}

fetchEarthquakes();
```

## Dönen Veri Formatı

Başarılı bir istek aşağıdaki formatta bir dizi deprem verisi döndürür:

```json
{
  "type": "SUCCESS",
  "data": [
    {
      "date": "2024-02-06 12:34:56",
      "latitude": 38.9637,
      "longitude": 35.2433,
      "depth": 10.2,
      "type": "ML",
      "size": 4.5,
      "place": "Ankara, Türkiye"
    }
  ]
}
```

Eğer hata oluşursa:

```json
{
  "type": "ERROR",
  "data": []
}
```

## Desteklenen Magnitüd Türleri

- `ML`: Yerel magnitüd
- `MW`: Moment magnitüdü

## Lisans

MIT Lisansı altında sunulmaktadır.
