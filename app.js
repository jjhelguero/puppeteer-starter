const path = require('path');
const express = require('express');
const app = express();
const src = 'public'
const staticPath = path.join(__dirname, `./${src}/index.html`);
const port = 3000

app.use(express.static(src))


app.get('/', (req, res) => {
  res.sendFile(staticPath)
})

app.listen(port, function() {
  console.log(`listening to port ${port}`);
});