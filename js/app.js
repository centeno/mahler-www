'use strict';

//var URL_API = 'http://localhost:8000';
var URL_API = 'http://api.mahler.com.br';
var URL_MEDIA = URL_API + '/media';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [
	'ngRoute',
	//'myApp.filters',
	'myApp.services',
	//'myApp.directives',
	'myApp.controllers',
	'pascalprecht.translate',
	//'angular.filter',
	'ui.bootstrap'
])


.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'partials/home.html?id=' + (new Date().getTime()),
	});
	
	$routeProvider.when('/empresa', {
		templateUrl: 'partials/empresa.html?id=' + (new Date().getTime())
	});
	
	$routeProvider.when('/produtos/:categoria_slug', {
		templateUrl: 'partials/categoria.html?id=' + (new Date().getTime()),
		controller: 'CategoriaController'
	});

	$routeProvider.when('/representantes', {
		templateUrl: 'partials/representantes.html?id=' + (new Date().getTime()),
		controller: 'RepresentanteController'
	});

	$routeProvider.when('/ondeencontrar', {
		templateUrl: 'partials/ondeencontrar.html?id=' + (new Date().getTime()),
	});

	$routeProvider.when('/ondeencontrar/lojas', {
		templateUrl: 'partials/clientes.html?id=' + (new Date().getTime()),
		controller: 'ClienteController'
	});

	$routeProvider.when('/midia', {
		templateUrl: 'partials/midia.html?id=' + (new Date().getTime()),
		controller: 'MidiaController'
	});

	$routeProvider.when('/contato', {
		templateUrl: 'partials/contato.html?id=' + (new Date().getTime()),
		controller: 'ContatoController'
	});

	$routeProvider.otherwise({redirectTo: '/home'});
}])

.config(function ($translateProvider) {
	$translateProvider.translations('en', TRANSLATE_EN);
	$translateProvider.translations('es', TRANSLATE_ES);
	$translateProvider.translations('pt', TRANSLATE_PT);
	$translateProvider.preferredLanguage('pt');
})

.run(function ($rootScope, $location) {
	$rootScope.$on('$routeChangeSuccess', function(){
		ga('send', 'pageview', $location.path());
	});
});

;
