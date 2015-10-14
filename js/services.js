'use strict';


angular.module('myApp.services', []).value('version', '0.1')

.factory('ApiFactory', ['$http', function ($http) {
	var factory = {}; 

	factory.anuncios = function () {
		return $http.get(URL_API + '/anuncio/');
	};
	
	factory.categoria = function (slug) {
		return $http.get(URL_API + '/categoria/'+ slug +'/');
	};

	factory.clientes = function () {
		return $http.get(URL_API + '/cliente/');
	};

	factory.especificacoes = function (slug) {
		return $http.get(URL_API + '/produto/'+ slug +'/especificacao/');
	};
		
	factory.linhas = function (slug) {
		return $http.get(URL_API + '/categoria/'+ slug +'/linha/');
	};

	factory.produtoAll = function (slug) {
		return $http.get(URL_API + '/categoria/'+ slug +'/produto/');
	};

	factory.produtos = function (slug) {
		return $http.get(URL_API + '/linha/'+ slug +'/produto/');
	};

	factory.representantes = function () {
		return $http.get(URL_API + '/representante/');
	};

	return factory;
}])