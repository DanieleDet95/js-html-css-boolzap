$(document).ready(
  function(){

    // ------------------------- Ricerca contatti ------------------------------
    $('.ricerca input').keyup(
      function(event){

        // Assegnazione valore da ricercare in maiuscolo
        var input = $('.ricerca input').val();
        var nomeDaCercare = input.toUpperCase();

        // Nascondere tutti i contatti
        $(".item-contatti").hide();

        // Per ogni contatto esistente
        $(".item-contatti").each(
          function() {

            // Se nel contatto é presente il valore da ricercare mostralo
            if($(this).attr('name').includes(nomeDaCercare)){
              $(this).show();
            }
          });
    });


    // --------------------- Cambio Chat e info sopra --------------------------

    // Chat visualizzata di defoult
    var index = 1;
    $('div[data-chat=' + index + ']').removeClass('hidden');

    // Al click dei contatti
    $(document).on('click','.item-contatti',
      function(){

        // Nascondere tutte le chat
        $('.chat').addClass('hidden');

        // Mostrare la chat con l'indice del contatto
        index = parseInt($(this).attr('data-contact'));
        $('div[data-chat=' + index + ']').removeClass('hidden');

        // Assegnazione avatar con l'indice del contatto
        var avatar = $('li[data-contact=' + index + '] .avatar img' ).attr('src');
        $('#right .top .avatar img').attr('src',avatar);

        // Assegnazione nome con l'indice del contatto
        var nome = $('li[data-contact=' + index + '] .nome p' ).text();
        $('.top .info .nome p').text(nome);

        // Assegnazione orario casuale alla chat
        $('.top .info .sotto-nome span' ).text(oraCasuale());
    });



    // ------------------------- Invio messaggio -------------------------------
    // Cambio icona microfono con l'invio messaggio

    // All'evento di input cliccato
    $('.bottom input').keyup(
      function(event){
        if($('.bottom input').val().length > 0){
          $('.bottom .microfono').addClass('hidden');
          $('.bottom .areoplano').removeClass('hidden');
        }
        if($('.bottom input').val().length == 0) {
          $('.bottom .microfono').removeClass('hidden');
          $('.bottom .areoplano').addClass('hidden');
        }
      });

    // Al click da tastiera invio,invia messaggio
    $('.bottom input').keydown(
      function(){

        if($('.bottom input').val().length > 0){
          if(event.which == 13){
            var orario = ora();
            aggiungiMessaggioUtente(orario,index);

            $('.top .info .sotto-nome' ).text('Sta scrivendo..');
            setTimeout(function(){
              var orario = ora();
              aggiungiMessaggioComputer(orario,index);
              $('.top .info .sotto-nome' ).text('Ultimo accesso oggi alle ' + orario + '');
            }, 3000);

          }
        }
      }
    );

    // Al click del bottone,invia messaggio
    $('.bottom .areoplano').click(
      function(){

        if($('.bottom input').val().length > 0){
          var orario = ora();
          aggiungiMessaggioUtente(orario,index);

          setTimeout(function(){
            var orario = ora();
            aggiungiMessaggioComputer(orario,index);
          }, 3000);
        }

      }
    );

    // Elimina messaggio
    $(document).on('click','.elimina', function(){
      $(this).siblings('.bloccoElimina').toggleClass('nascosto');
    });

    $(document).on('click','.X', function(){
      $(this).parents('.myMessage').remove();
      $(this).parents('.otherMessage').remove();
    });


    // Cambio Tema
    // Visualizzazione menu
    $('#right .icone i.fa-ellipsis-v').click(
      function(){

        $('.icone .temi').toggleClass('hidden');

    });

    // Se clicco su chiaro
    $('.icone .temi .chiaro').click(
      function(){

        $('.icone .temi').addClass('hidden');
        $('.temi').css('background','white');
        $('body').css('color','black');
        $('.top').css('background','#eaeaea');
        $('.notifiche').css('background','#8edafc');
        $('.ricerca').css('background','#eaeaea');
        $('.ricerca input').css('background','#eaeaea');
        $('.ricerca input').css('color','black');
        $('.item-contatti').css('background','#eaeaea');
        $('.bottom').css('background','#eaeaea');
        $('.item-contatti').css('background','#eaeaea');
        $('.myMessage').css('background','#d5f9ba');
        $('.otherMessage').css('background','	white');

    });

    // Se clicco su scuro
    $('.icone .temi .scuro').click(
      function(){

        $('.icone .temi').addClass('hidden');
        $('.temi').css('background','#25383C');
        $('body').css('color','white');
        $('.top').css('background','#25383C');
        $('.notifiche').css('background','#151B54');
        $('.ricerca').css('background','#25383C');
        $('.ricerca input').css('background','#25383C');
        $('.ricerca input').css('color','white');
        $('.item-contatti').css('background','#25383C');
        $('.bottom').css('background','#25383C');
        $('.item-contatti').css('background','#25383C');
        $('.myMessage').css('background','#254117');
        $('.otherMessage').css('background','	#726E6D');
    });

});

// Funzione di inserimento messaggio utente
function aggiungiMessaggioUtente(orario,index){

  // Assegnazione valore dell'ora al messaggio
  var ora = $('.template .myMessage .orario')
  ora.append(orario);

  // Clonare il template predefinito e renderlo visibile
  var bloccoMessaggio = $('.template .myMessage').clone();
  bloccoMessaggio.removeClass('nascosto');

  // Assegnazione del messaggio inserito in una variabile e aggiungerlo al template
  var messaggio = $('.bottom input').val();
  bloccoMessaggio.prepend(messaggio);

  // Inserire il template nella chat con l'indice dell'utente attivo
  $('div[data-chat=' + index + ']').children('.wrapper').append(bloccoMessaggio);

  // Reset del messaggio, dell'ora e dell'icona
  $('.bottom input').val('');
  ora.text('');
  $('.bottom .microfono').removeClass('hidden');
  $('.bottom .areoplano').addClass('hidden');

  // Scroll della chat all'ultimo messaggio
  $('.chat').scrollTop($('.chat').prop('scrollHeight'));
}

// Funzione di inserimento messaggio computer
function aggiungiMessaggioComputer(orario,index){
  // Assegnazione valore dell'ora al messaggio
  var ora = $('.template .otherMessage .orario')
  ora.append(orario);

  // Clonare il template predefinito e renderlo visibile
  var bloccoMessaggio = $('.template .otherMessage').clone();
  bloccoMessaggio.removeClass('nascosto');

  // Assegnazione del messaggio inserito in una variabile e aggiungerlo al template
  var messaggio = 'Ok';
  bloccoMessaggio.prepend(messaggio);

  // Inserire il template nella chat con l'indice dell'utente attivo
  $('div[data-chat=' + index + ']').children('.wrapper').append(bloccoMessaggio);

  // Aggiungere il messaggio sotto il contatto
  $('li[data-contact='+ index +'].item-contatti .ultimoMex').text(messaggio);

  // Reset dell'ora
  ora.text('');

  // Scroll della chat all'ultimo messaggio
  $('.chat').scrollTop($('.chat').prop('scrollHeight'));
}

// Funzione restituisce orario
function ora(){
  var data = new Date();
  var h = data.getHours();
  var m = data.getMinutes();
  if (m < 10) {
    m = '0' + m;
  }
  return orario = h + ':' + m;
}

// Funzione restituisce orario
function oraCasuale(){
  var data = new Date();
  var h = Math.floor(Math.random() * 24);
  var m = Math.floor(Math.random() * 24);
  if (m < 10) {
    m = '0' + m;
  }
  return orarioCasuale = h + ':' + m;

}
