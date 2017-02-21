# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.shortcuts import render_to_response
from lifan.models import *
from django.db.models import Q
import datetime
import time
from django import forms
from django.utils import simplejson as json
import requests
import csv

def lifanIndex(request):
	items = LifanItem.objects.filter(is_show=1).order_by('-time')
	for item in items:
		item.comments = LifanComment.objects.filter(itemId=item.id).order_by('-time')
	return render_to_response('lifan/index.html',{'data':items})

def lifanComment(request):
	if request.is_ajax():
		itemId = request.POST.get("id")
        content = request.POST.get("val")
        time =	datetime.datetime.now()
        p = LifanComment(itemId=itemId, content=content, time=time)
        p.save()
        return HttpResponse(json.dumps({"code":1}))

def visaIndex(request):
	return render_to_response('visa/index.html')

def visaInfo(request):
	if request.is_ajax():
		companyCode = request.POST.get("companyCode")
		name = request.POST.get("name")
		phone = request.POST.get("phone")
		email = request.POST.get("email")
		country = request.POST.get("country")
		amount = request.POST.get("amount")
		people = request.POST.get("people")
		p = Visa(companyCode=companyCode, name=name, phone=phone, email=email, country=country,amount=amount,people=people)
		p.save()
		return HttpResponse(json.dumps({"code":1}))

def visaExport(request):
	response = HttpResponse(content_type='text/csv')
	response['Content-Disposition'] = 'attachment; filename="visa_export.csv"'
	writer = csv.writer(response)
	writer.writerow(['ID', '渠道号', '姓名', '电话', 'Email', '国家', '人数', '同行人'])
	data = Visa.objects.all()
	for filed in data:
		writer.writerow([filed.id, filed.companyCode, filed.name.encode('utf-8'), filed.phone, filed.email, filed.country.encode('utf-8'), filed.amount, filed.people.encode('utf-8')])
	return response

def visaList(request):
	return render_to_response('visa/list.html', {'data': Visa.objects.all()})

def visaTelecomIndex(request):
	return render_to_response('visa1/index.html')

def visaTelecomInfo(request):
	if request.is_ajax():
		companyCode = request.POST.get("companyCode")
		name = request.POST.get("name")
		phone = request.POST.get("phone")
		email = request.POST.get("email")
		country = request.POST.get("country")
		amount = request.POST.get("amount")
		people = request.POST.get("people")
		p = VisaTelecom(companyCode=companyCode, name=name, phone=phone, email=email, country=country,amount=amount,people=people)
		p.save()
		return HttpResponse(json.dumps({"code":1}))

def visaTelecomExport(request):
	response = HttpResponse(content_type='text/csv')
	response['Content-Disposition'] = 'attachment; filename="visa_export.csv"'
	writer = csv.writer(response)
	writer.writerow(['ID', '渠道号', '姓名', '电话', 'Email', '国家', '人数', '同行人'])
	data = VisaTelecom.objects.all()
	for filed in data:
		writer.writerow([filed.id, filed.companyCode, filed.name.encode('utf-8'), filed.phone, filed.email, filed.country.encode('utf-8'), filed.amount, filed.people.encode('utf-8')])
	return response

def visaTelecomList(request):
	return render_to_response('visa1/list.html', {'data': VisaTelecom.objects.all()})
