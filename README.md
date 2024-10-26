# API do Di

## O que é

Esse é o repositório do projeto API do Di. Essa API REST visa gerenciar a base de dados dos clientes da barbearia do Di.

Esse projeto foi construído com as seguintes tecnologias:

- NodeJS
  - express
  - jsonwebtoken
  - mysql2
  - sequelize
- MySQL 8.0

## Como utilizar

Para executar esse projeto, execute os seguintes passos:

1. Faça o clone do repositório desse projeto em sua máquina local usando o git;
2. Caso suportado, crie as variáveis de ambiente que estão dentro do arquivo [.env.example](./.env.example) no sistema que irá executar a API:
   1. Altere os valores das variáveis de ambiente para os valores que deverão ser utilizados em sua instalação  (seu banco de dados, sua porta de conexão, seu segredo JWT);
   2. Tenha certeza que esses valores são acessíveis pela aplicação, caso contrário os valores padrão serão utilizados no código-fonte; 
   3. Caso não seja possível definir variáveis de ambiente, abra o arquivo [usuarios.js](./usuarios.js) em um editor de texto, e modifique os dados de conexão com o seu banco de dados MySQL e salve o arquivo;
2. Em uma janela do terminal, execute o comando no diretório do projeto:
  1. ```npm install```
2. Em seguida, execute o comando no diretório do projeto:
  1. ```npm run start```

O servidor web do projeto entrará em execução, e será acessível por padrão na porta 80. Para acessa-lo na porta padrão, basta acessar a URL:

```http://localhost```

E a apresentação da API deverá aparecer.

### Referências (artigos resumidos com leitura recomendada):

#### API REST
- [O que é uma API REST - RedHat](https://www.redhat.com/pt-br/topics/api/what-is-a-rest-api) - Acessado em 26/10/2024 ás 07:06
- [O que é uma REST API - IBM](https://www.ibm.com/br-pt/topics/rest-apis) - Acessado em 26/10/2024 ás 07:30

#### JSON WEB TOKEN (JWT)
- [JWT token: o que é, estrutura e as vantagens de usar](https://www.totvs.com/blog/gestao-para-assinatura-de-documentos/jwt-token/) - Acessado em 26/10/2024 ás 08:10

#### ORM
- [ORM - Object Relational Mapping - Revista Easy .Net Magazine 28](https://www.devmedia.com.br/orm-object-relational-mapping-revista-easy-net-magazine-28/27158) - Acessado em 26/10/2024 ás 08:30
- [O que é sequelize?](https://www.linkedin.com/pulse/o-que-%C3%A9-sequelize-thomas-lincoln/) - Acessado em 26/10/2024 ás 08:49



