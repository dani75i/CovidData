from django import forms
from datas.controllers.Getdatas import *


class TestForm(forms.Form):
    name = forms.CharField(label='Your name', max_length=255)
    email = forms.EmailField(label='Your email', max_length=255, required=False)


# LIST_COUNTRIES = get_all_countries()
LIST_COUNTRIES = postman_get_all_countries()


class CountryForm(forms.Form):
    country = forms.CharField(label='Select a country : ',
                              widget=forms.Select(
                                  choices=LIST_COUNTRIES,
                                  attrs={'style':
                                'width:200px;height:30px; font-size: 15px;'},
                              ),
                              initial="France")


class CountryFormAjax(forms.Form):
    country = forms.CharField(label='Your country', max_length=255)
