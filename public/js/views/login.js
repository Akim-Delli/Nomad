define(['NomadView','text!templates/login.html'], function(NomadView,loginTemplate) {
	var loginView = NomadView.extend({
		requireLogin: false,

		el: $('#content'),

		events: {
			"submit form" : "login"
		},

		initialize: function(options) {
			this.socketsEvents = options.socketsEvents;
		},

		login: function() {
			var socketsEvents = this.socketsEvents;
			$.post('/login', {
				email: $('input[name=email]').val(),
				password: $('input[name=password]').val(),
			}, function(data){
				//socketsEvents.trigger('app:loggedin');
				window.location.hash = 'index';
			}).error(function() {
				$("#error").text('Unable to login.');
				$("#error").slideDown();
			});
			return false;
		},

		render: function() {
			this.$el.html(loginTemplate);
			$("#error").hide();
			$("input[name=email]").focus();
		}
	});

	return loginView;
});