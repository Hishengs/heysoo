const chai = require('chai');
const request = require('supertest');
const Heysoo = require('../lib');

const { expect } = chai;

const app = new Heysoo();

/* global describe, it, run */
describe('Static Test', () => {
  let agent;

  before((done) => {
    // start app and test cases
    app.start().then(server => {
      agent = request(server);
      done();
    });
  });

  it('app instance of Heysoo', () => {
    expect(app instanceof Heysoo).to.be.true;
  });
});