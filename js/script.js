$(document).ready(
  function(){

    // Al click da tastiera invio,invia messaggio
    $('.bottom input').keydown(
      function(event){

        if($('.bottom input').val().length > 0){
          if(event.which == 13){
            aggiungiMessaggioUtente();

            setTimeout(function(){
              aggiungiMessaggioComputer();
            }, 3000);

          }
        }
      }
    );

    // Al click del bottone,invia messaggio
    $('.bottom i').click(
      function(){

        if($('.bottom input').val().length > 0){
          aggiungiMessaggioUtente();

          setTimeout(function(){
            aggiungiMessaggioComputer();
          }, 3000);
        }

      }
    );

});

// Funzione di inserimento messaggio utente
function aggiungiMessaggioUtente(){
  var bloccoMessaggio = $('.template .myMessage').clone();
  bloccoMessaggio.removeClass('nascosto');
  var messaggio = $('.bottom input').val();
  bloccoMessaggio.prepend(messaggio);
  $('.wrapper').append(bloccoMessaggio);
  $('.bottom input').val('');
}

// Funzione di inserimento messaggio computer
function aggiungiMessaggioComputer(){
  var bloccoMessaggio = $('.template .otherMessage').clone();
  bloccoMessaggio.removeClass('nascosto');
  var messaggio = 'Ok';
  bloccoMessaggio.prepend(messaggio);
  $('.wrapper').append(bloccoMessaggio);
}
