import json
from django.shortcuts import render
from django.http import JsonResponse
from datas.forms import CountryForm
from datas.controllers.Getdatas import *


def get_value_covid_by_country(request):
    response_data = {}

    if request.POST.get('action') == 'post':
        form = CountryForm(request.POST)
        if form.is_valid():
            country = form.cleaned_data['country']

            result = postman_get_data_by_countries(country)
            response_data['confirmed'] = result["confirmed"]
            response_data['deaths'] = result["deaths"]
            response_data['recovered'] = result["recovered"]

            histogramme = postman_get_data_from_beginning(country)
            response_data["list_dates"] = histogramme[0]
            response_data["list_confirmed"] = histogramme[1]
            response_data["list_deaths"] = histogramme[2]
            response_data["list_recovered"] = histogramme[3]

            return JsonResponse(response_data)

    else:
        form = CountryForm()

        result = postman_get_data_by_countries("France")
        france_confirmed = result["confirmed"]
        france_deaths = result["deaths"]
        france_recovered = result["recovered"]

        histogramme = postman_get_data_from_beginning("France")
        france_dates_list = histogramme[0]
        france_deaths_list = histogramme[2]

    return render(request, 'datas/home.html',
                  {"form": form,
                   "france_confirmed": france_confirmed,
                   "france_deaths": france_deaths,
                   "france_recovered": france_recovered,
                   "france_dates_list": france_dates_list,
                   "france_deaths_list": france_deaths_list
                   })
