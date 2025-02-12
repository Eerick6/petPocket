const express = require('express');
const path = require('path');
const app = express();

// Sirve los archivos estáticos de la carpeta build
app.use(express.static(path.join(__dirname, 'build')));

// Cualquier otra ruta será dirigida al archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Escucha en el puerto proporcionado por Railway
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
