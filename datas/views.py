from django.shortcuts import render
from django.http import JsonResponse
from datas.forms import CountryForm
from datas.controllers.Getdatas import *


def post_ajax(request):
    response_data = {}

    if request.POST.get('action') == 'post':
        form = CountryForm(request.POST)
        if form.is_valid():
            country = form.cleaned_data['country']
            result = get_data_by_countries(country)

            world_result = get_world_datas()

            response_data['country'] = country
            response_data['confirmed'] = result["confirmed"]
            response_data['deaths'] = result["deaths"]
            response_data['recovered'] = result["recovered"]

            response_data['world_confirmed'] = world_result["confirmed"]
            response_data['world_deaths'] = world_result["deaths"]
            response_data['world_recovered'] = world_result["recovered"]

            return JsonResponse(response_data)
    else:
        form = CountryForm()
        result = get_world_datas()

        world_confirmed = result["confirmed"]
        world_deaths = result["deaths"]
        world_recovered = result["recovered"]


    return render(request, 'datas/home.html',
                  {"form": form,
                   "world_confirmed": world_confirmed,
                   "world_deaths": world_deaths,
                   "world_recovered": world_recovered,}
                  )