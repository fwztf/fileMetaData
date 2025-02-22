require('dotenv').config()
var express = require('express');
var cors = require('cors');
const multer = require('multer');
const uploads = multer({ dest: 'uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// write endpoint to upload file 
app.post("/api/fileanalyse", uploads.single("upfile"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.json({
      error: "no file uploaded"
    })
  } else {
    res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    })
  }
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
