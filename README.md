# Indonesia-shipping

A NPM Package for fetching Indonesia shipping information(JNE, POS, TIKI)

This package is supported with cache, so less call to rajaongkir api
# Install

`npm install indonesia-shipping`

#Usage(init)
This is package using rajaongkir starter API and this is Unofficial rajaongkir.com NPM package. You must register at www.rajaongkir.com and get API key for using this package
```
var shipping = require('shipping-indonesia');
shipping.init('your-rajaongkir-api-key');

```

# Examples

##Get All Provinces
this is commonly use for Provinces autocomplete
```
shipping.getAllProvince(results => {
  console.log(results);
});
```

### Get specific provinces information by province_id
```
shipping.getProvinceById(province_id, result => {
  console.log(result);
});
```

### Get All City
this is commonly use for city autocomplete
```
shipping.getAllCity(results => {
  console.log(results);
});
```

### GET specific city information by city_id
```
shipping.getCityById(city_id, result => {
  console.log(results);
});
```
### Get City Information from postal code

```
shipping.getCityByPostal(results => {
  console.log(results);
});
```
__Example__:
```
index.getCityByPostal(14140, result => {
  console.log(result);
});
```

### GET Shipping Cost
Arguments:
* origin: city_id
* destination: city_id
* weight: in gram, (1kg = 1000)
* courier: courier type
  * JNE : `jne`
  * TIKI: `tiki`
  * POS Indonesia:  `pos`

```
shipping.getShippingCost(origin, destination, weight, courier, result => {
  console.log(result);
});
```
__Example__:
* origin: 501 is DI Yogyakarta city_id
* destination: 144 is Denpasar city_id
* weight: 1700 gram is equals 1.7 KG
* courier: jne
```
shipping.getShippingCost(501, 144, 1700, 'jne', result => {
  console.log(result);
});
```

__Result Example__:
```
"origin_details":{
   "city_id":"501",
   "province_id":"5",
   "province":"DI Yogyakarta",
   "type":"Kota",
   "city_name":"Yogyakarta",
   "postal_code":"55000"
},
"destination_details":{
   "city_id":"114",
   "province_id":"1",
   "province":"Bali",
   "type":"Kota",
   "city_name":"Denpasar",
   "postal_code":"80000"
},
"results":[
   {
      "code":"jne",
      "name":"Jalur Nugraha Ekakurir (JNE)",
      "costs":[
         {
            "service":"OKE",
            "description":"Ongkos Kirim Ekonomis",
            "cost":[
               {
                  "value":38000,
                  "etd":"4-5",
                  "note":""
               }
            ]
         },
         {
            "service":"REG",
            "description":"Layanan Reguler",
            "cost":[
               {
                  "value":44000,
                  "etd":"2-3",
                  "note":""
               }
            ]
         },
         {
            "service":"SPS",
            "description":"Super Speed",
            "cost":[
               {
                  "value":349000,
                  "etd":"",
                  "note":""
               }
            ]
         },
         {
            "service":"YES",
            "description":"Yakin Esok Sampai",
            "cost":[
               {
                  "value":98000,
                  "etd":"1-1",
                  "note":""
               }
            ]
         }
      ]
   }
]

```
# Bug, problem or feedback?
Please contact me at ryan.nixon.salim.com
or create issue at https://github.com/drgx/indonesia-shipping
# License
MIT
