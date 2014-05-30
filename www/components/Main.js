'use strict';
   
function MainController($scope,$http ,myNotices,$window) {
	$scope.statusmessage =  'Updating...';
	$scope.reload =function(){
	$window.location.reload();
	}
	var url = 'http://dutnoticeboard.co.za/gettable.html';
	
	init();
	
		function init(){
				$scope.conn = true;
				myNotices.get(url).then(function(data) { //success
					$scope.msg = data;
					$scope.ready = true;		
				},
				function(data) { //failure
					$scope.statusmessage =  ' WE ARE HAVING TROUBLE RETRIEVING DATA';
					$scope.ready =true;
					$scope.conn = false;
        		});
		};
} 							
