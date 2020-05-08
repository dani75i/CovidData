$(document).ready(function(){
    $("#post-form-list").change(function(){
        var positionhtml = $("html").scrollTop()
         console.log(positionhtml)
        $.ajax({
            type:'POST',
            url:'',
            data:{
                country:$('#post-form-list :selected').text(),
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
                action: 'post'
            },
            success: function(json){
                $("#confirmed").text(json.confirmed);
                $("#deaths").text(json.deaths);
                $("#recovered").text(json.recovered);

                var ctx = document.getElementById("myChart");
                var myChart = new Chart(ctx, {
                  type: 'bar',
                  data: {
                      labels: ["country"],
                      datasets: [
                      {
                          label: 'Confirmed',
                          backgroundColor: ["blue"],
                          data: [
                          json.confirmed]
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
                var myChart = new Chart(ctx, {
                  type: 'line',
                  data: {
                      labels: json.list_dates,
                      datasets: [
                       {
                          label: 'Deaths',
                          backgroundColor: ["red"],
                          data: json.list_deaths
                       },
                      ]
                  }
                })
                $("html").scrollTop(positionhtml)
            }
        })
        })




})
