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
            response_data['death_rate'] = result["death_rate"]

            histogramme = postman_get_data_from_beginning(country)
            response_data["list_dates"] = histogramme[0]
            response_data["list_confirmed"] = histogramme[1]
            response_data["list_deaths"] = histogramme[2]
            response_data["list_recovered"] = histogramme[3]
            response_data["france_last_day_deaths"] = histogramme[4]

            return JsonResponse(response_data)

    else:
        form = CountryForm()

        result = postman_get_data_by_countries("France")
        france_confirmed = result["confirmed"]
        france_deaths = result["deaths"]
        france_recovered = result["recovered"]
        france_death_rate = result["death_rate"]

        histogramme = postman_get_data_from_beginning("France")
        france_dates_list = histogramme[0]
        france_deaths_list = histogramme[2]
        france_last_day_deaths = histogramme[4]

        summary = tableau()

    return render(request, 'datas/home.html',
                  {"form": form,
                   "france_confirmed": france_confirmed,
                   "france_deaths": france_deaths,
                   "france_recovered": france_recovered,
                   "france_dates_list": france_dates_list,
                   "france_deaths_list": france_deaths_list,
                   "france_last_day_deaths": france_last_day_deaths,
                   "france_death_rate": france_death_rate,
                   "summary": tableau(),
                   })


def get_value_covid_by_country_dashboard(request):
    response_data = {}

    if request.POST.get('action') == 'post':
        form = CountryForm(request.POST)
        if form.is_valid():
            country = form.cleaned_data['country']

            result = postman_get_data_by_countries(country)
            response_data['confirmed'] = result["confirmed"]
            response_data['deaths'] = result["deaths"]
            print(result["deaths"])
            response_data['recovered'] = result["recovered"]
            print(result["recovered"])
            response_data['death_rate'] = result["death_rate"]

            histogramme = postman_get_data_from_beginning(country)
            response_data["list_dates"] = histogramme[0]
            response_data["list_confirmed"] = histogramme[1]
            response_data["list_deaths"] = histogramme[2]
            response_data["list_recovered"] = histogramme[3]
            response_data["france_last_day_deaths"] = histogramme[4]

            return JsonResponse(response_data)

    else:
        form = CountryForm()

        result = postman_get_data_by_countries("France")
        france_confirmed = result["confirmed"]
        france_deaths = result["deaths"]
        france_recovered = result["recovered"]
        france_death_rate = result["death_rate"]

        histogramme = postman_get_data_from_beginning("France")
        france_dates_list = histogramme[0]
        france_deaths_list = histogramme[2]
        france_last_day_deaths = histogramme[4]

        world = get_world_datas()
        world_confirmed = world["confirmed"]
        world_deaths = world["deaths"]
        world_recovered = world["recovered"]

        summary = tableau()

    return render(request, 'datas/dashboard.html',
                  {"form": form,
                   "france_confirmed": france_confirmed,
                   "france_deaths": france_deaths,
                   "france_recovered": france_recovered,
                   "france_dates_list": france_dates_list,
                   "france_deaths_list": france_deaths_list,
                   "france_last_day_deaths": france_last_day_deaths,
                   "france_death_rate": france_death_rate,
                   "world_confirmed": world_confirmed,
                   "world_deaths": world_deaths,
                   "world_recovered": world_recovered,
                   "summary": tableau(),
                   })