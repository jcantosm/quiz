// importamos definicion modelo ORM
var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res) {
    models.Quiz.findAll().success(function(quiz) {
        res.render('quizes/question', {
            pregunta: quiz[0].pregunta
        });
    });
};

// GET /quizes/answer
exports.answer = function(req, res) {
    models.Quiz.findAll().success(function(quiz) {
        // respuesta incorrecta
        var respuesta = 'Incorrecto';

        if (req.query.respuesta === quiz[0].respuesta) {
            // respuesta correcta
            respuesta = 'Correcto';
        }
        res.render('quizes/answer', {
            respuesta: respuesta
        });
    });
};
