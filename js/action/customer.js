 
var xhr = new XMLHttpRequest();
var resultcart  = null;
var resultcartline = [];
var tempo  = null;

function DisplayUserSession()
 {
	    var userobject = JSON.parse(sessionStorage.getItem("usersession"));
		var userpseudo = userobject["userpseudo"];
		var useremail = userobject["useremail"];
		var userpicture = userobject["userpicture"];	 
		
		$('#memberpicture').attr('src',ReturnBasePictureString()+userpicture);
		$('#memberpicture2').attr('src',ReturnBasePictureString()+userpicture);
		$('#memberpseudo').text(userpseudo);
		$('#memberemail').text(useremail);
 }
 
 
 function GetStoredCartData()
 {
	 var url = ReturnBaseString() + "/findyouritem/cart/display";
	 
	 xhr.onreadystatechange = function(){
    	   if(xhr.readyState == 4 && xhr.status == 200){
    		   resultcart = JSON.parse(xhr.responseText);
    		   DisplayStoredCartData(resultcart);
    	   }
    };
    
    xhr.open("GET", url);
    xhr.send(null);
 }
 
 
 function GetStoredCartlineItems(cartkey)
 {
	 var url = ReturnBaseString()+"/findyouritem/cartline/display/"+cartkey;
	 
	 xhr.onreadystatechange = function(){
  	   if(xhr.readyState == 4 && xhr.status == 200){
  		 resultcartline.push(JSON.parse(xhr.responseText));
  		  // alert("Resultat: "+resultcartline.length);
  	   }
  };
  
  xhr.open("GET", url,false);
  xhr.send(null);
  
 }
 
 function DisplayStoredCartData(data)
 {
	 var cartkeys = [];
	 var temp = null;
	 var key = null;
	 
	 if(data.length >0)
		{
		 
		 data.forEach(function(cart,index)
		 {
			 GetStoredCartlineItems(cart.cartkey);
		});	 
		 
		 
		/* resultcartline.forEach(function(cartline,index){
			 
			 alert(cartline[index]);
			// alert(index);
			// alert("Cart: "+cartline[index]["itemname"]);
		 });*/
		 
		 //alert(cartkeys.length);
	   data.forEach(function(cart,index)
		{
			 tempo += '<div class="card mb-1 border-0 rounded-0">';
			 
			 tempo += '<div class="card-header py-2" id="headingTwo">';
			 tempo += '<a href="#" class=" collapsed" data-toggle="collapse" data-target="#';
			 tempo += cart.cartkey;
			 tempo += '"  aria-expanded="false" aria-controls="';
			 tempo += cart.cartkey;
			 tempo += '" >';
			 tempo += 'Date '+ cart.dateadded + ' ' + cart.totalamount + 'DT';
			 tempo += '</a>';
			 tempo += '</div>';
			 
			 tempo += '<div id="';
			 tempo += cart.cartkey;
			 tempo += '" class="collapse" data-parent="#accordion">';
			
			
			 
			 tempo += '</div>';
			 
			 tempo += '</div>';
			// GetStoredCartlineItems(cart.cartkey);
			 //alert(item.cartkey);
		});
		 
		}
	 
	  document.getElementById("accordion").innerHTML = tempo;
	  
		 for(var i = 0; i < resultcartline.length; i++)
		 {			
			 resultcartline[i].forEach(function(cartline,index){
				// alert(cartline.itemname+" Key: "+cartline.cartkey);
				 key = cartline.cartkey;
				 temp += '<div class="card-body">';
				 temp += '<div class="col-12 px-0">';
				 temp += '<ul class="list-group list-group-flush mb-4">';
				 temp += '<li class="list-group-item">';
				 
				 temp += ' <div class="row">';
				 
				 temp += ' <div class="col-auto align-self-center">';
				 temp += '<figure class="product-image h-auto">';
				 temp += '<img src="';
				 temp +=  ReturnBasePictureString()+cartline.itempicture;
				 temp += '" alt="" class="vm">';
				 temp += '</figure>';
				 temp += '</div>';
				 
				 temp += '<div class="col px-0">';
				 temp += ' <a href="cart.html#" class="text-dark mb-1 h6 d-block">';
				 temp += cartline.itemname;
				 temp += '</a>';
				 temp += '</div>';
				 
				 temp += '<div class="col-auto align-self-center">';
				 temp += ' <div class="input-group input-group-sm">';
				 temp += '<h5 class="text-success font-weight-normal mb-0">';
				 temp += cartline.itemprice;
				 temp += '<sup>DT</sup></h5>';
				 temp += '</div>';
				 temp += '</div>';
				 
				 temp += '</div>';
				 
				 temp += '</li>';
				 temp += '</ul>';

				 temp += '</div>';
				 temp += '</div>';
			 });
			 document.getElementById(key).innerHTML = temp;
			 temp = null;
		}
 }
 