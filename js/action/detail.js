window.addEventListener("load", ItemDetail, false);
var itemobject = null;

function ItemDetail()
{
	var temp = "";
	var currentitem = new URLSearchParams(window.location.search);
	currentitem.has('get');
	
	var username = currentitem.get("username");
	var itempicture = currentitem.get("itempicture");
	var itemname = currentitem.get("itemname");
	var itemprice = currentitem.get("itemprice");
	var itemstate = currentitem.get("itemprice");
	var itemcategory = currentitem.get("itemcategory");
	var itemdescription = currentitem.get("itemdescription");
	var phonenumber = currentitem.get("userphonenumber");
	var email = currentitem.get("useremail");
	var userpicture = currentitem.get("userpicture");
	var comptstate = currentitem.get("comptstate");
	var iditem = currentitem.get("iditem");
	var iduser = currentitem.get("iduser");
		
	itemobject = 
	  {
	        "itemid": iditem,
	        "itempicture": itempicture,
	        "itemname":itemname,
	        "itemprice": itemprice,
	        "itemstate": itemstate,
	        "categorytitle": itemcategory,
	        "itemdescription": itemdescription,
	        "userid": iduser,
	        "userphonenumber": phonenumber,
	        "useremail": email,
	        "userpicture": userpicture,
	        "comptstate": comptstate
	    };
	

	temp += '<div class="swiper-container product-details">';
	temp +=  '<div class="swiper-wrapper">';
	
	temp += '<div class="swiper-slide">';
	temp += ' <img src="';
	temp += ReturnBasePictureString() + itempicture;
	temp += '" alt="">';
	temp += '</div>';
	
	temp += '<div class="swiper-slide">';
	temp += ' <img src="';
	temp += ReturnBasePictureString() + itempicture;
	temp += '" alt="">';
	temp += '</div>';
	
	temp += '<div class="swiper-slide">';
	temp += ' <img src="';
	temp += ReturnBasePictureString() + itempicture;
	temp += '" alt="">';
	temp += '</div>';
    
	temp += '</div>';
    temp += '<div class="swiper-pagination"></div>';
	temp += '</div>';
	
	temp += '<a href="javascript:void(0)" class="btn btn-sm btn-default btn-rounded ml-2" data-toggle="modal" data-target="#share"><i class="material-icons mb-18 mr-2">share</i>Share</a>';
	temp += '<a href="#detail.html" class="text-dark mb-1 mt-2 h6 d-block">';
	temp += itemname;
	temp += '</a>';
	temp += '<p class="text-secondary small mb-2">';
	temp += username;
	temp += '(';
	temp += phonenumber;
	temp += ')</p>';
	
	temp += '<p class="text-secondary">';
	temp += itemdescription;
	temp += '</p>';
	
	temp += '<div class="row mb-4">';
	temp += '<div class="col">';
	temp += '<h3 class="text-success font-weight-normal mb-0">';
	temp += itemprice;
	temp += '<sup> DT</sup></h3>';
	temp += '</div>';
	temp += '<div class="col-auto align-self-center">';
	temp += '<button class="btn btn-lg btn-default shadow btn-rounded" onclick="SetDetailItemToCart()">Add <i class="material-icons md-18">shopping_cart</i></button>';
	temp += '</div>';
	temp += '</div>';
	
	 document.getElementById("rowitemdetail").innerHTML = temp;
	 $('#nbritem').text(GetCartItemNumber()); 	
}

// add eventListener for tizenhwkey
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

function SetDetailItemToCart()
{
	
	 var cartitems = localStorage.getItem("usercart");
	  var verif = false;
	  var data = [];
	  
	  if(cartitems == null){
		  data.push(itemobject);
		  localStorage.setItem("usercart",JSON.stringify(data));
		  alert("new iteme add to cart");
		  
			  $('#nbritem').text(GetCartItemNumber()); 
	  }
	  else
	  {
	    data = JSON.parse(cartitems); 
	    data.forEach(function(item,index)
	    	{
	         if(item.itemid==itemobject.itemid){
	        	   verif = true;
	         }
	    }); 
	    
	    if(verif == false){
	    	 data.push(itemobject);
	    	 localStorage.setItem("usercart",JSON.stringify(data));
	    	 alert("item add to cart");
	    	 $('#nbritem').text(GetCartItemNumber()); 
	    }
	    else{
	    	alert("item is already in your cart"); 
	    }
	  }
}


