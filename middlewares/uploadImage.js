const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images')); // folder penyimpanan
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // penamaan file yang diupload
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

module.exports = upload