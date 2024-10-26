
const jwt = require('jsonwebtoken');
let usuarios = require('./usuarios');

function verificarJWT(requisicao, resposta, next) {
    const token = requisicao.headers['authorization'];
    if (!token){
        return resposta.status(401).send({mensagem: "Token de autenticação não informado."});
    }

    jwt.verify(token, "ISSOEUMSEGREDO", function (erro, decodificado){
       if(erro) {
           return resposta.status(500).send({mensagem: "Token de autenticação não é valido."});
       }
       requisicao.idUsuario = decodificado.id;
       next();
    });
}

function verificarPermissao(requisicao, resposta, next) {
    const idUsuario = requisicao.idUsuario;
    usuarios.findOne({ where: {id: idUsuario, tipo_usuario: "administrador" }}).then(resultado => {
        if(resultado !== null)
        {
            next();
        }
        else{
            resposta.status(401).send({
                message: "Usuário não autorizado para essa operação.",
            });
        }
    }).catch(() => {
            resposta.status(401).send({
                message: "Usuário não autorizado para essa operação.",
            }); })
}

module.exports = {
    verificarJWT,
    verificarPermissao
};