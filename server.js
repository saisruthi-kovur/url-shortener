// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');
// const shortid = require('shortid');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const storageFilePath = path.join(__dirname, 'urls.json');

// // Helper functions to read and write data
// const readData = () => {
//   if (!fs.existsSync(storageFilePath)) {
//     fs.writeFileSync(storageFilePath, JSON.stringify([]));
//   }
//   const data = fs.readFileSync(storageFilePath);
//   return JSON.parse(data);
// };

// const writeData = (data) => {
//   fs.writeFileSync(storageFilePath, JSON.stringify(data, null, 2));
// };

// // Routes
// app.get('/', (req, res) => {
//   res.send('Welcome to the URL Shortener Service');
// });

// app.post('/shorten', (req, res) => {
//   console.log('POST /shorten:', req.body);
//   const { longUrl, customAlias } = req.body;
//   const urls = readData();
//   const urlCode = customAlias || shortid.generate();

//   if (urls.some(url => url.urlCode === urlCode)) {
//     console.log('Alias already in use');
//     return res.status(400).json('Alias already in use');
//   }

//   const shortUrl = `${req.protocol}://${req.get('host')}/${urlCode}`;
//   const newUrl = {
//     longUrl,
//     shortUrl,
//     urlCode,
//     clicks: 0,
//   };

//   urls.push(newUrl);
//   writeData(urls);

//   console.log('Shortened URL:', newUrl);
//   res.json(newUrl);
// });

// app.get('/:code', (req, res) => {
//   console.log('GET /:', req.params.code);
//   const urls = readData();
//   const url = urls.find(u => u.urlCode === req.params.code);

//   if (url) {
//     url.clicks++;
//     writeData(urls);
//     return res.redirect(url.longUrl);
//   } else {
//     console.log('No URL found for code:', req.params.code);
//     return res.status(404).json('No URL found');
//   }
// });

// app.get('/stats/:code', (req, res) => {
//   console.log('GET /stats:', req.params.code);
//   const urls = readData();
//   const url = urls.find(u => u.urlCode === req.params.code);

//   if (url) {
//     console.log('URL stats:', url);
//     return res.json(url);
//   } else {
//     console.log('No URL found for stats code:', req.params.code);
//     return res.status(404).json('No URL found');
//   }
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const storageFilePath = path.join(__dirname, 'urls.json');

// Helper functions to read and write data
const readData = () => {
  if (!fs.existsSync(storageFilePath)) {
    fs.writeFileSync(storageFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(storageFilePath);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(storageFilePath, JSON.stringify(data, null, 2));
};

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the URL Shortener Service');
});

app.post('/shorten', (req, res) => {
  console.log('POST /shorten:', req.body);
  const { longUrl, customAlias } = req.body;
  const urls = readData();
  const urlCode = customAlias || shortid.generate();

  if (urls.some(url => url.urlCode === urlCode)) {
    console.log('Alias already in use');
    return res.status(400).json('Alias already in use');
  }

  const shortUrl = `${req.protocol}://${req.get('host')}/${urlCode}`;
  const newUrl = {
    longUrl,
    shortUrl,
    urlCode,
    clicks: 0,
    clickDates: []
  };

  urls.push(newUrl);
  writeData(urls);

  console.log('Shortened URL:', newUrl);
  res.json(newUrl);
});

app.get('/:code', (req, res) => {
  console.log('GET /:', req.params.code);
  const urls = readData();
  const url = urls.find(u => u.urlCode === req.params.code);

  if (url) {
    url.clicks++;
    const now = new Date();
    url.clickDates.push(now.toISOString().split('T')[0]); // YYYY-MM-DD format
    writeData(urls);
    console.log('Updated URL:', url);
    return res.redirect(url.longUrl);
  } else {
    console.log('No URL found for code:', req.params.code);
    return res.status(404).json('No URL found');
  }
});

app.get('/stats/:code', (req, res) => {
  console.log('GET /stats:', req.params.code);
  const urls = readData();
  const url = urls.find(u => u.urlCode === req.params.code);

  if (url) {
    console.log('URL stats:', url);
    return res.json(url);
  } else {
    console.log('No URL found for stats code:', req.params.code);
    return res.status(404).json('No URL found');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
