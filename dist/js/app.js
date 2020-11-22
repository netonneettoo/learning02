// Essa função só é executada quando o DOM da página é totalmente carregado
$(document).ready(function() {

  // Usado como modelo pra gerar o parágrafo do comentário  
  var commentTemplate = `<p class="comment"><small>{DATE_TIME}</small><br/><b>{NAME}: </b><span>{COMMENT}</span></p>`;
  // Obtendo via jquery o form #form-comment
  var $formComment = $('#form-comment');
  // Obtendo a div com a classe .comments
  var $comments = $('.comments');

  // Função usada pra obter os comentários que estão salvos no localStorage do navegador
  var getComments = function() {
    // Obtendo conteúdo salvo no localStorage com a chave comments
    var hasComments = localStorage.getItem('comments');
    // Checando se existe comentários no localStorage, se existir retorna os comentários, senão retorna array vazio
    return hasComments ? JSON.parse(hasComments) : [];
  }

  // Função usada pra mostrar no html os comentários que estão salvos no localStorage
  var printComments = function() {
    // Usando a função getComments para obter os comentários salvos no localStorage
    let commentList = getComments();
    // Limpando a div de comentários
    $comments.html('');
    // Percorrendo a lista de comentários salvos no localStorage
    commentList.forEach(function(comment) {
      // Adicionando comentário na div de comentários
      $comments.append(comment);
    });
  }

  // Função usada pra adicionar um comentário no localStorage
  var addComment = function(paragraph) {
    // Mesmo código já explicado anteriormente: Linha 13
    var hasComments = localStorage.getItem('comments');
    // Mesmo código já explicado anteriormente: Linha 15
    var commentList = hasComments ? JSON.parse(hasComments) : [];
    // Adicionando o parâmetro paragraph no início da listagem de comentários
    commentList.unshift(paragraph);
    // Inserindo a lista de comentários no localStorage
    localStorage.setItem('comments', JSON.stringify(commentList));
  }

  // Usado pra retornar a data e hora nesse formato: dd/mm/yyyy hh:mm:ss
  var getDateTime = function() {
    // Obtendo data
    let dt = new Date();
    // Obtendo data no formato desejado
    let dateStr = [dt.getDate(), dt.getMonth()+1, dt.getFullYear()].join('/');
    // Obtendo horário no formato desejado
    let timeStr = [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(':');
    // Retornando formato geral de data e hora
    return [dateStr, timeStr].join(' ');
  }

  // Função usada pra gerar um novo parágrado pra usar como comentário
  var getNewParagraph = function(nameVal = '', commentVal = '') {
    // Retornando o template fazendo a alteração das chaves com os valores desejados
    return commentTemplate
      .replace("{DATE_TIME}", getDateTime())
      .replace("{NAME}", nameVal)
      .replace("{COMMENT}", commentVal);
  }

  // Configurando método submit ao formulário de comentário
  $formComment.on('submit', function(evt) {
    // Impedindo que o submit padrão aconteça pra seguir apenas com o código abaixo
    evt.preventDefault();
    // Obtendo o valor digitado no input do nome
    let nameVal = $('[name="name"]').val();
    // Obtendo o valor digitado no textarea do comentário
    let commentVal = $('[name="comment"]').val();
    // Evitando que o nome tenha menos de 3 caracteres
    if (nameVal.length < 3) {
      alert('Digite um nome válido')
      return
    }
    // Evitando que o comentário tenha menos de 3 caracteres
    if (commentVal.length < 3) {
      alert('Digite um comentário válido')
      return
    }
    // Obtendo novo parágrafo baseado nos valores digitados de nome e comentário
    let newParagraph = getNewParagraph(nameVal, commentVal);
    // Adicionando comentário no localStorage
    addComment(newParagraph);
    // Mostrando os comentários salvos no html
    printComments();
    // Limpando valor do textarea de comentário
    $('[name="comment"]').val('');
  });

  // Mostrando os comentários salvos no html ao abrir a página
  printComments();
});
