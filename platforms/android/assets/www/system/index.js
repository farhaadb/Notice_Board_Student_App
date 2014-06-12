var app = {

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //document.addEventListener("backbutton", this.onBackKeyDown, false);

		var pushNotification = window.plugins.pushNotification;
		
		pushNotification.register(
        this.successHandler,
        this.errorHandler,
        {
            "senderID":"1097264179432",
            "ecb":"app.onNotification"
        });
	},

    onBackKeyDown: function(e){
		e.preventDefault();
	},
	
	setRegId: function(id){
		app.regId=id;
	},
	
	getRegId: function(){
		return app.regId;
	},

	// result contains any message sent from the plugin call
    successHandler: function(result){
		//alert('result = ' + result);
    },
     
    // result contains any error description text returned from the plugin call
    errorHandler: function(error){
        alert('error = ' + error);
    },
 
    onNotification: function(e){
        //alert("received event "+e.event);
 
        switch( e.event )
        {
            case 'registered':
            if (e.regid.length > 0)
            {
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                //alert("regID = " + e.regid);
				app.setRegId(e.regid);
                //window.location="http://www.dutnoticeboard.co.za/registerdevice?id="+e.regid;
            }
            break;
 
            case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if ( e.foreground )
            {
                //alert("in foreground");
                // on Android soundname is outside the payload. 
                // On Amazon FireOS all custom attributes are contained within payload
                //var soundfile = e.soundname || e.payload.sound;
                // if the notification contains a soundname, play it.
                //var my_media = new Media("/android_asset/www/"+ soundfile);
                //my_media.play();
            }
             
            else
            {  // otherwise we were launched because the user touched a notification in the notification tray.
							
				if(e.payload.type=="general"){
					window.location.href = '#/main';
				}
			
				else if(e.payload.type=="upload"){
					var location=body.substr(32);
					window.location.href = '#/files?'+e.payload.location;
				}
			
				else if(e.payload.type=="marks"){
					//go to marks
					window.location.href = '#/reports?'+e.payload.location;
				}
				
                if ( e.coldstart )
                {
                    //alert("cold start");
                }
                else
                {
                    //alert("background");
                }
            }
 
			//alert('MSG: ' + e.payload.message);
			//Only works for GCM
			//alert('MSGCNT: ' + e.payload.msgcnt);
		
          break;
 
        case 'error':
           alert('ERROR -> MSG:' + e.msg);
        break;
 
        default:
            alert('EVENT -> Unknown, an event was received and we do not know what it is');
        break;
      }
    },

    receivedEvent: function(id) {
	/*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    },
	
	chooseImage: function($scope){
		navigator.camera.getPicture(
                $scope.uploadPhoto,
                function(message) { alert('get picture failed'); },
                {
                    quality         : 50,
                    destinationType : navigator.camera.DestinationType.FILE_URI,
                    sourceType      : navigator.camera.PictureSourceType.PHOTOLIBRARY
                }
         );
	
	},

	uploadPhoto: function (imageURI, $scope) {
		var options = new FileUploadOptions();
		options.fileKey="file";
		
		var file_name=imageURI.substr(imageURI.lastIndexOf('/')+1)+".jpg";
		file_name=file_name.replace(/%/g,"");
		options.fileName=file_name;
		
		options.mimeType="image/jpeg";

		var params = new Object();
		params.key = localStorage.getItem("student_id")+"/profile";

		options.params = params;

		var ft = new FileTransfer();
		ft.upload(imageURI, encodeURI($scope.ip+"/student-picture-upload"), $scope.uploadComplete, $scope.uploadFailed, options);
    },

	downloadFile: function(path, $scope){
	alert("in download function");
	
		var fileTransfer = new FileTransfer();
		var uri = encodeURI(path);
		var file_name=path.substr(path.lastIndexOf('/')+1);
		var progress="";
		
		fileTransfer.onprogress = function(progressEvent) {
			if (progressEvent.lengthComputable) {
				var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
				$scope.setProgress(perc + "% loaded...");
			} else {
				if(progress==""){
					progress="Loading";
				}
				
				else{
					progress+=".";
				}
				
				$scope.setProgress(progress);
			}
		};

		fileTransfer.download(
			uri,
			"cdvfile://localhost/persistent/"+file_name,
			function(entry) {
				alert("download complete: " + entry.toURL());
			},
			function(error) {
				alert("download error source " + error.source);
				alert("download error target " + error.target);
				alert("upload error code" + error.code);
			},
			false,
			{
				headers: {
					"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
				}
			}
		);
	
	},

};
