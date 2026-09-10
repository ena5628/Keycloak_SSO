const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();

const memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

const keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware());

app.get('/', (req, res) => {
  res.send('トップページ（未ログインでもOK）');
});

app.get('/protected', keycloak.protect(), (req, res) => {
  res.send('ログイン成功！保護されたページ');
});

app.listen(3001, () => {
  console.log('http://localhost:3001');
});