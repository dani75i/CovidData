


$(document).ready(function(){
   $("#post-form-list").change(function(){
        $("#p1").empty();
        $.ajax({
            type:'POST',
            url:'',
            data:{
                country:$('#post-form-list :selected').text(),
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
                action: 'post'
            },
            success: function(json){
                $("#p1").append(

                "<div id='country'>" +
                json.country +
                "</div>" + "<br>" +

                "<div class='container'>" +
                      "<div class='row'>" +
                        "<div class='col-sm-4' id='confirmed'>" +
                          "<h3>Confirmed</h3>" +
                          "<p>" + json.confirmed + "</p>" +
                        "</div>" +
                        "<div class='col-sm-4' id='deaths'>" +
                          "<h3>Deaths</h3>" +
                          "<p>" + json.deaths + "</p>" +
                        "</div>" +
                        "<div class='col-sm-4' id='recovered'>" +
                          "<h3>Recovered</h3>" +
                          "<p>" + json.recovered + "</p>" +
                        "</div>" + "<br>" +
                       "</div>" +
                "</div>" + "<br>"
                )
                console.log(json.confirmed)

                var ctx = document.getElementById("myChart");
                var myChart = new Chart(ctx, {
                  type: 'bar',
                  data: {
//                      labels: ["Confirmed", "Deaths", "Recovered"],
                      labels: ["country"],
                      datasets: [
//                      {
//                          label: 'Confirmed',
//                          backgroundColor: ["blue", "red", "green"],
//                          data: [
//                          json.confirmed,
//                          json.deaths,
//                          json.recovered ]
//                       },
                      {
                          label: 'Confirmed',
                          backgroundColor: ["blue"],
                          data: [
                          json.confirmed, ]
                       },
                       {
                          label: 'Deaths',
                          backgroundColor: ["red"],
                          data: [
                          json.deaths]
                       },
                       {
                          label: 'Recovered',
                          backgroundColor: ["green"],
                          data: [
                          json.recovered]
                       }
                      ]
                  }
              })

              var ctx = document.getElementById("myChart2");
                console.log(json.list_dates)
                var myChart = new Chart(ctx, {
                  type: 'line',
                  data: {
                      labels: json.list_dates,
                      datasets: [
//                      {
//                          label: 'Confirmed',
//                          backgroundColor: ["blue"],
//                          data: json.list_confirmed
//                       },
                       {
                          label: 'Deaths',
                          backgroundColor: ["red"],
                          data: json.list_deaths
                       },
//                       {
//                          label: 'Recovered',
//                          backgroundColor: ["green"],
//                          data: json.list_recovered
//                       },
                      ]
                  }
              })

            }

        });

})
})

