// server.cjs
const jsonServer = require('json-server');
const { data } = require('./data.js'); // on importe les données compilées

const server = jsonServer.create();
const router = jsonServer.router(data); // pas de fichier, data en mémoire
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware : forcer un id numérique auto-incrémenté
server.post('/pollutions', (req, res, next) => {
    const pollutions = router.db.get('pollutions').value();
    const last = pollutions.length ? Math.max(...pollutions.map(p => Number(p.id) || 0)) : 0;
    req.body.id = last + 1;
    next();
});

server.use(router);

// Render impose un port fourni par process.env.PORT
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`✅ JSON Server running on port ${port}`);
});
