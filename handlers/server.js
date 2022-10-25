const setting = require(`${process.cwd()}/json/settings.json`)
module.exports = async (client) => {
  if (setting.express) {
    const express = require('express');
    const app = express();
    const port = 8080;
    app.all('/', (req, res) => {
      res.send(`Express Activated for BoltWays DC BOT.`);
      res.end();
    });
    app.listen(port, () => client.logger(`Bot running on http://localhost:${port}`));
  }
}