const { Sequelize, DataTypes } = require('sequelize');

const uriConexaoBd = process.env.URI_CONEXAO_BD || "mysql://stephalsra:931004@localhost:8800/banco_de_dados";
const sequelize = new Sequelize(uriConexaoBd)

sequelize.authenticate().then(() => {
   console.log('Autenticação com o banco de dados bem sucedida');
}).catch((error) => {
   console.error('Ocorreu um erro ao tentar autenticar com o banco de dados: ', error);
});

const usuarios = sequelize.define('usuario', {
    nome: {
     "type": DataTypes.STRING,
     "allowNull": false
   },
   sobrenome: {
     type: DataTypes.STRING,
     allowNull: false
   },
   telefone: {
     type: DataTypes.STRING,
     allowNull: false
   },
   email: {
     type: DataTypes.STRING,
     allowNull: false
   },
   numero_documento: {
     type: DataTypes.STRING,
     allowNull: false
   },
    senha: {
     type: DataTypes.STRING,
     allowNull: false
   },
    tipo_usuario: {
     type: DataTypes.STRING,
     allowNull: false
   }
});
sequelize.sync().then(() => {
    console.log('Tabela de usuários criada com sucesso !');
    usuarios.create( {
        nome: "João Maria", sobrenome: "José", email: "a@a.com", telefone: "11999999999", numero_documento: "19100000000", senha: "1234", tipo_usuario: "administrador"
    }).then(resultado => {}).catch(error => { console.log(error); })
}).catch((error) => {
    console.error('Não foi possivel criar a tabela de usuários, erro: ', error);
})

module.exports = usuarios