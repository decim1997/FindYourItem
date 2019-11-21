
function GetCartItemNumber()
 {
 	var cartitems = localStorage.getItem("usercart");
 	var data = JSON.parse(cartitems);	
 	if(cartitems != null){
 		return data.length;
 	}
 	else{
 		return 0;
 	}
 }


function cartitemTotlaPrice()
{
	 var cartitems = localStorage.getItem("usercart");
	 var data = JSON.parse(cartitems);
	 var totalprice = 0;
	 data.forEach(function(item,index){
           	totalprice +=  	parseFloat(item.	itemprice); 
	 });
	 return totalprice;
}
function AddItemToCart(selectedindex)
{
	 var cartitems = localStorage.getItem("usercart");
	  var verif = false;
	  var data = [];
	  var allitems = ReturnItemData();
	  var itemsbycategory = ReturnItemByCategoryData();  
	  
	  if(cartitems == null){
		  
		  if(veriffiltrecategactivate == false)
		  {
				data.push(allitems[selectedindex]);
		    	  localStorage.setItem("usercart",JSON.stringify(data));
		    	  $('#nbritem').text(GetCartItemNumber()); 
		    	  alert("add new item to cart");
		  }
		  if(veriffiltrecategactivate == true)
		  {
			
		   data.push(itemsbycategory[selectedindex]);
	    	  localStorage.setItem("usercart", JSON.stringify(data) );			  
	    	  $('#nbritem').text(GetCartItemNumber()); 
	    	  alert("add new item to cart");
			  
			  //alert( JSON.stringify(itemsbycategory[selectedindex]));
		  }

		 
	  }
	  else{
		  
		  if(veriffiltrecategactivate == false)
		  {
			  var data = JSON.parse(cartitems);
	    	  
		 	  data.forEach(function(item,index)
		 	    	   {
		 	    		  if(item.itemid == result[selectedindex]["itemid"])
		 	    		  {
		 	    			  verif = true;
		 	    		  }
		 	    	   });
		 	  
		 	    	 if(verif == false){
		 	    		  data.push(result[selectedindex]);
		 	    		  localStorage.setItem("usercart",JSON.stringify(data));
		 	          $('#nbritem').text(GetCartItemNumber()); 
		 	    		  alert("item add to cart");
		 	    		  //nbritem
		 	    	  }
		 	    	  else{
		 	    		 alert("item is already in your cart"); 
		 	    	  }		  
		  }
		  
		  if(veriffiltrecategactivate == true)
		  {
			  var data = JSON.parse(cartitems);
			  
			  data.forEach(function(item,index)
			  {
				  if( item.itemid == itemsbycategory[selectedindex]["itemid"])
				  {
					  verif = true;
				  }
			  });
			  
			  if(verif == false)
			  {
				  data.push(itemsbycategory[selectedindex]);
 	    		  localStorage.setItem("usercart",JSON.stringify(data));
 	          $('#nbritem').text(GetCartItemNumber()); 
 	    		  alert("item add to cart");
			  }
			  else
			  {
				  alert("item is already in your cart"); 	  
			  }
		  }
	 	    	 
	  }
}

function ShowCartItem()
{
	var cartitems = localStorage.getItem("usercart");
	var temp = "";
	//  <li class="list-group-item">
	var data = JSON.parse(cartitems);
	data.forEach(function(item,index)
	{
		temp += '<li class="list-group-item" id="rem';
		temp += index;
		temp += '">';
		temp += '<div class="row">';
		
		temp += '<div class="col-auto align-self-center">';
		temp += '<button class="btn btn-sm btn-link p-0 float-right" onclick="DelteItemFromCart(\''+index+'\')"><i class="material-icons">remove_circle</i></button>';
		temp += '</div>';
		
		temp += '<div class="col-2 pl-0 align-self-center">';
		temp += '<figure class="product-image h-auto"><img src="';
		temp += ReturnBasePictureString() + item.itempicture;
		temp += '"alt="" class="vm"></figure>';	
		temp += '</div>';
		
		temp += '<div class="col px-0">';
		temp += ' <a href="#" class="text-dark mb-1 h6 d-block">';
		temp += item.itemname;
		temp += '</a>';
		
		temp += ' <h5 class="text-success font-weight-normal mb-0">';
		temp += item.itemprice;
		temp += '<sup>.DT</sup></h5>';
		
		temp += ' <p class="text-secondary small text-mute mb-0">';
		temp += item.categorytitle;
		temp += '<span class=" text-success ml-2"></span></p>';
			
		temp += '</div>'; 
		
		temp += '</div>';
		temp += '</li>';
	});
	
	document.getElementById("itemcarttable").innerHTML = temp;
	$('#cartitemtotalprice').text(cartitemTotlaPrice()+" DT");
	$('#cartnumberofitem').text(GetCartItemNumber()+" Item");
	$('#nbritem').text(GetCartItemNumber());
	
}

function DelteItemFromCart(selectedindex)
{
	var cartitems = localStorage.getItem("usercart");
 	var data = JSON.parse(cartitems);
 	data.splice(selectedindex,1);
 	localStorage.setItem("usercart",JSON.stringify(data));
 	var ch = "#rem" + selectedindex;	
 	$(ch).fadeOut('slow', function (c) {
 		$(ch).remove();
	});
 
 	if(GetCartItemNumber() == 0){
 		FromCartGoToHome();
 		
 	}
 	else{
 		$('#cartitemtotalprice').text(cartitemTotlaPrice()+" DT");
 		$('#cartnumberofitem').text(GetCartItemNumber()+" Item");
 		$('#nbritem').text(GetCartItemNumber());	
 	}
}
function EmptyAllCart()
{
	localStorage.removeItem("usercart");
 	document.getElementById('cartcontainer').style.visibility = "hidden";	
 	document.getElementById('cardamount').style.visibility = "hidden";	
 	$('#cartitemtotalprice').text('');
	$('#cartnumberofitem').text('');
	$('#nbritem').text('');
	$('#emptycart').modal('hide');
	FromCartGoToHome();
}

function GoToCart()
{
	var cartitems = localStorage.getItem("usercart");
	
	if(cartitems != null){
		if(VerifIfUserIsConnected()){
			window.location.href = "../cart/cart.html";
		}
		else{
			window.location.href = "pages/cart/cart.html";
		}
	}
	else{
		alert("Your Cart is empty");
	}
}

function GoToCartFromPages()
{
	var cartitems = localStorage.getItem("usercart");
	if(cartitems != null)
	{
		window.location.href = "../cart/cart.html";	
	}
	
	else{
		alert("Your Cart is empty");
	}
}




function FromCartGoToHome()
{
	if(VerifIfUserIsConnected()){
		veriffiltrecategactivate = false;
		window.location.href = "../customer/home.html";
	}
	else{
		veriffiltrecategactivate = false;
	     window.location.href = "../../index.html";	
	}
}



