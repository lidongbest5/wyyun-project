# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.shortcuts import render_to_response
from guozu.models import *
from django.db.models import Q
import datetime
from django import forms
from django.utils import simplejson as json
import requests
from PIL import Image, ImageOps, ImageDraw
import urllib2,urllib,cStringIO
import random,time,hashlib
import base64
from ServerAPI import ServerAPI
from django.core import serializers
import os
from PIL import Image, ImageOps, ImageDraw, ImageFont, ExifTags
import geoip2.database
import textwrap

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

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def add_corners(im, rad):
    circle = Image.new('L', (rad * 2, rad * 2), 0)
    draw = ImageDraw.Draw(circle)
    draw.ellipse((0, 0, rad * 2, rad * 2), fill=255)
    alpha = Image.new('L', im.size, 100)
    w, h = im.size
    alpha.paste(circle.crop((0, 0, rad, rad)), (0, 0))
    alpha.paste(circle.crop((0, rad, rad, rad * 2)), (0, h - rad))
    alpha.paste(circle.crop((rad, 0, rad * 2, rad)), (w - rad, 0))
    alpha.paste(circle.crop((rad, rad, rad * 2, rad * 2)), (w - rad, h - rad))
    im.putalpha(alpha)
    return im

def guozuIndex(request):
	return render_to_response('guozu/index.html',{'random': random.randrange(0, 10)})

def guozuSaveImage(request):
    # if request.is_ajax():
	# 	img = request.POST.get("img")
	# 	openid = request.POST.get("openid")
    #     file = cStringIO.StringIO(urllib.urlopen(img).read())
    #     im = Image.open(file)
    #     im.thumbnail((100, 100), Image.ANTIALIAS)
    #     im.save("/home/project/project/template/guozu/upload/wx_"+openid+".png")
    return HttpResponse('1')

def guozuImage(request):
    ba = Image.open("/Users/dongli/Documents/Outsourcing/project/project/template/guozu/images/logo.png")
    im = Image.open('/Users/dongli/Documents/Outsourcing/project/project/template/guozu/images/test.png')
    bg = Image.open('/Users/dongli/Documents/Outsourcing/project/project/template/guozu/images/img.png')
    ba.paste(im, (199,85))
    ba.paste(bg, (199,85), mask=bg)
    draw = ImageDraw.Draw(ba)
    font = ImageFont.truetype("/Users/dongli/Documents/Outsourcing/project/project/template/guozu/font.ttf", 20)
    font1 = ImageFont.truetype("/Users/dongli/Documents/Outsourcing/project/project/template/guozu/font.ttf", 34)
    font2 = ImageFont.truetype("/Users/dongli/Documents/Outsourcing/project/project/template/guozu/font.ttf", 30)
    draw.text((194, 401),"123213",(255,240,8),font=font)
    draw.text((75, 230),unicode('只要血液一天是红色的，','utf-8'),(255,255,255),font=font1)
    draw.text((110, 290),unicode('心就一天是国足的！','utf-8'),(255,255,255),font=font1)
    draw.text((50, 230),unicode('赢了一起狂，输了一起扛！','utf-8'),(255,255,255),font=font1)
    draw.text((180, 290),unicode('国足雄起！','utf-8'),(255,255,255),font=font1)
    draw.text((110, 230),unicode('昆明，你能为我们','utf-8'),(255,255,255),font=font1)
    draw.text((90, 290),unicode('带来第一场胜利吗？！','utf-8'),(255,255,255),font=font1)
    draw.text((130, 230),unicode('莫愁长征无知己，','utf-8'),(255,255,255),font=font1)
    draw.text((60, 290),unicode('天涯海角永相随！国足必胜！','utf-8'),(255,255,255),font=font2)
    draw.text((55, 230),unicode('国足，我们真的不想再失望！','utf-8'),(255,255,255),font=font2)
    draw.text((90, 290),unicode('拿出斗志，拿下一场！','utf-8'),(255,255,255),font=font1)
    ba.save("/Users/dongli/Documents/Outsourcing/project/project/template/guozu/images/new.png")
    return HttpResponse(1)

def guozuGetUserInfo(request):
	if request.is_ajax():
		code = request.POST.get("code")
		r = requests.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx7dfb9e650ce540b1&secret=538b5277fe1d37660ed4b218f7057c86&code='+code+'&grant_type=authorization_code')
		access_token = json.loads(r.text)['access_token']
		openid = json.loads(r.text)['openid']
		q = requests.get('https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN ')
		q.encoding = 'utf-8'
		return HttpResponse(json.dumps({"nickname": json.loads(q.text)['nickname'], "openid": json.loads(q.text)['openid']}))

