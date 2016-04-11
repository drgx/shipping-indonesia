'use strict';
const config = require('config');
const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const qs = require('querystring');
const shipCache = new NodeCache({ stdTTL: 100, checkperiod: 120, errorOnMissing: true });
const headers = {
  key: null
};
exports.getAPIResult = (apiPath, method, headers, result) => {
  const hostName = `${config.get('APIHostName')}${apiPath}`;
  const options = {
    method,
    headers
  };

  let apiObject;
  switch (apiPath) {
    case config.get('APIUrl.province'): apiObject = 'province'; break;
    case config.get('APIUrl.city'): apiObject = 'city'; break;
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
    shipCache.get(apiObject, (err, val) => console.log(val));
    result(json.rajaongkir.results);
  });
};
exports.init = key => {
  headers.key = key;
};
exports.getAllProvince = result => {
  this.getAPIResult(config.get('APIUrl.province'), 'GET', headers, result);
};

exports.getProvinceById = (provinceId, result) => {
  if (provinceId && Number.isInteger(provinceId)) {
    this.getAPIResult(`${config.get('APIUrl.province')}?id=${provinceId}`, 'GET', result);
  } else {
    console.error('provinceId must be filled and integer');
  }
};

exports.getCityById = (cityId, result) => {
  if (cityId && Number.isInteger(cityId)) {
    this.getAPIResult(`${config.get('APIUrl.city')}?id=${cityId}`, 'GET', headers, result);
  } else {
    console.error('cityId must be filled and integer');
  }
};

exports.getAllcity = result => {
  this.getAPIResult(config.get('APIUrl.city'), 'GET', headers, result);
};

exports.getShippingCost = (origin, destination, weight, courier, result) => {
  const costHeaders = Object.assign(headers, { 'content-type': 'application/x-www-form-urlencoded' });
  const apiPath = config.get('APIUrl.cost');
  const hostName = `${config.get('APIHostName')}${apiPath}`;
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
    result(json.rajaongkir.results);
  });
};
