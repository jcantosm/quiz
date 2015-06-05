var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* GET de pregunta */
router.get('/quizes/question', quizController.question);

/* GET de respuesta */
router.get('/quizes/answer', quizController.answer);

/* GET de autores del proyecto */
router.get('/author', function(req, res) {
  res.render('quizes/author', { author: 'Javier Cantos' });
});

module.exports = router;
