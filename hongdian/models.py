from django.db import models
import datetime

class Prize(models.Model):
    amount1 = models.IntegerField()
    amount2 = models.IntegerField()
    amount3 = models.IntegerField()
    amount4 = models.IntegerField()
    rate1 = models.IntegerField()
    rate2 = models.IntegerField()
    rate3 = models.IntegerField()
    rate4 = models.IntegerField()
    def __unicode__(self):
        return str(self.rate1)

class Award(models.Model):
	phone = models.CharField(max_length=256,blank=True,null=True)
	award_time = models.DateTimeField(blank=True,null=True)
	award_type = models.IntegerField()
	name = models.CharField(max_length=256,blank=True,null=True)
	phone1 = models.CharField(max_length=256,blank=True,null=True)
	address = models.CharField(max_length=256,blank=True,null=True)
	code = models.CharField(max_length=256,blank=True,null=True)
	def __unicode__(self):
		return str(self.phone)
