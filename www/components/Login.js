'use strict';
   
function LoginController($scope,$http,myNotices,$location) {

	if(localStorage.getItem("student_id")!=undefined){
		$location.path("/main");
	}
	
	$scope.student_no = "21024909";
	$scope.password = "farhaad";
    var loginDetails ={'student_no' : $scope.student_no,'password' : $scope.password};
	$scope.ip=myNotices.ip;
	
	
	$scope.studentApplogin = function(){

		var url = $scope.ip+"/studentapplogin";
		
		myNotices.post(url,loginDetails).then(function(status) {
			$scope.status=status;
						
			if(status.status == "true"){
				localStorage.setItem("student_id",$scope.student_no);
				var device_id=window.app.getRegId();
				
				if(device_id!=undefined){
					//register device with server here
					myNotices.post($scope.ip+"/registerdevice",{'student':$scope.student_no, 'device':device_id}).then(function(status) {
						if(status.status=="true"){
							localStorage.setItem("device_id",device_id);
						}
						
						$location.path("/main");
					},
				
					function() { //failure
						alert('We are having trouble logging you in, please check your internet connection');
						$scope.ready =true;
						$scope.conn = false;
					});
				}
				
				else{
					$location.path("/main");
				}
				
			}
						
			else if (status.status == "false"){
				alert("Incorrect username or password");
				$location.path("/login")
			}
		},
	
		function() { //failure
			alert('We are having trouble logging you in, please check your internet connection');
			$scope.ready =true;
			$scope.conn = false;
		});

	};

}
	
			
		