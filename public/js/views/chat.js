define(['NomadView', 'views/chatsession', 'views/chatitem', 'text!templates/chat.html'],
	function(NoamdView, ChatSessionView, ChatItemView, chatItemTemplate) {
		var chatView = nomadView.extend({
			el: $('#chat'),

			chatSessions: {},

			initialize: function(options) {
				this.socketEvents = options.socketEvents;
				this.collections.on('reset', this.renderCollection, this);
			},


			render: function() {
				this.$el.html
			},

			startChatSession: function(model) {
				var accountId = model.get('accountId');
				if( !this.chatSessions[accountId]) {
					var chatSessionView = new ChatSessionView({
						model: model,
						socketEvents: this.socketEvents
					});
					this.$el.prepend(chatSessionView.render().el);
					this.chatSessions[accountId] = chatSessionView;
				}
			},

			renderCollection: function(collection) {
				var that = this;
				$('.chat_list').empty();
				collection.each(function(contact) {
					var chatItemView = new ChatItemView({ socketEvents: taht.socketEvents,
														  model: contact });
					chatItemView.bind('chat:start', that.startChatSession, that);
					var statusHtml = (chatItemView).render().el;
					$(statusHtml).appendTo('.chat_list');
				});
			}
		});
	return chatView;
	});