// importamos definicion modelo ORM
var models = require('../models/models.js');

// GET /quizes
exports.load = function(req, res, next, quizId) {
    models.Quiz.find(quizId).then(function(quiz) {
        if (quiz) {
            req.quiz = quiz;
            next();
        } else {
            next(new Error('No existe quizId = ', quizId));
        }
    });
};

// GET /quizes
exports.index = function(req, res) {
    models.Quiz.findAll().then(function(quizes) {
        res.render('quizes/index', {
            quizes: quizes
        });
    });
};

// GET /quizes/:id
exports.show = function(req, res) {
    res.render('quizes/show', {
        quiz: req.quiz
    });
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
    // respuesta incorrecta
    var resultado = 'Incorrecto';

    if (req.query.respuesta === req.quiz.respuesta) {
        // respuesta correcta
        resultado = 'Correcto';
    }
    res.render('quizes/answer', {
        quiz: req.quiz,
        respuesta: resultado
    });

};
