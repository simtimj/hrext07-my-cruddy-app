/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){

  //submit
  $('.btn-add').on('click', function(e){
    
    var title = $('.title-input').val();
    var start = $('.start-input').val() || "";
    var end = $('.end-input').val() || "";
    var length = $('.length-input').val() || "";
    
    // var titleKey = title + "Name";
    // var startKey = title + "Start";
    // var endKey = title + "End";
    // var lengthKey = title + "Length";

    for (var key in localStorage) {
      if (key === title) {
        
      }
    }

    // if no length
    if (start !== "" && end !== "" && length === "") {
      console.log("in no length")
      length = findLength(start,end);
      console.log(length);
    }

    // if no end
    console.log(end);
    if (start !== "" && end === "" && length !== "") {
      end = findEnd(start,length);
      console.log(end)
    }

    // if no start
    if (start === "" && end !== "" && length !== "") {
      start = findStart(end,length);
    }

    var values = title + "|" + start + "|" + end + "|" + length;

    // write to db
    localStorage.setItem(title, values);

    // read from db
    var values = localStorage.getItem(title);

    var splitValues = values.split("|");
    var storedTitle = splitValues[0];
    var storedStart = splitValues[1];
    var storedEnd = splitValues[2];
    var storedLength = splitValues[3];

    var displayText = storedTitle + " | " + 
                      storedStart + " | " + 
                      storedEnd   + " | " + 
                      storedLength;
    
    
    $('.input-key').val('');
    $('.title-input').val('');
    $('.start-input').val('');
    $('.end-input').val('');
    $('.length-input').val('');

    $(".table-content").empty();
    show();
  });


  // update db
    // need to expand when  more than 1 item is added

  //delete row
  $(".btn-delete").click(function(){
    $("table tbody").find('input[name="record"]').each(function(){
      if($(this).is(":checked")){
        $(this).parents("tr").remove();
      }
    });
  });

  // delete all?
  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.table-content').text('');
    show();
  });

  //show saved 
  var show = function() {
    if (localStorage.length !== 0) {
      for (var key in localStorage) {

        if (key === "length") {
          break;
        }

        $(".table-content").append(`<tr class="${key}-row" id="row"><tr>`)    //ex: class="Breakfast-row"
        //var values = localStorage.key.val()
        var splitValues = localStorage.getItem(key).split("|");
        var storedTitle = splitValues[0];
        var storedStart = splitValues[1];
        var storedEnd = splitValues[2];
        var storedLength = splitValues[3];

        // $('.container-data').append(`<div class="display-data-item" data-keyValue= ${storedTitle}>${displayText}</div>`);

        //will append, within tbody, a tr, with 4 tds for each cell
        $(`.${storedTitle}-row`).append('<td><input type="checkbox" name="record"></td>')
        $(`.${storedTitle}-row`).append(`<td>${storedTitle}</td>`)
        $(`.${storedTitle}-row`).append(`<td>${storedStart}</td>`)
        $(`.${storedTitle}-row`).append(`<td>${storedEnd}</td>`)
        $(`.${storedTitle}-row`).append(`<td>${storedLength}</td>`)
       }
    } 
  }
  show();
});

var timeInMins = function(time) {
  var split = time.split(":");
  var hrs = parseInt(split[0]) % 12;
  var mins = parseInt(split[1]);

  return (hrs * 60) + mins;
}

var realTime = function(mins) {
  if (mins < 60) {
    mins = mins.toString();
    if (mins < 10) {
      mins = "0" + mins;
    }
    return "0:" + mins; 
  } else {
    var hrs = Math.floor(mins/60);
    var mins = (mins % 60)
    if (mins < 10) {
      mins = "0" + mins;
    }
    return hrs.toString()+":"+mins.toString();
  }
}

var findLength = function(start, end) {
  var startInMins = timeInMins(start);
  var endInMins = timeInMins(end);
  var dif = endInMins - startInMins
  return realTime(dif);
}
//findLength("2:00", "5:30");

var findEnd = function(start,length) {
  var total = timeInMins(start) + parseInt(timeInMins(length));
  return realTime(total).toString();
}
//findEnd("5:00","0:30")

var findStart = function(end,length) {
  var diff = timeInMins(end) - parseInt(timeInMins(length));
  return realTime(diff);
}
//findStart("6:30","0:30")