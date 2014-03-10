define(['NomadView', 'views/contact', 'text!templates/contacts.html'],
function(NomadView, ContactView, contactsTemplate) {
	var contactsView = NomadView.extend({
		el: $('#content'),


		initialize: function() {
			
			this.collection.on('reset', this.renderCollection, this);
		},

		render: function() {
			this.$el.html(contactsTemplate);
		},

		renderCollection: function(collection) {
			console.log('entering renderCollection', collection);
			
			$('.contacts_list').empty();
			var inc = 0;
      		collection.each(function(contact) {
        		var statusHtml = (new ContactView({ removeButton: true, model: contact })).render().el;     		
        		$(statusHtml).appendTo('#contacts_list');
      		});
		}
	});

	return contactsView;
});