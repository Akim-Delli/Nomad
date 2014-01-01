define(['NomadView', 'text!templates/profile.html','text!templates/status.html', 'models/Status', 'views/status'],
	function( NomadView, profielTemplate,	statusTemplate, Status, StatusView) {
		var profileView = NomadView.extend({
			el: $('#content'),

			initialize: function () {
				this.model.bind('change', this.render, this);
			},

			events: {
				"submit form": "postStatus"
			},

			postStatus: function() {
				var that = this;
				var statusText = $('input[name=status]').val();
				var statusCollection = this.collection;
				$.post('/accounts/' + this.model.get('_id') + '/status', {
					status: statusText
				}, function(data) {
					that.prependStatus(new Status({status:statusText}));
				});
				return false;
			},

			prependStatus: function(statusModel) {
				var statusHtml = (new StatusView({model: statusModel})).render().el;
				$(statusHtml).prependTo('.status_list').hide().fadeIn('slow');
			},

			render: function() {
				var that = this;
				this.$el.html(
					_.template(profielTemplate, this.model.toJSON())
				);

				var statusCollection = this.model.get('status');
				if( null !== statusCollection ) {
					_.each(statusCollection, function ( statusJson) {
						var statusModel = new Status(statusJson);
						that.prependStatus(statusModel);
					});
				}
			}
	});

	return profileView;
});