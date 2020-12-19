'use strict';
require.config({
	baseUrl: 'js/',
	paths: {
		jquery: ['https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min', 'jsvendor/jquery.min'],
		popper: 'jsvendor/popper',
		bootstrap: 'jsvendor/bootstrap',
		vueweather: 'vueweather'
	},
	shim: {
		popper: {
			deps: ['jquery'],
			exports: ['Popper']
		},
		bootstrap: {
			deps: ['jquery', 'popper'],
			exports: ['bootstrap']
		}
	}
});

require(['popper'], function (Popper) {
	window.Popper = Popper;
	require(['bootstrap']);
});

define(['jquery', 'bootstrap', 'vueweather'], function ($) {
	('use strict');
});
