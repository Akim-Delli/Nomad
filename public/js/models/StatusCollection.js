define(['models/Status'], function(Status) {
	var StatusCollection = Backbone.collection.extend({
		model: Status
	});

	return StatusCollection;
});