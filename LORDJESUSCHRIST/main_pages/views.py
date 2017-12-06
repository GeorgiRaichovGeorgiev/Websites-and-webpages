from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return HttpResponse('Hello')


def movies(request):
    pass


def music(request):
    pass


def elite(request):
    pass
