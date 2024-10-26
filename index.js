const express = require('express');
const jwt = require('jsonwebtoken');
let usuarios = require('./usuarios');
let autenticador = require('./auth');

const app = express ();
app.use(express.json());
const porta = process.env.PORT || 8800;

app.get('/', (requisicao, resposta) => {
  return resposta.status(200).send({
    message: "Bem vindo a API do Di !",
  });
});

app.post('/login', (requisicao, resposta, next) => {
    let email = requisicao.body.email;
    let senha = requisicao.body.senha;

    usuarios.findOne({
        where: { email: email, senha: senha }
    }).then(resultado => {
        if(resultado !== null)
        {
            const id = resultado.id;
            const segredo = process.env.SEGREDO_JWT || "ISSOEUMSEGREDO";
            const token = jwt.sign({id}, segredo, {
                expiresIn: 300
            });
            // Não alterar a mensagem de login, pois o token é importante.
            return resposta.status(200).send({'ID': id, 'token': token})
        }
        else
        {
            return resposta.status(500).send({ message: 'Usuário ou senhas incorretos'});
        }
    }).catch(erro => {
        console.log(erro);
    })
});

app.get('/usuarios', autenticador.verificarJWT, autenticador.verificarPermissao, (requisicao, resposta) => {
  usuarios.findAll({attributes: ['email', 'nome', 'sobrenome']}).then(resultado => {
    return resposta.status(200).send(resultado);
  }).catch(erro => {
    return resposta.status(500).send(erro);
  })
});

app.post('/usuarios/cadastrar', autenticador.verificarJWT, autenticador.verificarPermissao, (requisicao, resposta, next) => {
  let nome = requisicao.body.nome;
  let sobrenome= requisicao.body.sobrenome;
  let email = requisicao.body.email;
  let telefone = requisicao.body.telefone;
  let numero_documento = requisicao.body.numero_documento;
  let senha = requisicao.body.senha;
  let tipo_usuario = requisicao.body.tipo_usuario;

  const expressaoRegularEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if(!expressaoRegularEmail.test(email)) {
      return resposta.status(400).send('Informe um email valido');
  }

  usuarios.findOne({ where: { numero_documento: numero_documento }}).then(resultado => {
    if(resultado === null)
    {
       usuarios.create(
      {
                nome: nome, sobrenome: sobrenome, email: email, telefone: telefone, numero_documento: numero_documento, senha: senha, tipo_usuario: tipo_usuario
              }
          ).then(resultado => {
            return resposta.status(200).send(`Usuário salvo com ID ${resultado.id}`);
          }).catch(error => {
            return resposta.status(500).send(`Usuário não foi salvo, erro: ${error}`);
          })
    }else {
            return resposta.status(500).send(`Usuário já cadastrado`);
    }
  }).catch(error => {
    return resposta.status(500).send(`Usuário não foi salvo, erro: ${error}`);
  })
})

app.listen(porta, () => {
  console.log("Servidor inciado, ouvindo na porta: ", porta);
});