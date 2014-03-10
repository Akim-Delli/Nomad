define(['NomadView', 'text!templates/contact.html'],
	function(NomadView, contactTemplate) {
		var contactView = NomadView.extend({
			addButton: false,

			removeButton: false,

			tagName: 'li',

			events: {
				"click .addbutton" : "addContact",
				"click .removebutton": "removeContact"
			},

			addContact: function() {
				var $responseArea = this.$('.actionarea');
				$.post('/accounts/me/contact',
					{contactId : this.model.get('_id')},
					function onSuccess() {
						$responseArea.text('Contact Added');
					}, function onError() {
						$responseArea.text('Could not add contact');
					}
				);
			},

			removeContact: function() {
      			var $responseArea = this.$('.actionarea');
		    	$responseArea.text('Removing contact...');
		    	$.ajax({
		        	url: '/accounts/me/contact',
			        type: 'DELETE',
			        data: {
			          contactId: this.model.get('accountId'),
			          fakedata : "test"
			        }}).done(function onSuccess() {
			          $responseArea.text('Contact Removed');
			          console.log('trying to delete account: ', contactId);
			        }).fail(function onError() {
			          $responseArea.text('Could not remove contact');
			          console.log('trying to delete account: ', contactId);
		        }) .always(function() {
console.log('trying to delete account: ', contactId);
});;
		    },

			initialize: function() {
				//this.options = options || {};
				//set the addButton variable in case it has been added in the contsructor
				if (this.options.addButton) {
					this.addButton = this.options.addButton;
				}

				if( this.options.removeButton) {
					this.removeButton = this.options.removeButton;
				}
			},

			render: function() {

				// var templ = _.template('<li><%= model.accountId %></li>', {
    //     			model: this.model.toJSON(),
    //     			addButton: this.addButton,
    //     			removeButton: this.removeButton
    //   			});

				// console.log('render Contact View , model :',templ );
      			$(this.el).html(_.template(contactTemplate, {
        			model: this.model.toJSON(),
        			addButton: this.addButton,
        			removeButton: this.removeButton
      			}));
      			return this;
    		}
		});

		return contactView;
});