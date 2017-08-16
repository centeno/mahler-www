'use strict';

angular.module('myApp.controllers', [])

.controller('BodyController', ['$translate', '$scope', 'ApiFactory', function ($translate, $scope, ApiFactory) {
	$scope.check = '';

	$scope.changeLanguage = function (key) {
		$translate.use(key);
	};
	$scope.checkLanguage = function (key) {
		return ($translate.use() == key);
	}

	$scope.getBanner = function (slug) {
		return URL_MEDIA +'/banners/'+ slug + '.jpg'; //?id=' + (new Date().getTime());
	}

	$scope.getBannerEn = function (slug) {
		return URL_MEDIA +'/banners/'+ slug + '_en.jpg'; //?id=' + (new Date().getTime());
	}

	$scope.getBannerEs = function (slug) {
		return URL_MEDIA +'/banners/'+ slug + '_es.jpg'; //?id=' + (new Date().getTime());
	}

}])

.controller('CategoriaController', ['$scope', '$routeParams', 'ApiFactory', '$modal', function($scope, $routeParams, ApiFactory, $modal) {
	$scope.categoria_slug = $routeParams.categoria_slug;
	$scope.categoria;
	$scope.linhas;
	$scope.url = URL_MEDIA;

	$('#mydiv').show();

	ApiFactory.categoria($scope.categoria_slug).success(function (retorno) {
		$scope.categoria = retorno;
		$('#mydiv').hide();
	}).error(function (error) {
		console.log(error);
	});

	ApiFactory.linhas($scope.categoria_slug).success(function (retorno) {
		$scope.linhas = retorno;
		$('#mydiv').hide();
	}).error(function (error) {
		console.log(error);
	});

	$scope.orcamento = function () {
		var modalInstance = $modal.open({
			templateUrl: 'partials/orcamento.html',
			controller: 'ModalOrcamentoControler',
			backdrop: 'static',
			//size: 'sm',
			//resolve: {
			//	titulo: function(){ return titulo }
			//}
		});
	}

}])


.controller('ClienteController', ['$scope', 'ApiFactory', function($scope, ApiFactory) {
	$scope.clientes;
	$scope.cliente = null;
	$scope.activeTodos = 'active';
	$scope.activeOnline = '';
	$scope.activeFone = '';
	$scope.url = URL_MEDIA;

	$('#mydiv').show(); 

	ApiFactory.clientes().success(function (retorno) {
		$scope.clientes = retorno;
		$scope.cliente = retorno;
		$('#mydiv').hide(); 
	}).error(function (error) {
		console.log(error);
	});

	$scope.filtra = function()
	{
		var estado = $scope.selectedEstado;
		
		if(estado == '' || estado == undefined)
			$scope.cliente = $scope.clientes;
		else	
			$scope.cliente = $scope.clientes.filter(function(item){ return item.estado == estado; });
			
		if($scope.activeOnline == 'active')
			$scope.cliente = $scope.cliente.filter(function(item){ return item.compraonline });
		
		if($scope.activeFone == 'active')
			$scope.cliente = $scope.cliente.filter(function(item){ return item.comprafone });
		
		if($scope.activeFisica == 'active')
			$scope.cliente = $scope.cliente.filter(function(item){ return item.lojafisica });
		
	}

	$scope.vendaTodos = function()
	{
		$scope.activeTodos = 'active';
		$scope.activeOnline = '';
		$scope.activeFone = '';
		$scope.activeFisica= '';
		$scope.filtra();
	}

	$scope.vendaOnline = function()
	{
		$scope.activeTodos = '';
		$scope.activeOnline = 'active';
		$scope.activeFone = '';
		$scope.activeFisica= '';
		$scope.filtra();
	}

	$scope.vendaFone = function()
	{
		$scope.activeTodos = '';
		$scope.activeOnline = '';
		$scope.activeFone = 'active';
		$scope.activeFisica= '';
		$scope.filtra();
	}


	$scope.vendaFisica= function()
	{
		$scope.activeTodos = '';
		$scope.activeOnline = '';
		$scope.activeFone = '';
		$scope.activeFisica= 'active';
		$scope.filtra();
	}

}])

.controller('ContatoController', ['$scope', 'ApiFactory', '$modal', function($scope, ApiFactory, $modal) {
	$scope.send = function(){
		var form = document.formContato;
		if (form.nome.value =='' || form.email.value =='' || form.telefone.value =='' || form.assunto.value =='' || form.mensagem.value ==''){
			alert('Preencha corretamente todos os campos');
		} else {
			alert('Contato enviado com sucesso.');
			//form.reset();
		}
	}

	$scope.curriculo = function (email) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/curriculo.html',
			controller: 'ModalCurriculoControler',
			backdrop: 'static',
			//size: 'sm',
			resolve: {
				email: function(){
					return email;
				}
			}
		});
	}
}])

