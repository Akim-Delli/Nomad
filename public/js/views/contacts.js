define(['NomadView', 'views/contact', 'text!templates/contacts.html'],
function(NomadView, ContactView, conctactsTemplate) {
	var contactsView = NomadView.extend({
		el: $('#content'),

		initialize: function() {
			this.collection.on('reset', this.renderCollection, this);
		},

		render: function() {
			this.$el.html(conctactsTemplate);
		},

		renderCollection: function(collection) {
			collection.each(function(contact) {
				var statusHtml = (new ContactView( 
									{ removeButton : true, model: contact }
									)).render().el;
				$(statusHtml).appendTo('.contacts_list');
			});
		}
	});

	return contactsView;
});