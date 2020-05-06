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


print(get_world_datas())