.controller('EspecificacaoController', ['$scope', 'ApiFactory', '$modal', function($scope, ApiFactory, $modal) {
	$scope.especificacoes2;	
	$scope.url = URL_MEDIA;

	$scope.getEspecificacoes = function(produto_slug){
		ApiFactory.especificacoes(produto_slug).success(function (retorno) {
			$scope.especificacoes2 = retorno;
		}).error(function (error) {
			console.log(error);
		});
	}

	$scope.open = function (_foto) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/foto.html',
			controller: 'ModalFotoControler',
			//backdrop: 'static',
			//size: 'lg',
			resolve: {
				foto: function(){
					return $scope.url +'/'+ _foto;
				} 
			}
		});
	}

}])

.controller('MidiaController', ['$scope', 'ApiFactory', function($scope, ApiFactory) {
	$scope.anuncios;
	$scope.url = URL_MEDIA;

	$('#mydiv').show(); 

	ApiFactory.anuncios().success(function (retorno) {
		$scope.anuncios = retorno;
		$('#mydiv').hide(); 
	}).error(function (error) {
		console.log(error);
	});
}])

.controller('ModalCurriculoControler', ['$scope', '$modalInstance', '$location', 'email', function ($scope, $modalInstance, $location, email) {
	$scope.email = email;

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.send = function(){
		var form = document.formCurriculo;
		if (form.nome.value =='' || form.email.value =='' || form.curriculo.value ==''){
			alert('Preencha corretamente todos os campos');
		} else {
			alert('Currículo enviado com sucesso.');
			$modalInstance.dismiss('cancel');
		}
	}
	ga('send', 'pageview', $location.path() +'/curriculo');
}])

.controller('ModalFotoControler', ['$scope', '$modalInstance', 'foto', function ($scope, $modalInstance, foto) {
	$scope.foto = foto;

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}])

.controller('ModalOrcamentoControler', ['$scope', '$modalInstance', '$location', function ($scope, $modalInstance, $location) {
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.send = function(){
		var form = document.formOrcamento;
		if (form.nome.value =='' || form.email.value =='' || form.telefone.value =='' || form.arquivo.value =='' || form.mensagem.value ==''){
			alert('Preencha corretamente todos os campos');
		} else {
			alert('Orçamento enviado com sucesso.');
			$modalInstance.dismiss('cancel');
		}
	}
	ga('send', 'pageview', $location.path() +'/orcamento');
}])

.controller('ModalProdutoControler', ['$scope', '$modalInstance', '$translate', '$location', 'produto', 'url', function ($scope, $modalInstance, $translate, $location, produto, url) {
	$scope.produto = produto;
	$scope.url = url;

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.checkLanguage = function (key) {
		return ($translate.use() == key);
	}

	ga('send', 'pageview', $location.path() +'/'+ produto.slug);
}])

.controller('ProdutosController', ['$scope', '$routeParams', 'ApiFactory', '$modal', function($scope, $routeParams, ApiFactory, $modal) {
	$scope.produtos;
	$scope.produto;
	$scope.url = URL_MEDIA;

	$('#mydiv').show();

	$scope.getProdutos = function (linha_slug) {
		ApiFactory.produtos(linha_slug).success(function (retorno) {
			$scope.produtos = retorno;
			$('#mydiv').hide();
		}).error(function (error) {
			console.log(error);
		});
	}

	$scope.open = function (slug) {	
		$scope.produto = $scope.produtos.filter(function(item){ return item.slug == slug;})[0];
	
		var modalInstance = $modal.open({
			templateUrl: 'partials/produto.html',
			controller: 'ModalProdutoControler',
			backdrop: 'static',
			size: 'lg',
			resolve: {
				produto: function () {
					return $scope.produto;
				},
				url: function(){
					return $scope.url;
				} 
			}
		});
	}
}])

.controller('RepresentanteController', ['$scope', 'ApiFactory', function($scope, ApiFactory) {
	$scope.representantes;
	$scope.representante = null;
	$scope.url = URL_MEDIA;

	$('#mydiv').show(); 

	ApiFactory.representantes().success(function (retorno) {
		$scope.representantes = retorno;
    	$('#mydiv').hide(); 
	}).error(function (error) {
		console.log(error);
	});

	$scope.open = function(estado)
	{
		$scope.representante = $scope.representantes.filter(function(item){ return item.estado == estado; });
	}

}])
;