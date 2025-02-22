const express = require('express')
const path = require('path');
const app = express()
const port = 7000
const staticPath = path.join(__dirname, 'frontend/html/landing_page/');

const multer = require('multer');
const cors = require("cors");
app.use(express.static(staticPath));
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'frontend/images')
    },
    filename: (req, file, cb) => {
        // Preserve the original file extension
        cb(null,file.originalname);
    }
})
const upload = multer({storage: storage})
app.use(cors());
//app.use('/', express.static(__dirname + '/home'));
app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});
app.post("/upload",upload.single("image"),(req,res)=>{
  res.status(200).json({
      message :"Image uploaded"
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})