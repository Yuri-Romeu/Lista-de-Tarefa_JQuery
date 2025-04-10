const tarefas = [];

window.onload = () => {
     const data = JSON.parse(localStorage.getItem('atividades'));

     if (data) {
          data.forEach(item => {
               addLi(item.texto, item.feita);
               tarefas.push(item);
          });
     }
};

$('form').submit(e => {
     e.preventDefault();

     const tarefa = $('#tarefaInput').val().trim();

     if (tarefa === '' || tarefas.find(t => t.texto === tarefa)) {
          alert('Campo vazio ou já inserido');
     } else {
          const novaTarefa = { texto: tarefa, feita: false };
          tarefas.push(novaTarefa);
          addLi(tarefa, false);
          salvar();
     }

     $('#tarefaInput').val('');
});

$('ul').on('click', 'li', function () {
     const texto = $(this).text();
     $(this).toggleClass('feito');

     const tarefa = tarefas.find(t => t.texto === texto);
     if (tarefa) {
          tarefa.feita = $(this).hasClass('feito');
          salvar();
     }
});

function resetar() {
     if (confirm('Tem certeza que deseja apagar todas as tarefas?')) {
          $('ul').children().remove();
          localStorage.removeItem('atividades');
          tarefas.length = 0;
     }
}

function salvar() {
     localStorage.setItem('atividades', JSON.stringify(tarefas));
}

function addLi(text, feita) {
     const novaTarefa = $('<li></li>').text(text);

     if (feita) {
          novaTarefa.addClass('feito');
     }

     novaTarefa.hide().appendTo($('ul')).fadeIn('slow');
}
