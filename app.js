const fs = require('fs');
const express = require('express')
const multer = require('multer');
const path = require('path');
const { log } = require('console');


const app = express();
app.use(express.json())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`)
  }
})

const upload = multer({ storage: storage })


app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  return res.send('<form action="/upload" method="post" enctype="multipart/form-data"><input type="file" name="Textfile"> <button type="submit">Upload</button></form>')
})

app.post('/upload', upload.single('Textfile'), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect('/')
})

app.post('/merge', (req, res) => {
  console.log(req.body,"REQUEST");
  const file1 = req.body.file1;
  const file2 = req.body.file2
  if (!file1 && file2) res.status(400).send("Send names ")



  fs.readFile(`uploads/${file1}`, 'utf-8', function (err, data1) {

    fs.readFile(`uploads/${file2}`, 'utf-8', function (err, data2) {
      let mergedFile = `NEW_FILE${Date.now()}`
      console.log(mergedFile,`${data1} ${data2}`);
      fs.writeFile(`backups/${mergedFile}`, `${data1} ${data2}`, function (err) {
        if (err) throw err;
        console.log('Successfull')
        res.send(`${mergedFile} created merged file `)
      })
    })
  })
})

app.listen(3000, () => {
  console.log('server connected ')
}) 