// importamos definicion modelo ORM
var models = require('../models/models.js');

// GET /quizes
exports.load = function(req, res, next, quizId) {
    models.Quiz.find({
        where: {id: Number(quizId)},
        include: [{model : models.Comment}]
    }).then(function(quiz) {
        if (quiz) {
            req.quiz = quiz;
            next();
        }
        else {
            next(new Error('No existe quizId = ', quizId));
        }
    });
};

// GET /quizes
exports.index = function(req, res) {
    var search = '';
    search = (req.query.search !== undefined ? req.query.search : '');
    search = search.replace(/\s/g, '%');
    search = search.toUpperCase();
    
    models.Quiz.findAll({
        where: ["upper(pregunta) like ?", '%' + search + '%']
    }).then(function(quizes) {
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
    quiz.validate().then(function(error) {
        if (error) {
            res.render('quizes/new', {
                quiz: quiz,
                errors: error.errors
            });
        }
        else {
            quiz.save({
                fields: ['pregunta', 'respuesta', 'tema']
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

// GET /quizes/:id/edit
exports.edit = function(req, res) {
    res.render('quizes/edit', {
        quiz: req.quiz,
        errors: []
    });

};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
    req.quiz.destroy().then(function() {
        res.redirect('/quizes');
    }).catch(function(error) {next(error)});
};

// PUT /quizes/:id
exports.update = function(req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.tema = req.body.quiz.tema;
    req.quiz.validate().then(function(error) {
        if (error) {
            res.render('quizes/edit', {
                quiz: req.quiz,
                errors: error.errors
            });
        }
        else {
            req.quiz.save({
                fields: ['pregunta', 'respuesta', 'tema']
            }).then(function() {
                res.redirect('/quizes');
            });
        }
    });
};
