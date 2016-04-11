'use strict';
const index = require('./index');
index.init('b06f682018ccadef06d7260481971b02');

// index.getAllProvince(result => {
//   console.log(result);
// });

// index.getCityById(39, result => {
//   console.log(result);
// });

index.getShippingCost('501', '114', 1000, 'jne', res => {
  console.log(res);
});
