from django.db import models
import datetime

class GuozuCity(models.Model):
	name = models.CharField(max_length=256,blank=True,null=True)
	count = models.IntegerField()
	def __unicode__(self):
		return self.name

class GuozuRecord(models.Model):
	openid = models.CharField(max_length=256,blank=True,null=True)
	name = models.CharField(max_length=256,blank=True,null=True)
	city = models.CharField(max_length=256,blank=True,null=True)
	image = models.CharField(max_length=256,blank=True,null=True)
	word = models.CharField(max_length=256,blank=True,null=True)
	phone = models.CharField(max_length=256,blank=True,null=True)
	validate = models.BooleanField(default=False)
	date = models.DateTimeField(blank=True,null=True)
	def __unicode__(self):
		return self.name

class GuozuList(models.Model):
	number = models.CharField(max_length=256,blank=True,null=True)
	pwd = models.CharField(max_length=256,blank=True,null=True)
	def __unicode__(self):
		return self.number

class GuozuCount(models.Model):
	count = models.IntegerField()
	def __unicode__(self):
		return self.count
