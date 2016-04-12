const shipping = require('../index');
const should = require('chai').should();
shipping.init(process.env.KEY);
describe('Shipping Indonesia', function() {
  it('check api response', function(done) {
    this.timeout(10000);
    shipping.getCityById(39, function (result) {
      console.log(result);
      should.exist(result);
      done();
    });
  });
});
