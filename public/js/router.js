define(['views/index', 'views/register', 'views/login', 'views/forgotpassword'],
	function(IndexView, RegisterView, LoginView, ForgotPasswordView) {
		var NomadRouter = Backbone.Router.extend({
			currentView: null,

			routes: {
				"index": "index",
				"login": "login",
				"register": "register",
				"forgotpassword": "forgotpassword"
			},

			changeView: function(view) {
				if( null!== this.currentView) {
					this.currentView.undelegateEvents();
				}
				this.currentView = view;
				this.currentView.render();
			},

			index: function() {
				this.changeView(new IndexView());
			},

			login: function() {
				this.changeView(new LoginView());
			},

			forgotpassword: function() {
				this.changeView(new ForgotPasswordView());
			},

			register: function() {
				this.changeView(new RegisterView());
			}
		});

	return new NomadRouter();
});