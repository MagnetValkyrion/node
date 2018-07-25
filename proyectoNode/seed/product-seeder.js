var Product = require('../models/producto');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/proyectonode', { useNewUrlParser: true });

var products = [
    new Product({
        titulo: 'Yoshiko',
        descripcion: 'Excelente m3m3',
        imagen: 'yoshiko.png',
        autor: 'Ronaldo',
        tecnologia: 'Multimedia',
        precio: 100,
        archivo: 'Layouts.pdf',
        existencia: 5,
        vendidos: 0
    }),
    new Product({
        titulo: 'Kanan',
        descripcion: 'Excelente m3m3 2',
        imagen: 'kanan.png',
        autor: 'Ronaldo',
        tecnologia: 'Multimedia',
        precio: 200,
        archivo: 'Layouts.pdf',
        existencia: 5,
        vendidos: 0
    })
];


var done = 0;
for (var i = 0; i < products.length; i++){
    products[i].save(function(err, result){
        done++;
        if (done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
