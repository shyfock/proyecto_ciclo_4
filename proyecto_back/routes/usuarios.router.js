const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', usuariosController.register);
router.post('/login', usuariosController.login);
module.exports = router;
