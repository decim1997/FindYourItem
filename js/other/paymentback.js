document.addEventListener('tizenhwkey', function(e) {
    if (e.keyName === "back") {
        try {
           if(VerifIfUserIsConnected())
           {
        	   window.location.href = "../cart/cart.htmlß";
           }
 
        } catch (ignore) {}
    }
});

