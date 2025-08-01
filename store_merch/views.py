from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .forms import CustomUserCreationForm
import json
import datetime
from .models import *
from . utils import cookieCart, cartData, guestOrder



def LoginUser(request):
    page = 'login'
    
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        user = authenticate(request, username= username, password= password)

        if user is not None:
            login(request, user)
            return redirect('Home')
        
    return render(request, 'Main/Login-Register.html', {'page': page})

def LogoutUser(request):
    logout(request)
    return redirect('Index')

def Register(request):
    page = 'register'
    form = CustomUserCreationForm()
    
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit = False)
            user.save()
            
            
            user =  user = authenticate(
                request, username=user.username, password=request.POST['password1'])
            
            if user is not None:
                login(request, user)
                return redirect('Home')
        
        
    context = {'form': form, 'page': page}
    return render(request, 'Main/Login-Register.html', context)


def Index(request):
    return render(request, 'Main/Index.html')

@login_required(login_url='Login')
def AboutMe(request):
    return render(request, 'Main/About me.html')

@login_required(login_url='Login')
def AddOns(request):
    return render(request, 'Main/Add-ons.html')

@login_required(login_url='Login')
def Home(request):
    return render(request, 'Main/Home.html')

from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def OrderForm(request):
    
    data = cartData(request)
    cartItems = data['cartItems']
    order = data['order']
    items = data['items']
        
    context ={'items': items, 'order': order, 'cartItems': cartItems}
    return render(request, 'Main/CheckOut.html', context)

def Store(request):
    
    data = cartData(request)
    cartItems = data['cartItems']
  
    products = Product.objects.all()
    context ={'products': products, 'cartItems': cartItems}
    return render(request, 'Main/Store.html', context)

from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def Cart(request):
    
    data = cartData(request)
    cartItems = data['cartItems']
    order = data['order']
    items = data['items']
        
    context ={'items': items, 'order': order, 'cartItems': cartItems}
    return render(request, 'Main/Cart.html', context)

from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def updateItem(request):
    data = json.loads(request.body)
    productId = data['productId']
    action = data['action']
    
    
    print('Action:', action)
    print('productId:', productId)
    
    customer = request.user.customer
    product = Product.objects.get(id=productId)
    order, created = Order.objects.get_or_create(customer=customer, complete=False)
    
    orderItem, created = OrderItem.objects.get_or_create(order=order, product=product)
    
    if action == 'add':
        orderItem.quantity = (orderItem.quantity + 1)
    elif action == 'remove':
        orderItem.quantity = (orderItem.quantity - 1)
        
    orderItem.save()
    
    if orderItem.quantity <= 0:
        orderItem.delete()
    
    return JsonResponse('Item was added', safe=False)

from django.views.decorators.csrf import csrf_exempt # type: ignore 
@csrf_exempt
def processOrder(request):
    transaction_id = datetime.datetime.now().timestamp()
    data = json.loads(request.body)
    
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
         
    
    else:
        customer, order = guestOrder(request, data)
                             
        total = float(data['form']['total'])
        order.transaction_id = transaction_id
            
        if total == float(order.get_cart_total):
            order.complete = True
        order.save() 
        
        if order.shipping == True:
            ShippingAddress.objects.create(
                customer=customer,
                order=order,
                address=data['shipping']['address'],
                city=data['shipping']['city'],
                state=data['shipping']['state'],
                zipcode=data['shipping']['zipcode'],
                )  
                               
    return JsonResponse('Payment Complete!', safe=False)