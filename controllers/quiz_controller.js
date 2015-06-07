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
            quizes: quizes,
            errors: []
        });
    });
};

// GET /quizes/:id
exports.show = function(req, res) {
    res.render('quizes/show', {
        quiz: req.quiz,
        errors: []
    });
};

// GET /quizes/new
exports.new = function(req, res) {
    var quiz = models.Quiz.build({
        'pregunta': '',
        'respuesta': ''
    });
    res.render('quizes/new', {
        quiz: quiz,
        errors: []
    });
};

// GET /quizes/create
exports.create = function(req, res) {
    var quiz = models.Quiz.build(req.body.quiz);

    console.log('PREGUNTA  := \'' + quiz.pregunta + '\'\n');
    console.log('RESPUESTA := \'' + quiz.respuesta + '\'\n');
    
    quiz.validate().then(function(error) {
        if (error) {
            res.render('quizes/new', {
                quiz: quiz,
                errors: error.errors
            });
        }
        else {
            quiz.save({
                fields: ['pregunta', 'respuesta']
            }).then(function() {
                res.redirect('/quizes');
            });
        }
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
        respuesta: resultado,
        errors: []
    });

};
