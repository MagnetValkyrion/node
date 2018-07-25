var express = require('express');
var router = express.Router();

var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
router.use(fileUpload());

//Crear variable de acceso a MySQL
//var db = require('../models/conexion.js');
var Cart = require('../models/cart.js');
//const model = require('../models/task')();

var Product = require('../models/producto');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/proyectonode', { useNewUrlParser: true });

/*var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);*/

//Login

/*router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', csrfToken: req.csrfToken });
});*/



/* GET home page. */

router.get('/', function(req, res, next) {
  Product.find(function(err, resultados) {
    if (err) throw err;
    console.log(resultados);
    res.render('index', { title: 'Inicio', documentos:resultados });

  });
});


/*router.get('/', function(req, res, next) {
  db.query("SELECT * FROM productos", function(err, resultados){
    res.render('index', { title: 'Inicio', documentos:resultados })
  });
});*/

router.get('/cart', function(req, res, next) {
  res.render('cart', { title: 'Carrito' });
});

router.get('/acercade', function(req, res, next) {
  res.render('acercade', { title: 'Acerca De' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/*router.get('/Productos', function(req, res, next) {

  db.query("SELECT * FROM productos", function(err, resultados){
    res.render('Productos', { title: 'Productos', documentos:resultados })
  });
});*/

router.get('/Productos', function(req, res, next) {
  Product.find(function(err, resultados) {
    if (err) throw err;
    console.log(resultados);
    res.render('Productos', { title: 'Productos', documentos:resultados });

  });
});

//Admin---------------------------------------------------------------------------------------------------------

/*router.get('/panelProductos', function(req, res, next) {
  //Variable a validad

  //SQL para acceder a MySQL y devolver los datos de un arreglo
  db.query("SELECT * FROM productos", function(err, resultados){
    res.render('panelProductos', { title: 'Productos', documentos:resultados })
  });

});*/

router.get('/panelProductos', function(req, res, next) {
  Product.find(function(err, resultados) {
    if (err) throw err;
    console.log(resultados);
    res.render('panelProductos', { title: 'Productos', documentos:resultados });

  });
});

/*router.get('/filtrado', function(req, res, next) {
  //Variable a validad

  //SQL para acceder a MySQL y devolver los datos de un arreglo
  db.query("SELECT * FROM productos where titulo = ?", req.body.busqueda, function(err, resultados){
    //res.render('panelProductos', { title: 'Productos', documentos:resultados )})
    console.log(req.body.busqueda)
  });

});*/



/*router.get('/DELETE/:id', function(req, res, next) {
  //Variable a validad

  //SQL para acceder a MySQL y devolver los datos de un arreglo
  db.query("DELETE FROM productos WHERE id = ?", req.params.id, function(err, resultados){
    res.redirect('/panelProductos');
  });

});*/

router.get('/DELETE/:id', function(req, res) {
  //Variable a validad

  //SQL para acceder a MySQL y devolver los datos de un arreglo
  let id = req.params.id;

  Product.remove( {_id: id }, function(err, resultados) {
    if (err) throw err;
    console.log(resultados);
    res.redirect('/panelProductos');
  });

});

/*router.post('/panelEdit/:id/:imagen/:archivo/:vendidos', function(req, res, next) {
  //Variable a validad
  var img, arch;

  if(!req.files.imagen)
  {
    img = req.params.imagen;
  }
  else
  {
    let imagenASubir = req.files.imagen;

    let archivoASubir = req.files.archivo;
    imagenASubir.mv('public/imagesProductos/' + req.files.imagen.name, function(err, resultados){
      if (err)
        return res.status(500).send(err);
    });

    img = req.files.imagen.name;
  }



  if(!req.files.archivo)
  {
    arch = req.params.archivo;
  }
  else
  {
    let archivoASubir = req.files.archivo;

    archivoASubir.mv('public/archivosProductos/' + req.files.archivo.name, function(err, resultados){
      if (err)
        return res.status(500).send(err);
    });

    arch = req.files.archivo.name;
  }


  var producto = {
    titulo:req.body.titulo,
    descripcion:req.body.descripcion,
    imagen:img,
    autor:req.body.autor,
    tecnologia:req.body.tecnologia,
    precio:req.body.precio,
    archivo:arch,
    existencia:req.body.stock,
    vendidos: req.params.vendidos
  }

  console.log(req.params.id);
  console.log(producto);
  //SQL para acceder a MySQL y devolver los datos de un arreglo
  db.query("UPDATE productos SET ? WHERE id = " + req.params.id + "", producto, function(err, resultados){
    res.redirect('/panelProductos');
  });

});*/

/*router.get('/panelEdit/:id', function(req, res, next) {
  //Variable a validad

  //SQL para acceder a MySQL y devolver los datos de un arreglo
  db.query("SELECT * FROM productos WHERE id = ?", req.params.id, function(err, resultados){
    res.render('panelEdit', { title: 'Modificar', documentos:resultados[0] });
  });

});*/


router.get('/panelVentas', function(req, res, next) {
  res.render('panelVentas', { title: 'Ventas' });
});

router.get('/panelClientes', function(req, res, next) {
  res.redirect('panelClientes', { title: 'Clientes' });
});


//CRUD--------------------------------------------------------------------

router.get('/panelCreate', function(req, res, next) {
  res.render('panelCreate', { title: 'Crear' });
});

router.get('/panelEdit', function(req, res, next) {
  res.render('panelEdit', { title: 'Editar'});
});

/*router.post('/panelCreate', function(req, res, next) {

  if(!req.files){return res.status(400).send("No hay archivo");}
  let imagenASubir = req.files.imagen;
  let archivoASubir = req.files.archivo;
  imagenASubir.mv('public/imagesProductos/' + req.files.imagen.name, function(err, resultados){
    if (err)
      return res.status(500).send(err);
  });

  archivoASubir.mv('public/archivosProductos/' + req.files.archivo.name, function(err, resultados){
    if (err)
      return res.status(500).send(err);
  });

  var producto = {
    titulo:req.body.titulo,
    descripcion:req.body.descripcion,
    imagen:req.files.imagen.name,
    autor:req.body.autor,
    tecnologia:req.body.tecnologia,
    precio:req.body.precio,
    existencia:req.body.stock,
    vendidos: 0,
    archivo:req.files.archivo.name
  }

  db.query("INSERT INTO productos SET ?", producto, function(err, resultados){


    res.redirect('/panelProductos');

  });

});*/

/*router.get('/add-to-cart/:id', function(req, res, next){
  var prodId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, producto) {
    if (err)
    {
      res.redirect('/');
    }
    cart.add(resultados[0], prodId);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });

});

router.get('/cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('cart', {productos:null});
  }
  var cart = new Cart(req.session.cart);
  res.render('/cart', { productos: cart.generateArray(), totalPrice: cart.totalPrice})
})*/

router.get('/success', function(req, res, next) {
  res.render('success', { title: 'Descarga' });
});

router.get('/Notificaciones', function(req, res, next) {
  res.render('panelNotificaciones', { title: 'Notificaciones' });
});
///////////////////////////////////////////////////////////////
//MONGO

router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('index', { title: 'Inicio', documentos: res });
  })
});

