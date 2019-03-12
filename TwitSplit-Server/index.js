const express = require('express');
var cors = require('cors');

const app = express();
const port = 3001;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', (req, res) => {
  return res.send(true)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));