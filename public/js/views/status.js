define(['NomadView', 'text!templates/status.html'], function( NomadView, statusTemplate) {
	var statusView = NomadView.extend({
		tagName: 'li',

		render: function() {
      		$(this.el).html(_.template(statusTemplate,this.model.toJSON()));
      		return this;
    	}
	});

	return statusView;
});