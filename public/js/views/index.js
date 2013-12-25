define(['NomadView', 'text!templates/index.html', 'view/status', 'models/status'],
	function(NomadView, indexTemplate, StatusView, Status) {
	var indexView = NomadView.extend({
		el: $('#content'),

		events: {
			"submit form" : "upadteStatus"
		},

		initialize: function() {
			this.collection.on('add', this.onStatusAdded, this);
			this.collection.on('reset', this.onStatusCollectionReset, this);
		},

		onStatusCollectionReset: function(collection) {
			var that = this;
			collection.each(function (model) {
				that.onStatusAdded(model);
			});
		},

		onStatusAdded: function() {
			var statusHtml = (new StatusView({ model: status})).render().el;
			$statusHtml.prependTo('.status_list').hide.fadeIn('slow');
		},

		updateStatus: function() {
			var statusText = $('input[name=status]').val();
			var statusCollection = this.collection;
			$.post('/accounts/me/status', {
				status: statusText
			}, function(data) {
				statusCollection.add(new Status({status: statusText}));
			});
			return false;
		},

		render: function() {
			this.$el.html(indexTemplate);
		}
	});

	return new indexView();
});