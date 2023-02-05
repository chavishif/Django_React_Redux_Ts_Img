from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
   path('img', views.img),
   path('img/<id>', views.img)
]
