

document.addEventListener('tizenhwkey', function(e) {
    if (e.keyName === "back") {
        try {
           if(VerifIfUserIsConnected())
           {
        	   $('#exitapp').modal('show');	
           }
 
        } catch (ignore) {}
    }
});

function ExitApplication()
{
	sessionStorage.removeItem("usersession");
	tizen.application.getCurrentApplication().exit();
}

