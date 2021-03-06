// importamos modulos express
var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
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

// importamos definicion tabla Comment
var Comment = sequelize.import(path.join(__dirname, 'comment'));

// relación 1-To-N
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// exportamos tablas del modelo
exports.Quiz = Quiz;
exports.Comment = Comment;

// inicializa tabla preguntas BBDD
sequelize.sync({force: true}).then(function() {
    Quiz.count().then(function(count) {
        if (count === 0) { // la tabla se inicializa solo si está vacía
            Quiz.create({
                pregunta: 'Capital de Francia',
                respuesta: 'París'
            });
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