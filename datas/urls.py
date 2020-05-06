from django.urls import path


from datas import views

urlpatterns = [
    path('', views.post_ajax, name='ajax'),
]
