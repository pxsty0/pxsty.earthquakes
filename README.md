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
  const earthquakes = await EarthquakeAPI.getAllEarthquakes();
  try {
    console.log("Depremler:", earthquakes);
  } catch (err) {
    console.error("Veri çekme hatası!", err);
  }
};

fetchEarthquakes();
```

### JavaScript Örneği

```js
const EarthquakeAPI = require("pxsty.earthquakes").default;

const fetchEarthquakes = async () => {
  const earthquakes = await EarthquakeAPI.getAllEarthquakes();
  try {
    console.log("Depremler:", earthquakes);
  } catch (err) {
    console.error("Veri çekme hatası!", err);
  }
};

fetchEarthquakes();
```

## Dönen Veri Formatı

Başarılı bir istek aşağıdaki formatta bir dizi deprem verisi döndürür:

```json
[
  {
    date: 2025-04-25T08:41:51.000Z,
    latitude: 39.35639,
    longitude: 28.85528,
    depth: 7.17,
    type: 'ML',
    size: 1.4,
    place: 'Dursunbey (Balıkesir)'
  }
]
```

## Desteklenen Magnitüd Türleri

- `ML`: Yerel magnitüd
- `MW`: Moment magnitüdü

## Lisans

MIT Lisansı altında sunulmaktadır.
