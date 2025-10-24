// server.js
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware pour forcer un id numérique auto-incrémenté
server.post('/pollutions', (req, res, next) => {
    const pollutions = router.db.get('pollutions').value();
    const last = pollutions.length ? Math.max(...pollutions.map(p => Number(p.id) || 0)) : 0;
    req.body.id = last + 1;
    next();
});

server.use(router);
server.listen(3000, () => {
    console.log('✅ JSON Server running on http://localhost:3000');
});
