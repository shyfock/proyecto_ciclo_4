const Usuario = require("../models/usuarios.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
let response = {
    msg: "",
    exito: false,
}

exports.login = function(req, res, next){
    let hashedpass = crypto.createHash("sha512").update(req.body.pass).digest("hex");
    Usuario.findOne({ usuario: req.body.usuario, pass: hashedpass}, function(err, usuario){
        let response = {
            token: null,
        }
        if(usuario !== null){
            response.token = jwt.sign({
                id: usuario._id,
                usuario: usuario.usuario
            }, "__recret__");
        }
        res.json(response);
        //console.log(response)
    });
}

exports.register = function(req, res){
    let hashedpass = crypto.createHash("sha512").update(req.body.pass).digest("hex");
    let usuario = new Usuario({
        usuario: req.body.usuario,
        pass: hashedpass,
    })
    usuario.save(function(err){
        if (err) {
            console.log = false,
            response.exito = false,
            response.msg = "Error al crear el usuario"
            res.json(response)
            return;
        } 
        response.exito = true,
        response.msg = "El usuario se creó correctamente"
        res.json(response)
    })
}