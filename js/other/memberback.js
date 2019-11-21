document.addEventListener('tizenhwkey', function(e) {
    if (e.keyName === "back") {
        try {
           if(VerifIfUserIsConnected())
           {
        	   window.location.href = "../customer/home.html";
           }
 
        } catch (ignore) {}
    }
});