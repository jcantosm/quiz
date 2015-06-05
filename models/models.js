// importamos modulos express
var path = require('path');

// inicializamos ORM
var Sequelize = require('sequelize');

// SQLite
var sequelize = new Sequelize('', '', '', {dialect: 'sqlite', storage: 'quiz.sqlite'});

// importamos definicion tabla Quiz
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;

// inicializa tabla preguntas BBDD
sequelize.sync().success(function() {
    Quiz.count().success(function(count) {
        if (count === 0) { // la tabla se inicializa solo si está vacía
            Quiz.create({
                pregunta: 'Capital de Italia',
                respuesta: 'Roma'
            }).success(function() {
                console.log('Base de datos (tabla user) inicializada');
            });
        };
    });
});