$(document).ready(
  function(){

    // ------------------------- Ricerca contatti ------------------------------
    $('.ricerca input').keydown(
      function(event){

        var input = $('.ricerca input').val();
        var nomeDaCercare = input.toUpperCase();
        console.log(nomeDaCercare);
        $(".item-contatti").fadeOut();
        $(".item-contatti").each(function() {
          console.log($(this).attr('name'));

          if($(this).attr('name^=' + nomeDaCercare')){
            $(this).fadeIn();
          }
        });
      });


    // ---------------------------- Cambio Chat --------------------------------
    $(document).on('click','.item-contatti', function(){
      $('.chat').addClass('hidden');
      var index = parseInt($(this).attr('data-contact'));
      $('div[data-chat=' + index + ']').removeClass('hidden');
    });


    // ------------------------- Invio messaggio -------------------------------
    // Al click da tastiera invio,invia messaggio
    $('.bottom input').keydown(
      function(event){

        if($('.bottom input').val().length > 0){
          if(event.which == 13){
            var orario = ora();
            aggiungiMessaggioUtente(orario);


            setTimeout(function(){
              var orario = ora();
              aggiungiMessaggioComputer(orario);
            }, 3000);

          }
        }
      }
    );

    // Al click del bottone,invia messaggio
    $('.bottom i').click(
      function(){

        if($('.bottom input').val().length > 0){
          var orario = ora();
          aggiungiMessaggioUtente(orario);

          setTimeout(function(){
            var orario = ora();
            aggiungiMessaggioComputer(orario);
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

});

// Funzione di inserimento messaggio utente
function aggiungiMessaggioUtente(orario){
  var ora = $('.template .myMessage .orario')
  ora.append(orario);
  var bloccoMessaggio = $('.template .myMessage').clone();
  bloccoMessaggio.removeClass('nascosto');
  var messaggio = $('.bottom input').val();
  bloccoMessaggio.prepend(messaggio);
  $('.wrapper').append(bloccoMessaggio);
  $('.bottom input').val('');
  ora.text('');
  $('.chat').scrollTop($('.chat').height());
}

// Funzione di inserimento messaggio computer
function aggiungiMessaggioComputer(orario){
  var ora = $('.template .otherMessage .orario')
  ora.append(orario);
  var bloccoMessaggio = $('.template .otherMessage').clone();
  bloccoMessaggio.removeClass('nascosto');
  var messaggio = 'Ok';
  bloccoMessaggio.prepend(messaggio);
  $('.wrapper').append(bloccoMessaggio);
  ora.text('');
  $('.chat').scrollTop($('.chat').height());
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
