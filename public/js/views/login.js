define(['text!templates/login.html'], function(loginTemplate) {
	var loginView = Backbone.View.extend({
		el: $('#content'),

		events: {
			"submit form" : "login"
		},

		register: function() {
			$.post('/register', {
				email: $('input[name=firstName').val(),
				password: $('input[name=lastname').val(),
			}, function(data){
				console.log(data);
			}).error(function() {
				$("#error").text('Unable to login.');
				$("#error").slideDown();
			});
			return false;
		},

		render: function() {
			this.$el.html(loginTemplate);
		}
	});

	return loginView;
});