var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* GET de preguntas */
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

/* GET de autores del proyecto */
router.get('/author', function(req, res) {
  res.render('quizes/author', { author: 'Javier Cantos' });
});

module.exports = router;
