$(document).ready(function(){
    $("#post-form-list").change(function(){
        $.ajax({
            type:'POST',
            url:'test',
            data:{
                country:$('#post-form-list :selected').text(),
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
                action: 'post'
            },
            success: function(json){
                $("#country").text($('#post-form-list :selected').text());

                $("#confirmed").text(json.confirmed);
                console.log(json.confirmed)
                $("#confirmed").each(function () {
                    $(this).prop('Counter',0).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(commaSeparateNumberMath.ceil(now)));
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

                $("#last_day_deaths").text(json.france_last_day_deaths);
                $("#last_day_deaths").each(function () {
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
                  options: {
                        title: {
                            display: true,
                            text: 'Confirmed vs Deaths vs Recovered',
                            fontSize: 15,
                            fontColor: "#111"
                        }
                    },
                  data: {
                      labels: [],
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
                  options: {
                        title: {
                            display: true,
                            text: 'New deaths',
                            fontSize: 15,
                            fontColor: "#111"
                        }
                    },
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

                var ctx = document.getElementById("myChart3");
                var myChart = new Chart(ctx, {
                  type: 'doughnut',
                  options: {
                        title: {
                  display: true,
                  position: "top",
                  text: json.death_rate + " %",
                  fontSize: 15,
                  fontColor: "#111"
                },
                       responsive: true,
                        maintainAspectRatio:false,
                        },
                  data: {
                      labels: ["Mortality Rate"],
                      datasets: [
                       {
                          label: 'Deaths',
                          backgroundColor: ["red"],
                          data: [json.death_rate,100 - json.death_rate]
                       },
                      ]
                  }
                })

                $("html").scrollTop(166)
            }
        })
        })




})
