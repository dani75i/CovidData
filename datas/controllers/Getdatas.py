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
    list_confirmed = []
    list_deaths = []
    list_recovered = []
    list_dates = []

    url_confirmed = "https://api.covid19api.com/total/dayone/country/" + country + "/status/confirmed"
    response_confirmed = requests.get(url=url_confirmed).json()
    for case in response_confirmed:
        list_confirmed.append(case["Cases"])
        list_dates.append(case["Date"][5:10])

    url_deaths = "https://api.covid19api.com/total/dayone/country/" + country + "/status/deaths"
    response_recovered = requests.get(url=url_deaths).json()
    for case in response_recovered:
        list_deaths.append(case["Cases"])

    url_recovered = "https://api.covid19api.com/total/dayone/country/" + country + "/status/recovered"
    response_recovered = requests.get(url=url_recovered).json()
    for case in response_recovered:
        list_recovered.append(case["Cases"])

    list_deaths_not_cumulated = []
    for case in range(len(list_deaths) - 1):
        list_deaths_not_cumulated.append(list_deaths[case + 1] - list_deaths[case])
    list_deaths_not_cumulated.insert(0, 0)

    number_deaths_last_day = list_deaths_not_cumulated[-1]

    return list_dates, list_confirmed, list_deaths_not_cumulated, \
           list_recovered, number_deaths_last_day


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

    death_rate = (int(response["Deaths"]) / int(response["Confirmed"])) * 100
    death_rate = "%.2f" % death_rate

    information = {
        "confirmed": response["Confirmed"],
        "recovered": response["Recovered"],
        "deaths": response["Deaths"],
        "death_rate": death_rate,
    }

    return information


print(postman_get_data_from_beginning("france"))