router.post('/add', (req, res) =>{
  let body = req.body;
  console.log(body);  
})

router.post('/panelCreate', function(req, res, next) {

  if(!req.files){return res.status(400).send("No hay archivo");}
  let imagenASubir = req.files.imagen;
  let archivoASubir = req.files.archivo;
  imagenASubir.mv('public/imagesProductos/' + req.files.imagen.name, function(err, resultados){
    if (err)
      return res.status(500).send(err);
  });

  archivoASubir.mv('public/archivosProductos/' + req.files.archivo.name, function(err, resultados){
    if (err)
      return res.status(500).send(err);
  });

  var producto = {
    titulo:req.body.titulo,
    descripcion:req.body.descripcion,
    imagen:req.files.imagen.name,
    autor:req.body.autor,
    tecnologia:req.body.tecnologia,
    precio:req.body.precio,
    archivo:req.files.archivo.name,
    existencia:req.body.stock,
    vendidos: 0
  }


  Product.create(producto, function(err, resultados) {
    if (err) throw err;
    console.log(resultados);
    res.redirect('/panelProductos');
  })

});

/*router.post('/panelEdit/:id/:imagen/:archivo/:vendidos', function(req, res, next) {
  //Variable a validad
  var img, arch;

  if(!req.files.imagen)
  {
    img = req.params.imagen;
  }
  else
  {
    let imagenASubir = req.files.imagen;

    let archivoASubir = req.files.archivo;
    imagenASubir.mv('public/imagesProductos/' + req.files.imagen.name, function(err, resultados){
      if (err)
        return res.status(500).send(err);
    });

    img = req.files.imagen.name;
  }



  if(!req.files.archivo)
  {
    arch = req.params.archivo;
  }
  else
  {
    let archivoASubir = req.files.archivo;

    archivoASubir.mv('public/archivosProductos/' + req.files.archivo.name, function(err, resultados){
      if (err)
        return res.status(500).send(err);
    });

    arch = req.files.archivo.name;
  }


  var producto = {
    titulo:req.body.titulo,
    descripcion:req.body.descripcion,
    imagen:img,
    autor:req.body.autor,
    tecnologia:req.body.tecnologia,
    precio:req.body.precio,
    archivo:arch,
    existencia:req.body.stock,
    vendidos: req.params.vendidos
  }

  console.log(req.params.id);
  console.log(producto);
  //SQL para acceder a MySQL y devolver los datos de un arreglo
  db.query("UPDATE productos SET ? WHERE id = " + req.params.id + "", producto, function(err, resultados){
    res.redirect('/panelProductos');
  });


  Product.remove( {_id: id }, function(err, resultados) {
    if (err) throw err;
    console.log(resultados);
    res.redirect('/panelProductos');
  });

});*/


module.exports = router;
