require('dotenv').config()
const mongoose = require('mongoose')


console.log('connecting to', process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false
}).then(()=>{
    console.log('DB Connected')
})
