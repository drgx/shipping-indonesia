'use strict';
const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const qs = require('querystring');
const shipCache = new NodeCache({ stdTTL: 100, checkperiod: 120, errorOnMissing: true });
const headers = {
  key: null
};
const requestData = {
  APIHostName: 'http://api.rajaongkir.com',
  APIUrl: {
    city: '/starter/city',
    province: '/starter/province',
    cost: '/starter/cost'
  }
};

exports.init = key => {
  headers.key = key;
};

exports.getAPIResult = (apiPath, method, headers, result) => {
  const hostName = `${requestData.APIHostName}${apiPath}`;
  const options = {
    method,
    headers
  };

  let apiObject;
  switch (apiPath) {
    case requestData.APIUrl.province: apiObject = 'province'; break;
    case requestData.APIUrl.city: apiObject = 'city'; break;
    default: apiObject = '';
  }

  shipCache.get(apiObject, (err, value) => {
    if (!err) {
      result(value);
    }
  });

  fetch(hostName, options)
  .then(res => {
    return res.json();
  }).then(json => {
    shipCache.set(apiObject, json.rajaongkir.results, 10000);
    shipCache.get(apiObject, (err, val) => {
      if (err) {
        result(json.rajaongkir.results);
      }
      result(val);
    });
  });
};

exports.getAllProvince = result => {
  this.getAPIResult(requestData.APIUrl.province, 'GET', headers, result);
};

exports.getProvinceById = (provinceId, result) => {
  if (provinceId && Number.isInteger(provinceId)) {
    this.getAPIResult(`${requestData.APIUrl.province}?id=${provinceId}`, 'GET', result);
  } else {
    console.error('provinceId must be filled and integer');
  }
};

exports.getAllCity = result => {
  this.getAPIResult(requestData.APIUrl.city, 'GET', headers, result);
};

exports.getCityById = (cityId, result) => {
  if (cityId && Number.isInteger(cityId)) {
    this.getAPIResult(`${requestData.APIUrl.city}?id=${cityId}`, 'GET', headers, result);
  } else {
    console.error('cityId must be filled and integer');
  }
};

exports.getShippingCost = (origin, destination, weight, courier, result) => {
  const costHeaders = Object.assign(headers, { 'content-type': 'application/x-www-form-urlencoded' });
  const apiPath = requestData.APIUrl.cost;
  const hostName = `${requestData.APIHostName}${apiPath}`;
  const options = {
    method: 'POST',
    headers: costHeaders,
    body: qs.stringify({
      origin,
      destination,
      weight,
      courier
    })
  };

  fetch(hostName, options).then(res => {
    return res.json();
  }).then(json => {
    const apiResult = {
      origin_details: json.rajaongkir.origin_details,
      destination_details: json.rajaongkir.destination_details,
      results: json.rajaongkir.results
    };
    result(apiResult);
  });
};

exports.checkPostalData = (postal, data, callback) => {
  for (let a = 0; a < data.length; a++) {
    if (data[a].postal_code == postal) {
      callback(data[a]);
      break;
    }
  }
};

exports.getCityByPostal = (postal, callback) => {
  if (typeof postal === 'number') {
    shipCache.get('city', (err, val) => {
      if (err) {
        this.getAllcity(results => {
          this.checkPostalData(postal, results, callback);
        });
      } else {
        this.checkPostalData(postal, val, callback);
      }
    });
  } else {
    console.error('Postal must be number');
  }
};
