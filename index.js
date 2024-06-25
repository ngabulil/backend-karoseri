const express = require('express')
const app = express()
const routes = require('./routes')
const db = require('./config/database')
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/", routes)


db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

db.sync()
app.listen(5000, () => console.log('listening on port 5000'))