/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  
  $('.table').DataTable();

  //submit
  $('.btn-add').on('click', function(e){
    console.log(e);
    var keyData = $('.input-key').val();
    var valueData = $('.input-value').val();
    // write to db
    localStorage.setItem(keyData, valueData);
    // read from db
    var displayText = keyData + ' | ' + localStorage.getItem(keyData);
    // this only displays the last one? might want to switch to html
    // and append a div
    // <div class="display-data-item" data-keyValue="keyData">valueData</div>
    // if you use backticks ` you can use ${templateLiterals}
    // TODO make this vars make sense across the app
    $('.container-data').append('<div class="display-data-item" data-keyValue="'+ keyData +'">'+displayText+'</div>');
    $('.input-key').val('');
    $('.input-value').val('');
  });


  // update db
    // need to expand when  more than 1 item is added

  // delete item
  // $('.container-data').on('click', '.display-data-item', function(e){
  //   var keyData = e.currentTarget.dataset.keyvalue;
  //   localStorage.removeItem(keyData);
  //   $('.container-data').text('');
  // });

  // delete all?
  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.container-data').text('');
  });

  //show saved 
   for (var key in localStorage) {
    var value = localStorage[key];
    var displayText = `${key} | ${value}`;
    if (key === "length") {
      break;
    }
     $('.container-data').append(`<div class="display-data-item" data-keyValue= ${key}>${displayText}</div>`);
   }

});