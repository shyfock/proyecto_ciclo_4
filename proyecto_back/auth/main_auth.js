const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "__recret__");
        //res.json(response);
        req.usuario = decoded;
        next();
    } catch (error) {
        console.log(req.headers)
        res.status(401);
        res.json({code: 4, msg: "no tiene permisos para acceder"/* , msg2: `${JSON.stringify(req.headers)}` */});
    }
}

module.exports = auth;