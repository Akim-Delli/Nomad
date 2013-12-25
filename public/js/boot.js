require.config({
	paths: {
		jQuery: '/js/libs/jquery',
		Underscore: '/js/libs/underscore',
		Backbone: '/js/libs/backbone',
		text: '/js/libs/text',
		templates: '../templates'
	},
	shim: {
		'Backbone': ['Underscore', 'jQuery'],
		'Nomad' : ['Backbone']
	}
});

require(['Nomad'], function(Nomad){
	Nomad.initialize();
});