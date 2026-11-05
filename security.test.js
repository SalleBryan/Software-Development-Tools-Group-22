const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const source = fs.readFileSync(require('node:path').join(__dirname, 'server.js'), 'utf8');
function start(env) {
  const routes = {};
  const app = { use() {}, post(path, ...handlers) { routes["POST " + path] = handlers; }, get() {}, delete(path, ...handlers) { routes["DELETE " + path] = handlers; }, listen() {} };
  const express = Object.assign(() => app, { json() {}, static() {} });
  const dependencies = { express, 'body-parser': { urlencoded() {} },
    mysql2: { createConnection: () => ({ connect() {} }) }, bcrypt: {}, jsonwebtoken: {},
    dotenv: { config() {} } };
  vm.runInNewContext(source, { process: { env }, Buffer, console,
    require: name => dependencies[name] });
  return routes;
}
test('startup rejects missing or weak credentials before opening a database connection', () => {
  assert.throws(() => start({}), /JWT_SECRET/);
  assert.throws(() => start({ JWT_SECRET: 'short' }), /JWT_SECRET/);
  assert.throws(() => start({ JWT_SECRET: crypto.randomBytes(32).toString('hex') }), /DB_PASSWORD/);
});
test('fresh external credentials allow startup', () => {
  assert.doesNotThrow(() => start({ JWT_SECRET: crypto.randomBytes(32).toString('hex'),
    DB_PASSWORD: crypto.randomBytes(24).toString('hex') }));
});

test('ordinary authenticated customers cannot add or delete products', () => {
  const routes = start({ JWT_SECRET: crypto.randomBytes(32).toString('hex'),
    DB_PASSWORD: crypto.randomBytes(24).toString('hex'), ADMIN_USER_IDS: '1' });
  for (const route of ['POST /api/products', 'DELETE /api/products/:id']) {
    const authorization = routes[route][1]; let status; let next = false;
    const res = { status(value) { status = value; return this; }, json() {} };
    authorization({ user: { id: 2 } }, res, () => { next = true; });
    assert.equal(status, 403); assert.equal(next, false);
    authorization({ user: { id: 1 } }, res, () => { next = true; });
    assert.equal(next, true);
  }
});
test('malformed credentials are rejected before hashing or database access', async () => {
  const routes = start({ JWT_SECRET: crypto.randomBytes(32).toString('hex'),
    DB_PASSWORD: crypto.randomBytes(24).toString('hex') });
  for (const route of ['POST /api/signup', 'POST /api/login']) {
    let status;
    const res = { status(value) { status = value; return this; }, json() {} };
    await routes[route][0]({ body: { name: 'Test', email: {}, password: {} } }, res);
    assert.equal(status, 400);
  }
});
