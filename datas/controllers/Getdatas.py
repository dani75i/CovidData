import requests


def get_data_by_countries(country):
    url = "https://covid19.mathdro.id/api/countries/" + country
    response = requests.get(url=url).json()

    information = {
        "confirmed": response["confirmed"]["value"],
        "recovered": response["recovered"]["value"],
        "deaths": response["deaths"]["value"],
    }
    return information


def get_all_countries():
    list_countries = []
    url = "https://covid19.mathdro.id/api/countries/"
    response = requests.get(url=url).json()["countries"]
    for country in response:
        list_countries.append((country['name'], country['name']))
    return list_countries


def get_world_datas():
    url = "https://covid19.mathdro.id/api"
    response = requests.get(url=url).json()

    information = {
        "confirmed": response["confirmed"]["value"],
        "recovered": response["recovered"]["value"],
        "deaths": response["deaths"]["value"],
    }

    return information


def postman_get_data_from_beginning(country):
    url = "https://api.covid19api.com/total/dayone/country/" + country + "/status/confirmed"
    response = requests.get(url=url).json()
    list_cases = []
    list_dates = []
    for case in response:
        list_cases.append(case["Cases"])
        list_dates.append(case["Date"])

    return list_dates, list_cases


def postman_get_all_countries():
    url = "https://api.covid19api.com/countries"
    response = requests.get(url=url).json()
    list_countries = []

    for country in response:
        list_countries.append((country["Country"], country["Country"]))

    return sorted(list_countries)


def postman_get_data_by_countries(country):
    url = "https://api.covid19api.com/total/country/" + country
    response = requests.get(url=url).json()[-1]

    information = {
        "confirmed": response["Confirmed"],
        "recovered": response["Recovered"],
        "deaths": response["Deaths"],
    }

    return information
