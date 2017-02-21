from django.db import models
import datetime

class LifanItem(models.Model):
	name = models.CharField(max_length=128)
	desc = models.CharField(max_length=256,blank=True,null=True)
	types = models.IntegerField()
	is_show = models.IntegerField(default=1)
	img1 = models.CharField(max_length=256,blank=True,null=True)
	img2 = models.CharField(max_length=256,blank=True,null=True)
	img3 = models.CharField(max_length=256,blank=True,null=True)
	img4 = models.CharField(max_length=256,blank=True,null=True)
	img5 = models.CharField(max_length=256,blank=True,null=True)
	img6 = models.CharField(max_length=256,blank=True,null=True)
	img7 = models.CharField(max_length=256,blank=True,null=True)
	img8 = models.CharField(max_length=256,blank=True,null=True)
	img9 = models.CharField(max_length=256,blank=True,null=True)
	video = models.CharField(max_length=256,blank=True,null=True)
	gameImg = models.CharField(max_length=256,blank=True,null=True)
	gameTitle = models.CharField(max_length=128,blank=True,null=True)
	gameLink = models.CharField(max_length=256,blank=True,null=True)
	newsImg = models.CharField(max_length=256,blank=True,null=True)
	newsTitle = models.CharField(max_length=256,blank=True,null=True)
	newsContent = models.TextField(blank=True,null=True)
	time = models.DateTimeField(blank=True,null=True)
	def __unicode__(self):
		return self.name

class LifanComment(models.Model):
	itemId = models.IntegerField()
	content = models.TextField(blank=True,null=True)
	time = models.DateTimeField(blank=True,null=True)
	def __unicode__(self):
		return self.content

class Visa(models.Model):
	companyCode = models.CharField(max_length=128,blank=True,null=True)
	name = models.CharField(max_length=256,blank=True,null=True)
	phone = models.CharField(max_length=256,blank=True,null=True)
	email = models.CharField(max_length=256,blank=True,null=True)
	country = models.CharField(max_length=256,blank=True,null=True)
	amount = models.CharField(max_length=256,blank=True,null=True)
	people = models.CharField(max_length=256,blank=True,null=True)
	def __unicode__(self):
		return self.name

class VisaTelecom(models.Model):
	companyCode = models.CharField(max_length=128,blank=True,null=True)
	name = models.CharField(max_length=256,blank=True,null=True)
	phone = models.CharField(max_length=256,blank=True,null=True)
	email = models.CharField(max_length=256,blank=True,null=True)
	country = models.CharField(max_length=256,blank=True,null=True)
	amount = models.CharField(max_length=256,blank=True,null=True)
	people = models.CharField(max_length=256,blank=True,null=True)
	def __unicode__(self):
		return self.name
