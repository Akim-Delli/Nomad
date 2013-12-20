define(['text!templates/index.html'], function(indexTemplate) {
	var indexView = backbone.View.extend({
		el: $('#content'),

		render: function() {
			this.$el.html(indexTemplate);
		}
	});

	return new indexView();
});