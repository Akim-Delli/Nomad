define(['models/Contact'], function(Conatct) {
	var ContactCollection = Backbone.Collection.extend({
		model: Contact
	});

	return ContactCollection;
});