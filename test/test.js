const shipping = require('../index');
shipping.init(process.env.KEY);
describe('Shipping Indonesia', function() {
  it('check api response', function(done) {
    this.timeout(10000);
    shipping.getCityById(39, function (result) {
      done();
    });
  });
});
