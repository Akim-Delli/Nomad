define(['views/index', 'views/register', 'views/login', 'views/forgotpassword', 'views/profile','views/contacts','views/addcontact', 'models/Account', 'models/StatusCollection', 'models/ContactCollection'],
	function(IndexView, RegisterView, LoginView, ForgotPasswordView, ProfileView, ContactsView, AddContactView, Account, StatusCollection, ContactCollection) {
		var NomadRouter = Backbone.Router.extend({
			currentView: null,

			routes: {
				"addcontact": "addcontact",
				"index": "index",
				"login": "login",
				"register": "register",
				"forgotpassword": "forgotpassword",
				"profile/:id": "profile",
				"contacts/:id": "contacts"
			},

			changeView: function(view) {
				if( null != this.currentView) {
					this.currentView.undelegateEvents();
				}
				this.currentView = view;
				this.currentView.render();
			},

			index: function() {
				var statusCollection = new StatusCollection();
				statusCollection.url = '/accounts/me/activity';
				this.changeView(new IndexView({
					collection: statusCollection
				}));
				statusCollection.fetch();
			},

			login: function() {
				this.changeView(new LoginView());
			},

			forgotpassword: function() {
				this.changeView(new ForgotPasswordView());
			},

			register: function() {
				this.changeView(new RegisterView());
			},

			profile: function(id) {
				var model = new Account({id:id});
				this.changeView(new ProfileView({model:model}));
				model.fetch();
			},

			 addcontact: function() {
      			this.changeView(new AddContactView());
    		},

			contacts: function(id) {
				var contactId = id ? id : 'me';
				var contactsCollection = new ContactCollection();
				contactsCollection.url = '/accounts/' + contactId + '/contacts';
				this.changeView(new ContactsView({
					collection: contactsCollection
				}));
				contactsCollection.fetch();
			}
		});

	return new NomadRouter();
});