function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }




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
                console.log(json.confirmed)
                $("#confirmed").each(function () {
                    $(this).prop('Counter',0).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(thousands_separators(Math.ceil(now)));
                        }
                    });
                });

                $("#last_day_confirmed").text(json.france_last_day_confirmed);
                $("#last_day_confirmed").each(function () {
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
                            $(this).text(thousands_separators(Math.ceil(now)));
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
                            $(this).text(thousands_separators(Math.ceil(now)));
                        }
                    });
                });

                $("#last_day_recovered").text(json.france_last_day_recovered);
                $("#last_day_recovered").each(function () {
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
                      labels: ["Mortality"],
                      datasets: [
                       {
                          label: 'Deaths',
                          backgroundColor: ["red"],
                          data: [json.death_rate,100 - json.death_rate]
                       },
                      ]
                  }
                })

                var ctx = document.getElementById("myChart2");
                var myChart = new Chart(ctx, {
                  type: 'doughnut',
                  options: {
                        title: {
                  display: true,
                  position: "top",
                  text: json.recovered_rate + " %",
                  fontSize: 15,
                  fontColor: "#111"
                },
                       responsive: true,
                        maintainAspectRatio:false,
                        },
                  data: {
                      labels: ["Recovered"],
                      datasets: [
                       {
                          label: 'Deaths',
                          backgroundColor: ["green"],
                          data: [json.recovered_rate,100 - json.recovered_rate]
                       },
                      ]
                  }
                })

            }
        })
        })




})
