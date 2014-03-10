define(['NomadView', 'text!templates/chatitem.html'], function(NomadView, chatItemTemplate) {
	var chatItemView = NomadView.extend({
		tagName: 'li',

		$el: $(this.el);

		events: {
			'click': 'startChatSession'
		},

		initialize: function(options) {
			options.socketEvents.bind(
				'socket:chart:start' + this.model.get('accountId'),
				this.startChatSession,
				this
			);
		},

		startChatSession: function() {
			this.trigger('chat:start', this.model);
		},

		render: function() {
			this.$el.html(_.template(chatItemTemplate, {
				model: this.model.toJSON()
			}));
			return this;
		}
	});

	return chatItemView;
});