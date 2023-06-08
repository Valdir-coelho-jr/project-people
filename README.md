![project_people_thumbnail](https://github.com/Valdir-coelho-jr/project-people/assets/118737424/b48d794c-0d11-4647-861b-77c5a691c128)

> Status: Versão atual completa. (Pode haver melhorias e implementações Futuras)
### Este é um projeto de controle de registros com pessoas e cidades, vinculando ambos.

## Tecnologias que foram utilizadas no desenvolvimento desse projeto:
<table>
  <tr>
    <td>React</td>
    <td>TypeScript</td>
    <td>Json Server</td>
    <td>Material ui</td>
    <td>Yup Validation</td>
  </tr>
  <tr>
    <td>18.*</td>
    <td>4.9.5</td>
    <td>0.17.3</td>
    <td>5.11.16</td>
    <td>1.2.0</td>
  </tr>
</table
  
# Video demonstrativo do projeto funcionando
  https://github.com/Valdir-coelho-jr/project-people/assets/118737424/201dfdf2-cf29-4197-b1cd-c830a2faf4c8

## Como rodar o projeto:
  1) Abra o projeto em um editor de código (Recomendo o VSCode)
  2) Abra o terminal do editor e digite `yarn start` e em seguida  `yarn mock`

## O Projeto faz a listagem e o controle dos seguintes campos:
+ Pessoas
+ Cidades

## As funcionalidades e métodos principais desse projeto são:
  + Realizar uma simulação de uma validação de login em uma tela de email e senha
+ Realizar uma simulação de uma validação de login em uma tela de email e senha
+ Fazer o cadastro de Pessoas através de um formulário contendo Nome, Email e Cidade
+ Fazer o cadastro de Cidades através de um formulário contendo Nome da cidade
+ Criar, Editar e Apagar cadastro de pessoas e cidades através dos botões da interface
+ Fazer a listagem dos cadastros feitos no campo de Cidades e no campo de Pessoas
+ Interligar o Cadastro de Pessoas com Cidades através do campo de cidades no formulário de pessoas, através do Auto-complete
+ Fazer uma contagem de quantas cidades e pessoas estão cadastradas e apresentar de forma visual na Página Inicial do projeto
+ Ter um Layout responsívo para todos os tipos de telas e resoluções de computador e mobile.


Todo o projeto foi feito usando os Hooks do React como base principal da lógica e Hooks customizados para complementar a estruturação dos componentes e a instalação das livrarias e uma api externa como dependências.



### Atenção!
#### Para que o projeto funcione, é necessário estar instalado:

+ React e TypeScript - Como o projeto foi feito em React e TypeScript, é primordial que ambos estejam instalados.
+ Json Server - Como esse é um projeto Front-End, o Json Server é uma API que vai simular um backend para sua aplicação conseguir guardar os Dados do cadastro. O  Json Server pode ser substituído por qualquer API de sua preferência que tenha esse mesmo propósito.
+ Material ui - Livraria que utilizei para a criar todos os componentes de responsividade e estilização do Projeto.
+ Yup Validation - Livraria de Validação de dados. Com ela é possível realizar tratamento de erros. Também pode ser substituída por uma livraria de sua preferência que tenha o mesmo propósito.

## Funcionalidades que pretendo implementar no futuro:
+ Seleção de dois ou mais items listados no campo de cidades ou pessoas para Excluir vários items de uma vez.
+ Criação de um terceiro Campo como por exemplo: "Estado"
