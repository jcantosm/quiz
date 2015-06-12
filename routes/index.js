var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Quiz',
    errors: []
  });
});

// Autoload
router.param('quizId',  quizController.load);

/* GET de preguntas */
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  quizController.new);
router.post('/quizes/create',              quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   quizController.edit);
router.put('/quizes/:quizId(\\d+)',        quizController.update);
router.delete('/quizes/:quizId(\\d+)',     quizController.destroy);

/* GET de autores del proyecto */
router.get('/author', function(req, res) {
  res.render('quizes/author', { author: 'Javier Cantos', errors: [] });
});

module.exports = router;
