


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
                      labels: ["Confirmed", "Deaths", "Recovered"],
                      datasets: [
//                      {
//                          label: 'World datas',
//                          data: [
//                          json.world_confirmed,
//                          json.world_deaths,
//                          json.world_recovered ]
//                      },
                      {
                          label: 'Conutry datas',
                          backgroundColor: ["blue", "red", "green"],
                          data: [
                          json.confirmed,
                          json.deaths,
                          json.recovered ]
                       }
                      ]
                  }
              })

            }

        });

})
})

