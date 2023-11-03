const http = require('http');
const handles = require('./handles'); // Importation des gestionnaires depuis le fichier handles.js

// Création du serveur en utilisant la fonction serverHandle du module handles
http.createServer(handles.serverHandle).listen(8080, () => {
  console.log('Server running on port 8080');
});
