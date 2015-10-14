module.exports = function( grunt ) {

	// Load all tasks
	require('load-grunt-tasks')(grunt);

	// Paths
	var PathConfig = {
		dev: '_publish_dev/',
		prd: '_publish_prd/'
	};

	// Set script
	var scripts = [
		'bower_components/angular/angular.js',
		'bower_components/angular-route/angular-route.js',
		'bower_components/angular-translate/angular-translate.js',
		'bower_components/jquery/dist/jquery.min.js',
		//'bower_components/angular-filter/dist/angular-filter.js',
		'bower_components/angular-bootstrap/ui-bootstrap.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		'js/translates.js',
		'js/bootstrap.js',
		'js/app.js',
		'js/services.js',
		'js/controllers.js',
		//'js/filters.js',
		//'js/directives.js'
	];

	// Set styles
	var styles = [
		'bower_components/html5-boilerplate/css/normalize.css',
		'bower_components/html5-boilerplate/css/main.css',
		'css/bootstrap.css',
		'css/bootstrap-theme.css',
		'css/icomoon.css',
		'css/app.css'
	];

	// Grunt config
	grunt.initConfig({
		config: PathConfig,

		clean: {
			prd: {
				src: ['<%= config.prd %>']
			},
			dev: {
				src: ['<%= config.dev %>']
			}			
		},

		copy: {
			prd: {
				files: [{
					expand: true,
					dot: true,
					src: [
						//'**',
						'*.{md,txt,htaccess}',
						'!css/**',
						'img/*.*',
						'img/churrasco/*.*',
						'img/churrasco/produtos/*.*',
						'img/churrasco/fancybox/*.*',
						'!js/**',
						'churrasco/*.js',
						'churrasco/*.css',
					],
					dest: '<%= config.prd %>/'
				}],
			},
			prd_fonts: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'css/fonts/',
					src: '**',
					dest: '<%= config.prd %>fonts/'
				}]
			},
			dev: {
				files: [{
					expand: true,
					dot: true,
					src: [
						//'**',
						'*.{md,txt,htaccess}',
						'!css/**',
						'img/*.*',
						'img/churrasco/*.*',
						'img/churrasco/produtos/*.*',
						'img/churrasco/fancybox/*.*',
						'!js/**',
						'churrasco/*.js',
						'churrasco/*.css',
					],
					dest: '<%= config.dev %>/'
				}],
			},
			dev_fonts: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'css/fonts/',
					src: '**',
					dest: '<%= config.dev %>fonts/'
				}]
			},
		},

		less: {
			prd: {
				options: { 
					compress: true
				},
				files: {
					'<%= config.prd %>style.css': styles
				}
			},
			dev: { 
				files: {
					'<%= config.dev %>style.css': styles
				}
			}
		},

		uglify: {
			options: {
				mangle : false
			},
			prd: {
				files : {
					'<%= config.prd %>scripts.js': scripts,
					'<%= config.prd %>modernizr.js': 'bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js'
				}
			},
			dev: {
				options: {
					beautify : true
				},
				files : {
					'<%= config.dev %>scripts.js': scripts,
					'<%= config.dev %>modernizr.js': 'bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js'
				}
			}
		},

		// HtmlMin
		htmlmin: {
			prd: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					//cwd: '<%= config.prd %>',
					src: ['index.html','partials/*.html','churrasco/*.html'],
					dest: '<%= config.prd %>',
				}],
			},
			dev: {
				files: [{
					expand: true,
					//cwd: '<%= config.prd %>',
					src: ['index.html','partials/*.html','churrasco/*.html'],
					dest: '<%= config.dev %>',
				}],
			}
		},
	  
		// Watch
		watch : {
			 options: {
        		//debounceDelay: 500,
      		},
			files : [
				'css/**',
				'img/**',
				'js/**',
				'partials/**',
				'churrasco/**',
				'index.html'
			],
			tasks : ['dev']
		},

		'ftp-deploy': {
			www: {
				auth: {
					host: 'ftp.mahler.com.br',
					port: 21,
					authKey: 'key1'
				},
				src: '<%= config.prd %>',
				dest: 'public_html/www/',
				//exclusions: ['path/to/source/folder/**/.DS_Store', 'path/to/source/folder/**/Thumbs.db', 'path/to/dist/tmp']
			},
			model: {
				auth: {
					host: 'ftp.mahler.com.br',
					port: 21,
					authKey: 'key1'
				},
				src: '../api/model/',
				dest: 'wsgi_apps/api/model',
			},
			view: {
				auth: {
					host: 'ftp.mahler.com.br',
					port: 21,
					authKey: 'key1'
				},
				src: '../api/view/',
				dest: 'wsgi_apps/api/view',
			},
		},

		cachebreaker: {
			dev: {
				options: {
					match: ['scripts.js', 'style.css'],
				},
				files: {
					src: ['<%= config.dev %>/index.html']
				}
			},
			prd: {
				options: {
					match: ['scripts.js', 'style.css'],
				},
				files: {
					src: ['<%= config.prd %>/index.html']
				}
			}
		}


	});
	
	grunt.registerTask('publish', ['build', 'ftp-deploy:www'] );
	grunt.registerTask('build', [ 'clean:prd', 'copy:prd', 'copy:prd_fonts', 'less:prd', 'uglify:prd', 'htmlmin:prd', 'cachebreaker:prd'] );
	grunt.registerTask('dev', [ 'clean:dev', 'copy:dev', 'copy:dev_fonts', 'less:dev', 'uglify:dev', 'htmlmin:dev', 'cachebreaker:dev'] );
	grunt.registerTask('w', ['dev',  'watch'] );
	grunt.registerTask('publish-api', ['ftp-deploy:model', 'ftp-deploy:view'])
	
};
