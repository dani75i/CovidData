$(document).ready(function(){
    $("#post-form-list").change(function(){
        $.ajax({
            type:'POST',
            url:'',
            data:{
                country:$('#post-form-list :selected').text(),
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
                action: 'post'
            },
            success: function(json){
                $("#country").text($('#post-form-list :selected').text());

                $("#confirmed").text(json.confirmed);
                $("#confirmed").each(function () {
                    $(this).prop('Counter',0).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });

                $("#deaths").text(json.deaths);
                $("#deaths").each(function () {
                    $(this).prop('Counter',0).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });

                $("#recovered").text(json.recovered);
                $("#recovered").each(function () {
                    $(this).prop('Counter',0).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });

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
                $("html").scrollTop(166)
            }
        })
        })




})
