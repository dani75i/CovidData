from django.urls import path


from datas import views

urlpatterns = [
    path('test', views.get_value_covid_by_country, name=''),
    path('', views.get_value_covid_by_country_dashboard, name='test'),
]
