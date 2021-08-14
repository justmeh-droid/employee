const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
require('./db/mongoose.js')
const employeeRouter = require('./routers/employee')

const app = express()

const PORT = process.env.PORT || 3001


app.use(cors())
app.options('*', cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api',employeeRouter)


app.listen(PORT|| 3000,()=>{
    console.log('Server started on '+PORT)
})