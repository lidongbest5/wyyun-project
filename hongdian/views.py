# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.shortcuts import render_to_response
from hongdian.models import *
import datetime
import time
import random
import json
import  urllib2
import string
import hashlib
import requests
import os
from django.core import serializers
import csv

class Sign:
    def __init__(self, appId, appSecret, url):
        self.appId = appId
        self.appSecret = appSecret

        self.ret = {
            'nonceStr': self.__create_nonce_str(),
            'jsapi_ticket': self.getJsApiTicket(),
            'timestamp': self.__create_timestamp(),
            'url': url
        }

    def __create_nonce_str(self):
        return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(15))

    def __create_timestamp(self):
        return int(time.time())

    def sign(self):
        string = '&'.join(['%s=%s' % (key.lower(), self.ret[key]) for key in sorted(self.ret)])
        print string
        self.ret['signature'] = hashlib.sha1(string).hexdigest()
        return self.ret

    def getJsApiTicket(self):
        data = json.loads(open(os.getcwd()+'/jsapi_ticket.json').read())
        jsapi_ticket = data['jsapi_ticket']
        if data['expire_time'] < time.time():
            url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=%s" % (self.getAccessToken())
            response = requests.get(url)
            jsapi_ticket = json.loads(response.text)['ticket']
            data['jsapi_ticket'] = jsapi_ticket
            data['expire_time'] = int(time.time()) + 7000
            fopen = open('jsapi_ticket.json', 'w')
            fopen.write(json.dumps(data))
            fopen.close()
        return jsapi_ticket

    def getAccessToken(self):
        data = json.loads(open(os.getcwd()+'/access_token.json').read())
        access_token = data['access_token']
        if data['expire_time'] < time.time():
            url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s" % (self.appId, self.appSecret)
            response = requests.get(url)
            access_token = json.loads(response.text)['access_token']
            data['access_token'] = access_token
            data['expire_time'] = int(time.time()) + 7000
            fopen = open('access_token.json', 'w')
            fopen.write(json.dumps(data))
            fopen.close()
        return access_token

def hongdianIndex(request):
    appId = 'wx7dfb9e650ce540b1'
    appSecret = '538b5277fe1d37660ed4b218f7057c86'
    sign = Sign(appId, appSecret, 'http://ex.wyyun.com'+request.get_full_path())
    return render_to_response('hongdian/index.html',{"data": sign.sign()})

def hongdianList(request):
	if request.is_ajax():
		serialized_obj = serializers.serialize('json', Award.objects.all().order_by('-id')[0:10])
		return HttpResponse(serialized_obj)

def hongdianPrize(request):
	if request.is_ajax():
		amount1 = Prize.objects.get(id=1).amount1
		amount2 = Prize.objects.get(id=1).amount2
		amount3 = Prize.objects.get(id=1).amount3
		amount4 = Prize.objects.get(id=1).amount4
		rate1 = Prize.objects.get(id=1).rate1
		rate2 = Prize.objects.get(id=1).rate2
		rate3 = Prize.objects.get(id=1).rate3
		rate4 = Prize.objects.get(id=1).rate4
		number = random.randrange(0, 1000)
		if amount4 > 0 and number < rate4:
			return HttpResponse(json.dumps({"code": 1, "award": 4}))
		elif amount3 > 0 and number < rate3:
			return HttpResponse(json.dumps({"code": 1, "award": 3}))
		elif amount2 > 0 and number < rate2:
			return HttpResponse(json.dumps({"code": 1, "award": 2}))
		elif amount1 > 0 and number < rate1:
			return HttpResponse(json.dumps({"code": 1, "award": 1}))
		else:
			return HttpResponse(json.dumps({"code": 1, "award": 0}))

def hongdianGetcode(request):
	if request.is_ajax():
		phone = request.POST.get('phone')
		response = urllib2.urlopen('http://red.wyyun.com/carinfo/mobile/news/sendCode?moblieNumber='+phone)
		html = response.read()
		return HttpResponse(html)

def hongdianCheckcode(request):
	if request.is_ajax():
		phone = request.POST.get('phone')
		code = request.POST.get('code')
		response = urllib2.urlopen('http://red.wyyun.com/carinfo/mobile/news/moblieLogin?moblieNumber='+phone+'&code='+code)
		html = response.read()
		return HttpResponse(html)

def hongdianSetcode(request):
	if request.is_ajax():
		phone = request.POST.get('phone')
		awardtype = request.POST.get('type')
		if Award.objects.filter(phone=phone).count():
			return HttpResponse(json.dumps({"code": 0}))
		else:
			p = Award(phone=phone,award_type=awardtype,award_time=datetime.datetime.now())
			p.save()
			amount1 = Prize.objects.get(id=1).amount1
			amount2 = Prize.objects.get(id=1).amount2
			amount3 = Prize.objects.get(id=1).amount3
			amount4 = Prize.objects.get(id=1).amount4
			if awardtype == 1:
				Prize.objects.filter(id=1).update(amount1=amount1-1)
			elif awardtype == 2:
				Prize.objects.filter(id=1).update(amount2=amount2-1)
			elif awardtype == 3:
				Prize.objects.filter(id=1).update(amount3=amount3-1)
			elif awardtype == 4:
				Prize.objects.filter(id=1).update(amount4=amount4-1)
			return HttpResponse(json.dumps({"code": 1}))
		return HttpResponse(html)

def hongdianSetdata(request):
	if request.is_ajax():
		phone = request.POST.get('phone')
		address = request.POST.get('address')
		name = request.POST.get('name')
		p = request.POST.get('p')
		Award.objects.filter(phone=p).update(name=name,address=address,phone1=phone)
		return HttpResponse(json.dumps({"code": 1}))

def hongdianGetdata(request):
	if request.is_ajax():
		phone = request.POST.get('phone')
		serialized_obj = serializers.serialize('json', Award.objects.filter(phone=phone))
		return HttpResponse(serialized_obj)
