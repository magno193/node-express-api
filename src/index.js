const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Server started at http://localhost:3000'));
