const mongoose = require('mongoose')

//conectar mongo
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/appGalletas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(db=>console.log('DB connected'))
    .catch(e=>console.log(e))