const chai = require('chai');
const request = require('supertest');
const Heysoo = require('../lib');

const { expect } = chai;

const app = new Heysoo();

const supportedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'COPY', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND'];

// define routes
supportedMethods.forEach(method => {
  app.router[method.toLocaleLowerCase()]('/', function() {
    this.ctx.send(method);
  });
});
app.router.get(/ab?cd/, function() {
  this.ctx.done();
});
app.router.group({
  prefix: '/user'
}, router => {
  router.get('/name', function() {
    this.ctx.send('heysoo');
  });
  router.get('/age', function() {
    this.ctx.send(21);
  });
});
app.router.get('/params/:name', function() {
  this.ctx.send(this.ctx.params.name);
});
app.router.get('/redirect/b', function() {
  this.ctx.done();
});
app.router.redirect('/redirect/a', '/redirect/b');


/* global describe, it, run */
describe('Router Test', () => {
  let agent;

  before(function (done) {
    // start app and test cases
    app.start().then(server => {
      agent = request(server);
      done();
    });
  });

  it('app instance of Heysoo', () => {
    expect(app instanceof Heysoo).to.be.true;
  });

  describe('test methods', () => {
    supportedMethods.forEach(method => {
      it(`test ${method}`, (done) => {
        agent[method.toLocaleLowerCase()]('/')
          .expect(200)
          .expect(method, done);
      });
    });
  });

  // test regx
  describe('test regx', () => {
    it('/ab?cd => /acd', (done) => {
      agent
        .get('/acd')
        .expect(200, done);
    });
  });

  // test params
  describe('test params', () => {
    it('/params:name', (done) => {
      agent
        .get('/params/hisheng')
        .expect(200)
        .expect('hisheng', done);
    });
  });

  // test redirect
  describe('test redirect', () => {
    it('/redirect/a => /redirect/b', (done) => {
      agent
        .get('/redirect/a')
        .expect(302, done);
    });
  });

  // test groups
  describe('test groups', () => {
    it('/user/name', (done) => {
      agent
        .get('/user/name')
        .expect(200)
        .expect('heysoo', done);
    });
    it('/user/age', (done) => {
      agent
        .get('/user/age')
        .expect(200)
        .expect('21', done);
    });
  });
});