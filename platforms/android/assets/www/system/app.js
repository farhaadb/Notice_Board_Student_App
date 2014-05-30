var noticeboard = angular.module('App',['shoppinpal.mobile-menu', 'App.services'])
    
	noticeboard.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
        $routeProvider
            .when("/main", {
                templateUrl: "partials/main.html",
				  controller: 'MainController',
            })
			
			 .when("/profile", {
                templateUrl: "partials/profile.html",
				  controller: 'LecturerController',
            })
			
			.when("/login", {
                templateUrl: "partials/login.html",
				  controller: 'LoginController',
            })
            .when("/reports", {
                templateUrl: "partials/reports.html",
            })
			
			 .when("/lecturer", {
                templateUrl: "partials/lecturer.html",
				  controller: 'LecturerController',
            })
			
			 .when("/settings", {
                templateUrl: "partials/settings.html",
            })
			
            .otherwise({
                redirectTo: "/login"
            });
    }]);
