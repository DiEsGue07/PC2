var express = require('express');
var app = express();

var mysql = require('mysql');
var cors = require('cors');
app.use(cors());
app.use(express.json());

const port = 9000;

/*
  Método GET que selecciona un producto determinado en funcion de su user_id
*/
app.get('/pokemons/:campo_id', function(req, res){
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'utec',
    password: '1234567890',
    database: 'pokedex'
  });
  connection.connect();
  var myQuery = " SELECT campo_id, nombre, altura, categoria, " +
                " peso, habilidad, tipo, imagen " +
                " FROM pokemon " +
                " WHERE campo_id = ? ";
  var myValues = [req.params.product_id];
  connection.query(myQuery, myValues, function(error, results, fields){
    if (error) throw error;
    res.send(results[0]);
    connection.end();
  });
});

/* 
  Método get que selecciona los productos de determinado product_type de 1 sola bodega. 
  localhost:9000/products?user_id=1&product_type=viveres 
*/
app.get('/pokemons', function(req, res){
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'utec',
    password: '1234567890',
    database: 'pokedex'
  });
  connection.connect();
  var myQuery = " SELECT campo_id, nombre, altura, categoria, " +
                " peso, habilidad, tipo, imagen " +
                " FROM pokemon " +
                " WHERE 1 = 1 ";
  var myValues = [];
  if(req.query.user_id){
    myQuery += " AND campo_id = ? ";
    myValues.push(req.query.campo_id);
  }
  if(req.query.nombre){
    myQuery += " AND UPPER(nombre) = UPPER(?) ";
    myValues.push(req.query.nombre);
  }
  console.log(myQuery, myValues);
  connection.query(myQuery, myValues, function(error, results, fields){
    if (error) throw error;
    res.send(results);
    connection.end();
  });
});


/*
  Método post que agrega productos a una determinada bodega.
  localhost:9000/products
    {
      "product_name": "Cepillo Dental",
      "product_trademark": "Colgate",
      "product_price": 3.5,
      "product_type": "aseo y limpieza",
      "product_stock": 5
      "user_id": 1
    }
*/
app.post('/pokemons', function(req, res){
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'utec',
    password: '1234567890',
    database: 'pokedex'
  });
  connection.connect();
  var myQuery = " INSERT INTO pokemon (nombre, altura, categoria, " +
                " peso, habilidad, campo_id, tipo, imagen) " +
                " VALUES (?, ?, ?, ?, ?, ?, ?, ?); ";
  var myValues = [req.body.nombre, req.body.altura,
      req.body.categoria, req.body.peso, req.body.habilidad, req.body.campo_id];

  connection.query(myQuery, myValues, function(error, results, fields){
    if (error) throw error;
    res.send(results);
    connection.end();
  });
});

/*
  Metodo que agrega productos a la tabla cart.
  localhost:9000/cart
    {   
      "product_name": "Cepillin",
      "product_trademark": "Colgate",
      "product_price": 1.5,
      "product_type": "aseo y limpieza",
      "user_id": 1
    }
*/

/*
  Método que borra un producto de determinado usuario en funcion del product_id.
  localhost:9000/products/2/52 
*/
app.delete('/pokemons/:campo_id', function(req, res){
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'utec',
    password: '1234567890',
    database: 'pokedex'
  });
  connection.connect();
  var myQuery = " DELETE FROM pokemon " +
                " WHERE campo_id = ?; ";
  var myValues = [ req.params.product_id];
  connection.query(myQuery, myValues, function(error, results, fields){
    if (error) throw error;
    res.send(results);
    connection.end();
  });
});

/* 
  Método que borra un producto de determinado usuario en funcion del product_id en la tabla cart.
  localhost:9000/productsCart/1/1
*/
app.delete('/pokemons/:campo_id', function(req, res){
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'utec',
    password: '1234567890',
    database: 'pokedex'
  });
  connection.connect();
  var myQuery = " DELETE FROM cart " +
                " WHERE campo_id = ?; ";
  var myValues = [ req.params.campo_id];
  connection.query(myQuery, myValues, function(error, results, fields){
    if (error) throw error;
    res.send(results);
    connection.end();
  });
});

/*
  Metodo que modifica un producto en funcion de su product_id
  localhost:9000/products/51
    {
      "product_name": "Gaaa Dental",
      "product_trademark": "Colgate",
      "product_price": 3.5,
      "product_type": "aseo y limpieza",
      "product_stock": 5
    }
*/
app.put('/pokemons/edit/:campo_id', function(req, res){
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'utec',
    password: '1234567890',
    database: 'pokedex'
  });
  connection.connect();
  var myQuery = " UPDATE pokemon";
  var myValues = [ ];
  if (req.body.nombre){
    myQuery += " , nombre = ? ";
    myValues.push(req.body.nombre);
  }
  if (req.body.altura){
    myQuery += " , altura = ? ";
    myValues.push(req.body.altura);
  }
  if (req.body.categoria){
    myQuery += " , categoria = ? ";
    myValues.push(req.body.categoria);
  }
  if (req.body.peso){
    myQuery += " , peso = ? ";
    myValues.push(req.body.peso);
  }
  if (req.body.habilidad){
    myQuery += " , habilidad = ? ";
    myValues.push(req.body.habilidad);
  }
  if (req.body.tipo){
    myQuery += " , tipo = ? ";
    myValues.push(req.body.tipo);
  }
  if (req.body.imagen){
    myQuery += " , imagen = ? ";
    myValues.push(req.body.imagen);
  }
  myQuery += " WHERE user_id = ? "
  myValues.push(req.params.user_id);
  connection.query(myQuery, myValues, function(error, results, fields){
    if (error) throw error;
    res.send(results);
    connection.end();
  });
});

app.put('/pokemons/new', function(req, res){
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'utec',
    password: '1234567890',
    database: 'pokedex'
  });
  connection.connect();
  var myQuery = " UPDATE pokemon";
  var myValues = [ ];
  if (req.body.nombre){
    myQuery += " , nombre = ? ";
    myValues.push(req.body.nombre);
  }
  if (req.body.altura){
    myQuery += " , altura = ? ";
    myValues.push(req.body.altura);
  }
  if (req.body.categoria){
    myQuery += " , categoria = ? ";
    myValues.push(req.body.categoria);
  }
  if (req.body.peso){
    myQuery += " , peso = ? ";
    myValues.push(req.body.peso);
  }
  if (req.body.habilidad){
    myQuery += " , habilidad = ? ";
    myValues.push(req.body.habilidad);
  }
  if (req.body.tipo){
    myQuery += " , tipo = ? ";
    myValues.push(req.body.tipo);
  }
  if (req.body.imagen){
    myQuery += " , imagen = ? ";
    myValues.push(req.body.imagen);
  }
  myQuery += " WHERE user_id = ? "
  myValues.push(req.params.user_id);
  connection.query(myQuery, myValues, function(error, results, fields){
    if (error) throw error;
    res.send(results);
    connection.end();
  });
});

/* 
  Metodo que registra un usuario
  localhost:9000/users
    {   
      "username": "GatoCubas",
      "password": "GiselaTeOdio"
    }
*/
