
var mongoose = require('mongoose')

module.exports.connect = () => {
    const db_url = 'mongodb+srv://' + process.env.MONGO_DB_USER + ':' + process.env.MONGO_DB_PASS + '@cluster0.xbnnw.mongodb.net/' + process.env.MONGO_DB_DATABASE + '?retryWrites=true&w=majority';
    try {
        mongoose.connect(db_url, {useNewUrlParser: true,  useUnifiedTopology: true}, (error) => {
            console.log(error)
        });
    } catch (error) {
        console.log(error)
    }
}