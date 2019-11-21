var xhr = CreateXHR();
function GoToPayement()
{
	
   if(VerifIfUserIsConnected()){
	 window.location.href = "../payment/payment.html";   
   }	
   else{
	   $('#loginmodal').modal('show');
   }
}


function ProceedToPayement()
{
	
}

function ConvertDinardToUSDollard()
{
   return cartitemTotlaPrice()*0.35;	
}

function saveCartData(totalamount,dateadded,paymentid)
{
	
	var url = ReturnBaseString()+"/findyouritem/cart/add";
	var cartdata = 
	{
	 "totalamount": totalamount,
	 "dateadded": dateadded,
	 "cartkey": paymentid
	};
	
	xhr.onreadystatechange = function() {
		
		if(xhr.readyState == 4 && xhr.status == 200)
		{
			var content = JSON.parse(xhr.responseText);
					
			if(content["resultat"] == "Sucess" ){
			SaveCartItem(paymentid);
			}
		}
	}
	
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(cartdata));
}

function SaveCartItem(paymentid)
{
	if(GetCartItemNumber() >0)
	{
		  var user = sessionStorage.getItem("usersession");
		  var userdata = JSON.parse(user);
		   //
		 var cartitems = localStorage.getItem("usercart");
		 var data = JSON.parse(cartitems);
		
		 data.forEach(function(item,index)
		{
			 ProceedToSaveCartItem(item.itemid,userdata.userid,item.itemprice,paymentid);
		 });	
		 localStorage.removeItem("usercart");
		 window.location.href = "../customer/home.html";
	}
	else{
	alert("There is no item to save");	
	}
}

function ProceedToSaveCartItem(itemid,userid,amount,paymentid)
{
	var url = ReturnBaseString() + "/findyouritem/cartline/add";
	var cartlineobject = 
	{
	 "itemid": itemid,
	 "userid": userid,
	 "amount": amount,
	 "cartkey": paymentid
	};
	
xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200)
		{
		}
	}
	
	xhr.open("POST", url,false);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(cartlineobject));
}

function setTotalMontantPayment()
{
	var payement = cartitemTotlaPrice() + ' DT';
	document.getElementById("totalamount").innerHTML = payement;
	$('#cartnumberofitem').text(GetCartItemNumber()+" Item");
}


paypal.Button.render({
    // Configure environment
    env: 'sandbox',
    client: {
      sandbox: 'AYIWgI1v7QktNaziqS_RFBcCXGl_QaNrakN-PsoceROdVqvNhLdCXFKz8TibKHb6D6i_ItJ0slAn1YUT',
      production: 'demo_production_client_id'
    },
    // Customize button (optional)
    locale: 'en_US',
    style: {
      size: 'small',
      color: 'gold',
      shape: 'rect',
    },

    // Enable Pay Now checkout flow (optional)
    commit: true,

    // Set up a payment
    payment: function(data, actions) {
   
      return actions.payment.create({
    	  
    	  redirect_urls:{
    		  return_url: ReturneAPIBaseString()+'/paypal-execute-payment'
    	  },
        transactions: [{  
          amount: {
            total: ConvertDinardToUSDollard().toString(),
            currency: 'USD'
          }
        }]
      });
    },
    onAuthorize: function(data, actions) {
    //	 return actions.redirect();
    	//ConvertDinardToUSDollard()
    	return paypal.request({
    	    method: 'post',
    	    url: ReturneAPIBaseString()+'/paypal-execute-payment',
    	    json: {
    	    	totalamount: ConvertDinardToUSDollard(),
    	        paymentID: data.paymentID,
    	        payerID:   data.payerID
    	    }
    	}).then(function(response) {
         
          if(response["status"] == "Sucess")
          {
        	  var currentdate = new Date().toISOString().slice(0,10);
        	  saveCartData(cartitemTotlaPrice(),currentdate,data.paymentID);  
          }
          else{
        	  alert("Errorrrr");
          }
       
         
         
    	});
    	
    }
  }, '#paypal-button');


