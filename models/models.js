// importamos modulos express
var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
// var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var url = "postgres://postgres:_nodeJS2015_@127.0.0.1:5432/quiz".match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// inicializamos ORM
var Sequelize = require('sequelize');

// SQLite
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

// importamos definicion tabla Quiz
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;

// inicializa tabla preguntas BBDD
sequelize.sync().then(function() {
    Quiz.count().then(function(count) {
        if (count === 0) { // la tabla se inicializa solo si está vacía
            Quiz.create({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma'
            });
            Quiz.create({
                pregunta: 'Capital de Portugal',
                respuesta: 'Lisboa'
            }).then(function() {
                console.log('Base de datos (tabla user) inicializada');
            });
        };
    });
});