def guozuSubmit(request):
	if request.is_ajax():
		ip = get_client_ip(request)
		try:
			reader = geoip2.database.Reader('/Users/dongli/Documents/Outsourcing/project/project/template/guozu/GeoLite2-City.mmdb')
			r = reader.city(ip)
			city = r.city.names.get('zh-CN', '')
		except:
			city = u"北京"
		return HttpResponse(city)
		# img = request.POST.get('img')
		# word = request.POST.get('word')
		# name = request.POST.get('name')
		# openid = request.POST.get('openid')
		# p = GuozuRecord(openid=openid, name=name, city=city, image=img, word=word, date=datetime.datetime.now())
		# p.save()
		# if GuozuCity.objects.filter(name=city).count():
		# 	count = GuozuCity.objects.get(name=city).count
		# 	GuozuCity.objects.filter(name=city).update(count=count+1)
		# else:
		# 	p = GuozuCity(name=city, count=1)
		# 	p.save()
		# return HttpResponse(json.dumps({"city": city, "record": serializers.serialize('json', GuozuRecord.objects.filter(openid=openid).order_by('-id'))}))

def guozuGetCode(request):
	if request.is_ajax():
		phone = request.POST.get('phone')
		AppKey = '1a9c8ee74f8ba02ddfe5c934d83a4cb5';
		AppSecret = '0f1e0d91b368';
		p = ServerAPI(AppKey,AppSecret, UseSSLLib = True);
		a = p.sendSmsCode(phone,'')
		return HttpResponse(a['obj']);

def guozuGetMsg(request):
	if request.is_ajax():
		phone = request.POST.get('phone')
		count = GuozuCount.objects.get(id=1).count
		count = count + 1
		GuozuCount.objects.filter(id=1).update(count=count)
		number = GuozuList.objects.get(id=count).number
		AppKey = '1a9c8ee74f8ba02ddfe5c934d83a4cb5';
		AppSecret = '0f1e0d91b368';
		p = ServerAPI(AppKey,AppSecret, UseSSLLib = True);
		return HttpResponse(number);

def guozuGetData(request):
	if request.is_ajax():
		openid = request.POST.get('openid')
		serialized_obj1 = serializers.serialize('json', GuozuCity.objects.all().order_by('-count'))
		if GuozuRecord.objects.filter(openid=openid).count():
			record = serializers.serialize('json', GuozuRecord.objects.filter(openid=openid).order_by('-id'))
			rtype = 1
		else:
			record = serializers.serialize('json', GuozuRecord.objects.all().order_by('-id')[0:10])
			rtype = 2
		data = serializers.serialize('json', GuozuRecord.objects.all().order_by('-id')[0:10])
		return HttpResponse(json.dumps({"city": serialized_obj1, "record": record, "data": data, "total": GuozuRecord.objects.all().count(), "type": rtype}))

def guozuUpload(request):
	if request.method == 'POST':
		imageid = request.POST.get('openid')
		file_ext = request.FILES['file'].name.split('.')[1]
		user_upload_folder =  '/Users/dongli/Documents/Outsourcing/project/project/template/guozu/upload/'
		file_upload = open( os.path.join(user_upload_folder, imageid+'.'+file_ext), 'w')
		file_upload.write(request.FILES['file'].read())
		file_upload.close()
		im = Image.open(os.path.join(user_upload_folder, imageid+'.'+file_ext))
		orientation = 274
		try:
			exif = im._getexif()
			if exif:
				exif = dict(exif.items())
				if exif[orientation] == 3:
					im = im.rotate(180, expand=True)
				elif exif[orientation] == 6:
					im = im.rotate(270, expand=True)
				elif exif[orientation] == 8:
					im = im.rotate(90, expand=True)
		except:
			pass
		im.thumbnail((100, 100), Image.ANTIALIAS)
		im.save(os.path.join(user_upload_folder, 'm_'+imageid+'.'+file_ext))
		return HttpResponse(imageid+'.'+file_ext)

def clipResizeImg(**args):

    args_key = {'ori_img':'','dst_img':'','dst_w':'','dst_h':'','save_q':100}
    arg = {}
    for key in args_key:
        if key in args:
            arg[key] = args[key]

    im = Image.open(arg['ori_img'])
    ori_w,ori_h = im.size

    dst_scale = float(arg['dst_h']) / arg['dst_w']
    ori_scale = float(ori_h) / ori_w

    if ori_scale >= dst_scale:
        width = ori_w
        height = int(width*dst_scale)

        x = 0
        y = (ori_h - height) / 3

    else:
        height = ori_h
        width = int(height*dst_scale)

        x = (ori_w - width) / 2
        y = 0

    box = (x,y,width+x,height+y)

    newIm = im.crop(box)
    im = None

    ratio = float(arg['dst_w']) / width
    newWidth = int(width * ratio)
    newHeight = int(height * ratio)
    newIm.resize((newWidth,newHeight),Image.ANTIALIAS).save(arg['dst_img'],quality=arg['save_q'])
