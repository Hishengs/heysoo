const crypto = require('crypto');

const CONNECT_SYMBOL = '_';
let csrf;

function tokenize (secret, salt) {
  const sha1 = crypto.createHash('sha1');
  sha1.update(salt + secret);
  return sha1.digest('hex');
}

function isTokenValid (secret, token) {
  const [salt, crypted] = token.split(CONNECT_SYMBOL);
  return tokenize(secret, salt) === crypted;
}

function genToken (secret) {
  const salt = Math.random().toString(36).slice(2, 8);
  return salt + CONNECT_SYMBOL + tokenize(secret, salt);
}

/**
csrf defend
base on https://github.com/pillarjs/understanding-csrf
@since 0.0.8
*/
module.exports.init = appIns => {
  const app = appIns;
  const { config } = app;

  const csrfSecret = config.csrf && config.csrf.enabled && config.csrf.secret;
  app._csrfSecret = app.context._csrfSecret = csrfSecret || `${new Date().getTime()}-${Math.random().toString().split('.')[1]}`;

  Object.defineProperty(app.context, 'csrf', {
    get: () => {
      if (!csrf) {
        csrf = genToken(app._csrfSecret);
      }
      return csrf;
    },
    /* configurable: false,
    writable: false, */
  });

  app.use((ctx, next) => {
    if (config.csrf.disabledMethods.includes(ctx.method)) {
      return next();
    }
    // if csrf enabled
    if (ctx.config.csrf && ctx.config.csrf.enabled) {
      const csrfToken = (ctx.request.body && ctx.request.body._csrf)
        || (ctx.query && ctx.query._csrf)
        || ctx.get('csrf-token')
        || ctx.get('xsrf-token')
        || ctx.get('x-csrf-token')
        || ctx.get('x-xsrf-token');

      if (!csrfToken) ctx.throw(403, 'no csrf token found');

      if (typeof csrfToken !== 'string') ctx.throw(403, 'csrf token must be a string');

      if (!isTokenValid(ctx._csrfSecret, csrfToken)) ctx.throw(403, 'invalid csrf token');

      return next();
    } else return next();
  });
};