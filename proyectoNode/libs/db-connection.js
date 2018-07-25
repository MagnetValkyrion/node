const mongoose = require('mongoose');

let db;

module.exports = function Connection(){
    if (!db) {
        db = mongoose.connect('mongodb://localhost:27017/proyectonode', { useNewUrlParser: true });
    }

    return db;
}