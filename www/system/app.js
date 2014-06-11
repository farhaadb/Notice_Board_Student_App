var noticeboard = angular.module('App',['ngRoute', 'shoppinpal.mobile-menu', 'App.services', 'ngSanitize', 'angularFileUpload'])
    
	noticeboard.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
        $routeProvider
            .when("/main", {
                templateUrl: "partials/main.html",
				  controller: 'MainController',
            })
			
			 .when("/profile", {
                templateUrl: "partials/profile.html",
				  controller: 'ProfileController',
            })
			
			.when("/login", {
                templateUrl: "partials/login.html",
				  controller: 'LoginController',
            })
            .when("/reports", {
                templateUrl: "partials/reports.html",
				  controller: 'ReportsController',
            })
			
			 .when("/lecturer", {
                templateUrl: "partials/lecturer.html",
				  controller: 'LecturerController',
            })
			
			.when("/files", {
                templateUrl: "partials/files.html",
				  controller: 'FilesController',
            })
			
			 .when("/settings", {
                templateUrl: "partials/settings.html",
            })
			
			.when("/lecturerlist", {
                templateUrl: "partials/lecturerlist.html",
				  controller: 'LecturerListController',
            })
			
			 .when("/about", {
                templateUrl: "partials/about.html",
				  controller: 'AboutController',
            })
			
            .otherwise({
                redirectTo: "/login"
            });
    }]);
