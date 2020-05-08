from django.urls import path


from datas import views

urlpatterns = [
    path('', views.get_value_covid_by_country, name='test'),
]
