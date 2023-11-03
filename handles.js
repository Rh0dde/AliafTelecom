const url = require('url');
const qs = require('querystring');
const fs = require('fs');
const path = require('path');

function readAboutContent(callback) {
  const filePath = path.join(__dirname, 'content', 'about.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err, null);
    }
    
    try {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (parseErr) {
      callback(parseErr, null);
    }
  });
}

module.exports.serverHandle = function (req, res) {
  const route = url.parse(req.url);
  const path = route.pathname;
  const params = qs.parse(route.query);

  // Gérer le chemin '/hello'
  if (path === '/hello' && 'name' in params) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello ' + params['name']);
    res.end();
  } 
  // Gérer le chemin '/about'
  else if (path === '/about') {
    readAboutContent((err, aboutContent) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error reading about content');
        return;
      }

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(aboutContent));
    });
  } 
  // Gérer les autres chemins
  else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Hello anonymous');
  }
};
