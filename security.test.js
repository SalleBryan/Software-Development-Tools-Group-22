const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const source = fs.readFileSync(require('node:path').join(__dirname, 'server.js'), 'utf8');
function start(env) {
  const app = { use() {}, post() {}, get() {}, delete() {}, listen() {} };
  const express = Object.assign(() => app, { json() {}, static() {} });
  const dependencies = { express, 'body-parser': { urlencoded() {} },
    mysql2: { createConnection: () => ({ connect() {} }) }, bcrypt: {}, jsonwebtoken: {},
    dotenv: { config() {} } };
  vm.runInNewContext(source, { process: { env }, Buffer, console,
    require: name => dependencies[name] });
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
