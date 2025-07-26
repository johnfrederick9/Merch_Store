from django.contrib import admin
from django.urls import path 
from . import views

urlpatterns = [
    path('', views.Index, name="Index"),
    path('Home', views.Home, name="Home"),
    path('Login', views.LoginUser, name="Login"),
    path('Logout', views.LogoutUser, name="Logout"),
    path('Register', views.Register, name="Register"),
    path('AboutMe', views.AboutMe, name="AboutMe"),
    path('AddOns', views.AddOns, name="AddOns"),
    path('OrderForm', views.OrderForm, name="OrderForm"),
    path('Product', views.Store, name="Product"), 
    path('Cart', views.Cart, name="Cart"),
    path('updateItem', views.updateItem, name="updateItem"),
    path('processOrder', views.processOrder, name="processOrder"),
]