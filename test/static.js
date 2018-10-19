const chai = require('chai');
const request = require('supertest');
const Heysoo = require('../lib');

const { expect } = chai;

const app = new Heysoo();

// start app and test cases
app.start().then(server => {
  setTimeout(() => {
    runCases(server);
  }, 200);
});

function runCases (server) {
  const agent = request(server);

  /* global describe, it, run */
  describe('Static Test', () => {

    it('app instance of Heysoo', () => {
      expect(app instanceof Heysoo).to.be.true;
    });

    // test regx
    describe('test regx', () => {
      it('/ab?cd => /acd', (done) => {
        agent
          .get('/acd')
          .expect(200, done);
      });
    });

  });

  run();
}