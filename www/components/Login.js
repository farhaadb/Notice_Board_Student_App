'use strict';
   
function LoginController($scope,$http,myNotices,$location) {
	$scope.student_no = "21024909";
	$scope.password = "farhaad";
    var loginDetails ={'student_no' : $scope.student_no,'password' : $scope.password};
	var url = 'http://dutnoticeboard.co.za/studentapplogin';
	$scope.studentApplogin = function(){


	if ($scope.student_no == "21024909" &&	$scope.password == "farhaad"){
			
			localStorage.setItem("student_id",res.id);
			alert('Login is successful');
			$location.path("/main");
	
	}

	else{
		alert('Login Unsuccessful');
	$location.path("/login");
	}
	/*
		myNotices.post(url,loginDetails).then(function(status) {
						$scope.status=status;
						alert(status.status);
						if (status.status == "true"){
						$location.path("/main");
						}
						else if (status.status == "false"){
						$location.path("/login")
						}
		},
	
	function() { //failure
					alert('WE ARE HAVING TROUBLE loggin you in');
					$scope.ready =true;
					$scope.conn = false;
        		});*/

	};

}
	
			
		