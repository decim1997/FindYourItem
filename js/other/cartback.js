document.addEventListener('tizenhwkey', function(e) {
    if (e.keyName === "back") {
        try {
           if(VerifIfUserIsConnected())
           {
        	   window.location.href = "../customer/home.html";
           }
           else{
        	   window.location.href = "../../index.html";
           }
        } catch (ignore) {}
    }
});