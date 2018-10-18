const chai = require('chai');
// const request = require('supertest');
const Heysoo = require('../lib');

const { expect } = chai;

/* app.router.get('/', () => {
  this.ctx.send('hello world');
});

const ins = app.start().then(() => {
  describe('GET /', function() {
    it('respond with "hello world"', function(done) {
      request(ins)
        .get('/')
        .expect(200)
        .end(done);
    });
  });
}); */

describe('Router Test', () => {
  it('setup', (done) => {
    const app = new Heysoo();
    app.start(() => {
      expect(app instanceof Heysoo).equal(true);
      done();
    });
  });
});
