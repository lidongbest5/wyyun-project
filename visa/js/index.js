"use strict";

(function() {
	var $page1 = $('.page1'),
		$page2 = $('.page2'),
		$page3 = $('.page3'),
		$page4 = $('.page4'),

		init = function() {

			bindEventListener();
		},

		onStart = function() {
			$page1.hide();
			$page2.show();
		},

		onNext = function() {
			if (!$('.companyCode').val().length) {
				alert('请输入企业验证码');
			} else {
				$page2.hide();
				$page3.show();
			}
		},

		onSubmit = function() {
			var companyCode = $('.companyCode').val(),
				name = $('.name').val(),
				phone = $('.phone').val(),
				email = $('.email').val(),
				country = $('.country').val(),
				amount = $('.amount').val(),
				people = $('.people').val(),
				checked = true;

			if (!name.length) {
				alert('请输入姓名');
				checked = false;
			} else if (!phone.length) {
				alert('请输入联系电话');
				checked = false;
			} else if (!email.length) {
				alert('请输入电子邮箱');
				checked = false;
			} else if (!country.length) {
				alert('请输入签证国家');
				checked = false;
			} else if (!amount.length) {
				alert('请输入办理人数');
				checked = false;
			}

			if (checked) {
				$.ajax({
					url: '/visa/info/',
					type: 'POST',
					data: {
						companyCode: companyCode,
						name: name,
						phone: phone,
						email: email,
						country: country,
						amount: amount,
						people: people
					},
					success: function() {
						$page3.hide();
						$page4.show();
					}
				});
			}
		},

		bindEventListener = function() {
			$('.b1').one('touchend', onStart);
			$('.b2').on('touchend', onNext);
			$('.b3').on('touchend', onSubmit);
		};

	$(init);
})();
