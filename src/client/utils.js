const express = require("express");
const ejs = require('ejs');
const app = express();
const path = require('path');
const port = 3000
const { mcIP } = require("../../config.json");
const { getMcServer } = require("../MinecraftAPI");
async function clientLogin() {
  const mcserver = await getMcServer(`${mcIP}`);
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'ejs');
  app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index', {
    favicon: mcserver.favicon,
    banner: mcserver.banner
  });
});
app.get('/api/serverInfo', async (req, res) => {
  const mcserver = await getMcServer(`${mcIP}`);
  res.json({ 
      online: mcserver ? "Sunucu Şuanda Aktif" : "Sunucu Şuanda Aktif Değil",
      players: `${mcserver.nowPlayers}/${mcserver.maxPlayers}`,
      connect: mcserver.connect.split(":")[0],
      ping: mcserver.ping,
      name: mcserver.name,
      favicon: mcserver.favicon,
      banner: mcserver.banner
  });
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
}

module.exports = { clientLogin };
