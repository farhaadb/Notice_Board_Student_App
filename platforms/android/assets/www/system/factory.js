noticeboard.factory('myNotices', function($http, $q, $timeout) {
   return {
		get: function(url) {
		      //url to the server
			var deferred = $q.defer();
			$http.get(url)
				.success(function(data) {
					deferred.resolve(data); //resolves the promise
				})
				.error(function(){
					deferred.reject(); //rejects the promise
				});
			return deferred.promise;
		},

		//---------------------------------------------------------//

		post: function(url,d) {
		    //url to the server
			var deferred = $q.defer();
			$http.post(url,d)
				.success(function(data) {
					deferred.resolve(data); //resolves the promise
				})
				.error(function(){
					deferred.reject(); //rejects the promise
				});
			return deferred.promise;
		},
		
		ip: "http://10.0.0.7:3000",
		
		default_profile_picture: "http://dutnoticeboard.co.za/student_modules/resources/img/1.png",
   }
});