# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.shortcuts import render_to_response
from hongdian_lottery.models import *
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


def hongdianLotteryIndex(request):
    return render_to_response('hongdian_lottery/index.html', {})

def hongdianLotterySetData(request):
	if request.is_ajax():
		phone = request.POST.get('phone')
		address = request.POST.get('address')
		name = request.POST.get('name')
        if Award.objects.filter(phone=phone).count():
			return HttpResponse(json.dumps({"code": 0}))
        else:
            p = Award(phone=phone,name=name,address=address)
            p.save()
            return HttpResponse(json.dumps({"code": 1}))

def hongdianLotteryGetPrize(request):
    if request.is_ajax():
        phone = request.POST.get('phone')
        amount1 = Prize.objects.get(id=1).amount1
        amount2 = Prize.objects.get(id=1).amount2
        amount3 = Prize.objects.get(id=1).amount3
        amount4 = Prize.objects.get(id=1).amount4
        amount5 = Prize.objects.get(id=1).amount5
        rate1 = Prize.objects.get(id=1).rate1
        rate2 = Prize.objects.get(id=1).rate2
        rate3 = Prize.objects.get(id=1).rate3
        rate4 = Prize.objects.get(id=1).rate4
        number = random.randrange(0, 100)
        r = str(phone)[-4:] + str(random.randint(1111,9999))
        if amount5%2 == 1:
            winType = 5
        else:
            if amount1 < 1 and amount2 < 1 and amount3 < 1 and amount4 < 1:
                winType = 5
            else:
                if number < rate1:
                    if amount1 > 0:
                        winType = 1
                    elif amount4 > 0:
                        winType = 4
                    elif amount3 > 0:
                        winType = 3
                    elif amount2 > 0:
                        winType = 2
                elif number < rate2:
                    if amount2 > 0:
                        winType = 2
                    elif amount4 > 0:
                        winType = 4
                    elif amount3 > 0:
                        winType = 3
                    elif amount1 > 0:
                        winType = 1
                elif number < rate3:
                    if amount3 > 0:
                        winType = 3
                    elif amount4 > 0:
                        winType = 4
                    elif amount2 > 0:
                        winType = 2
                    elif amount1 > 0:
                        winType = 1
                elif number < rate4:
                    if amount4 > 0:
                        winType = 4
                    elif amount3 > 0:
                        winType = 3
                    elif amount2 > 0:
                        winType = 2
                    elif amount1 > 0:
                        winType = 1

        if winType == 1:
            Prize.objects.filter(id=1).update(amount1=amount1-1)
        elif winType == 2:
            Prize.objects.filter(id=1).update(amount2=amount2-1)
        elif winType == 3:
            Prize.objects.filter(id=1).update(amount3=amount3-1)
        elif winType == 4:
            Prize.objects.filter(id=1).update(amount4=amount4-1)
        Prize.objects.filter(id=1).update(amount5=amount5+1)
        Award.objects.filter(phone=phone).update(award_type=winType, award_time=datetime.datetime.now(), code=r)
        if winType == 1:
            content = u'【红点汽车】恭喜您获得特等奖，兑奖密码为：'
        elif winType == 2:
            content = u'【红点汽车】恭喜您获得一等奖，兑奖密码为：'
        elif winType == 3:
            content = u'【红点汽车】恭喜您获得二等奖，兑奖密码为：'
        elif winType == 4:
            content = u'【红点汽车】恭喜您获得三等奖，兑奖密码为：'
        elif winType == 5:
            content = u'【红点汽车】恭喜您获得四等奖，兑奖密码为：'
        content = content.encode('gbk')
        content = urllib2.quote(content)
        content1 = u'，请凭此短信于2月18日活动结束后，在现场签到处与工作人员兑换奖品。'
        content1 = content1.encode('gbk')
        content1 = urllib2.quote(content1)
        response = urllib2.urlopen('http://kh.400service.com/ws/Send.aspx?CorpID=hongdian&Pwd=888888&Mobile='+phone+'&Content='+content+r+content1+'&Cell=&SendTime=')
        html = response.read()
        return HttpResponse(json.dumps({"code": 1, "award": winType, "code": html}))

def hongdianLotteryGetCode(request):
    if request.is_ajax():
        phone = request.POST.get('phone')
        if Award.objects.filter(phone1=phone).count():
            return HttpResponse(1)
        else:
            r = str(random.randint(1111,9999))
            request.session['code'] = r
            content = u'【红点汽车】您的短信验证码为：'
            content = content.encode('gbk')
            content = urllib2.quote(content)
            response = urllib2.urlopen('http://kh.400service.com/ws/Send.aspx?CorpID=hongdian&Pwd=888888&Mobile='+phone+'&Content='+content+r+'&Cell=&SendTime=')
            html = response.read()
            return HttpResponse(html)

def hongdianLotteryCheckCode(request):
	if request.is_ajax():
		phone = request.POST.get('phone')
		code = request.POST.get('code')
        if request.session.get('code',False):
            if request.session['code'] == code:
                return HttpResponse(json.dumps({"code": 1}))
            else:
                return HttpResponse(json.dumps({"code": 0}))
        else:
            return HttpResponse(json.dumps({"code": 0}))

def hongdianLotteryResult(request):
    data = Award.objects.exclude(award_type=0).order_by('-id')
    return render_to_response('hongdian_lottery/result.html', {"data": data})

def hongdianLotteryCheckPrize(request):
    if request.is_ajax():
        data = request.POST.get('data')
        Award.objects.filter(id=data).update(check=1)
        return HttpResponse(json.dumps({"code": 1}))
