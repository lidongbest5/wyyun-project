from django.conf.urls import patterns, include, url
from lifan.views import *
from guozu.views import *
from hongdian.views import *
from hongdian_lottery.views import *
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^project/admin/', include(admin.site.urls)),
    url(r'^project/lifan/$', lifanIndex),
    url(r'^project/lifan/setComment/$', lifanComment),
    url(r'^project/visa/$', visaIndex),
    url(r'^project/visa/info/$', visaInfo),
    url(r'^project/visa/export/$', visaExport),
    url(r'^project/visa/list/$', visaList),
    url(r'^project/visa_telecom/$', visaTelecomIndex),
    url(r'^project/visa_telecom/info/$', visaTelecomInfo),
    url(r'^project/visa_telecom/export/$', visaTelecomExport),
    url(r'^project/lesports_guozu/$', guozuIndex),
    url(r'^project/lesports_guozu/getUserInfo/$', guozuGetUserInfo),
    url(r'^project/lesports_guozu/submit/$', guozuSubmit),
    url(r'^project/lesports_guozu/getData/$', guozuGetData),
    url(r'^project/lesports_guozu/upload/$', guozuUpload),
    url(r'^project/lesports_guozu/getCode/$', guozuGetCode),
    url(r'^project/lesports_guozu/getMsg/$', guozuGetMsg),
    url(r'^project/lesports_guozu/guozuImage/$', guozuImage),
    url(r'^project/lesports_guozu/guozuSaveImage/$', guozuSaveImage),
    url(r'^project/hongdian/$', hongdianIndex),
    url(r'^project/hongdian/getList/$', hongdianList),
    url(r'^project/hongdian/getPrize/$', hongdianPrize),
    url(r'^project/hongdian/getCode/$', hongdianGetcode),
    url(r'^project/hongdian/checkCode/$', hongdianCheckcode),
    url(r'^project/hongdian/setCode/$', hongdianSetcode),
    url(r'^project/hongdian/setData/$', hongdianSetdata),
    url(r'^project/hongdian/getData/$', hongdianGetdata),
    url(r'^project/hongdian_lottery/$', hongdianLotteryIndex),
    url(r'^project/hongdian_lottery/setData/$', hongdianLotterySetData),
    url(r'^project/hongdian_lottery/getPrize/$', hongdianLotteryGetPrize),
    url(r'^project/hongdian_lottery/getCode/$', hongdianLotteryGetCode),
    url(r'^project/hongdian_lottery/checkCode/$', hongdianLotteryCheckCode),
    url(r'^project/hongdian_lottery/result/$', hongdianLotteryResult),
    url(r'^project/hongdian_lottery/checkPrize/$', hongdianLotteryCheckPrize),
)
