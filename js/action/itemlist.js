  var xhr = new XMLHttpRequest();
  var result = null;
  var items = [];
  var filterresultbycategory = [];
  var veriffiltrecategactivate = false;
  
  function LoadItems() 
  {
      var url = ReturnBaseString()+"/findyouritem/item/display";    
      xhr.onreadystatechange = function(){
      	   if(xhr.readyState == 4 && xhr.status == 200){
      		   result = JSON.parse(xhr.responseText);
      		   DisplayItems(result);
      	   }
      };
      
      xhr.open("GET", url);
      xhr.send(null);
  }
  
  function ReturnItemData()
  {
	return result;  
  }
  
  function ReturnItemByCategoryData()
  {
	  return filterresultbycategory;
  }
  
  function SetCartIemNumber()
  {
	  var cartitems = localStorage.getItem("usercart");
	  
	  if(cartitems != null)
	  {
		  $('#nbritem').text(GetCartItemNumber()); 	
	  }
	  else{
		  $('#nbritem').text('');  
	  }  
  }
  function DisplayItems(data)
  {
	  var  temp ="";
	  var page = "index";
	  SetCartIemNumber();
		if(data.length >0)
		{		
	   data.forEach(function(item,index){
		 //  alert(currentitem);
		   //           <figure class="product-image"><img src="images/samsungj7.jpg" alt="" class=""></figure>
		   //<a href="#" class="text-dark mb-1 mt-2 h6 d-block">Red Apple </a>
		   //<h5 class="text-success font-weight-normal mb-0"><sup> 120 DT</sup></h5>
		   // 
		   temp += '<div class="col-6 col-md-4 col-lg-3 col-xl-2">';
		   temp += '<div class="card shadow-sm border-0 mb-4">';
		   temp += ' <div class="card-body">';
		   temp += '<a class=" float-right mt-1 btn btn-default button-rounded-36 shadow"  href="';
		   if(VerifIfUserIsConnected()){
			   temp += '../detail/detail.html?iditem=';
		   }
		   else{
			   temp += 'pages/detail/detail.html?iditem=';
		   }
		   
		   temp += item.itemid;
		   temp += '&itempicture=';
		   temp +=  item.itempicture;
		   temp += '&itemname=';
		   temp += item.itemname;
		   temp += '&itemprice=';
		   temp += item.itemprice;
		   temp += '&itemstate=';
		   temp += item.itemstate;
		   temp += '&itemcategory=';
		   temp += item.categorytitle;
		   temp += '&itemdescription=';
		   temp += item.itemdescription;
		   temp += '&iduser=';
		   temp += item.userid;
		   temp += '&userphonenumber=';
		   temp += item.userphonenumber;
		   temp += '&useremail=';
		   temp += item.useremail;
		   temp += '&userpicture=';
		   temp += item.userpicture;
		   temp += '&comptstate=';
		   temp += item.comptstate;
		   temp += '&username=';
		   temp += item.userpseudo;
		   temp += '"><i class="material-icons">add</i></a>';
		   temp += ' <figure class="product-image">';
		   temp += '<img src="';
		   temp += ReturnBasePictureString() + item.itempicture;
		   temp += '" alt="" class=""></figure>';
		   temp += '<a href="#" class="text-dark mb-1 mt-2 h6 d-block">';
		   temp += item.itemname;
		   temp += '</a>';
		   temp += ' <p class="text-secondary small mb-2">';
		   temp += item.userphonenumber;
		   temp += '</p>';
		   
		   temp += '<h5 class="text-success font-weight-normal mb-0"><sup>';
		   temp += item.itemprice;
		   temp += ' DT </sup></h5>';
		   
		   temp += ' <button class="btn btn-default button-rounded-36 shadow-sm float-bottom-right" onclick="AddItemToCart(\''+index+'\')">';
		   temp += '<i class="material-icons md-18">shopping_cart</i></button>';
		   temp += '</div>';
		   temp += '</div>';
		   temp += '</div>';
	   });		
	   
	   document.getElementById("rowitem").innerHTML = temp;
	   
		}
		else{
			document.getElementById("rowitem").innerHTML = '';
		}
  }
  
  function SearchItemByname() 
  {
  	 //alert("searching: "+result);
  	
  	var searchtext = document.getElementById("SearchBartinput").value;
  	var filter = searchtext.toLowerCase();
  	var filterresult = [];
  	
  	//alert(filter);
  	//alert("inputcontent: "+searchtext);
  	//alert("size: "+items.length);
  	
  	result.forEach(function(myitem,index){
  		const itemname = myitem.itemname;
  		if(itemname.toLowerCase().indexOf(filter) != -1)
  		{
  			filterresult.push(myitem);
  		}
  	});
  	
  	//alert("Result: "+filterresult.length);
  	
  	DisplayItems(filterresult);	
  }

  function FilterByCategory(data,category)
  {	 
	// var filterresult = [];
	 filterresultbycategory = [];
  	 data.forEach(function(item,index)
  	{
  		 if(item.categorytitle == category)
  		 {
  			filterresultbycategory.push(item);
  		 }
  	 });
  	   	 
  	 DisplayItems(filterresultbycategory);
  }

  function SearcheItemByCategory()
  {
  	
  	var select = document.getElementById("agileinfo-nav_search");
  	var category = select.options[select.selectedIndex].value;
  	
  	switch (category) 
  	{
  	
  	case "All Categories":
  		veriffiltrecategactivate = false;
  		 DisplayItems(result);
  	break;
  	case "Telephone & Tablets":
  		veriffiltrecategactivate = true;
  		 FilterByCategory(result, "Telephone & Tablets");
  		break;
  		
  	case "Tv":  	
  		veriffiltrecategactivate = true;
  		FilterByCategory(result, "Tv");
  		break;
  		
  	case "Cameras & Camcorders":
  		veriffiltrecategactivate = true;
  		 FilterByCategory(result,"Cameras & Camcorders");
  		break;
  		
  	case "Home Audio & Theater":
  		veriffiltrecategactivate = true;
  		FilterByCategory(result,"Home Audio & Theater");
  		break;
  		
  	case "Computers":
  		veriffiltrecategactivate = true;
  		FilterByCategory(result,"Computers");
  		break;
  		
  	case "Headphones":
  		veriffiltrecategactivate = true;
  		FilterByCategory(result,"Headphones");
  		break;
  		
  	case "Appliances":
  		veriffiltrecategactivate = true;
  		FilterByCategory(result,"Appliances");
  		break;

  	default:
  		alert("Unknown Category");
  		break;
  	}
  }
  
  
  function GoToDetail(page)
  {
	
	  switch (page) {
	case "index":
		window.location.href = "pages/detail/detail.html";
		break;
	case "Home":
		window.location.href = "../detail/detail.html";
		break;
	default:
		alert("Unknwon page");
		break;
	}
  }
  
  function GoToHomePage()
  {
	   if(VerifIfUserIsConnected()){
		   window.location.href = "../customer/home.html";
	   }
	   else{
		   window.location.href = "../../index.html";
	   }
	 
  }
  
  function AddToFavorite(){
	  
  }
  
  
  function uploadImage(event)
  {
     var hiddenitemfile = document.getElementById('itempicture');
     var input = event.target;
     var reader = new FileReader();
     hiddenitemfile.value = input;
     reader.onload = function(){
  	      var dataURL = reader.result;
  	      var output = document.getElementById('itempicture');
  	     // alert("path: "+reader.result);
  	      output.src = dataURL;
  	    };
  	    //alert("name: "+input.files[0].name);
  	    //alert("res: "+event.target.result);
  	    //alert("path: "+URL.createObjectURL(event.target.files[0]));
  	    reader.readAsDataURL(input.files[0]);
  }
  
  function FillItemCategory()
  {
	var url = ReturnBaseString()+"/findyouritem/catgory/display";
	var data = null;
	 xhr.onreadystatechange = function(){
    	   if(xhr.readyState == 4 && xhr.status == 200){
    		  data = JSON.parse(xhr.responseText);
    		  SetItemCategoryOptions(data);
    		  //alert(xhr.responseText);
    	   }
    };
	xhr.open("GET", url, true);
	xhr.send();
  }
  
  function SetItemCategoryOptions(data)
  {
   var categoryoptions = '<option value="-1">Select Item Category</option>';	  
   
   if(data.length >0){
	   data.forEach(function(item,index){
		   categoryoptions  += '<option value="';
		   categoryoptions += item.categoryid;
		   categoryoptions += '">';
		   categoryoptions += item.categorytitle;
		   categoryoptions += '</option>';
	   }); 
   }
   
   document.getElementById("categoryselectoption").innerHTML = categoryoptions;
  }
  
  function AddNewItem()
  {
	  var itemname = document.getElementById("itemname");
	  var itemprice = document.getElementById("itemprice");
	  var categoryselectoption = document.getElementById("categoryselectoption");
	  var state = document.getElementById("itemstate");
	  var description = document.getElementById("itemdescription");
	  var itemfile = $('#itemfile').val();
	  var validity = true;
	  
	  if(itemname.checkValidity() == false)
	  {
		  validity = false;
		  document.getElementById("itemname").style.border="1px solid red";
		  $('#lbitemname').text("Item Name is required");
	  }
	  if(itemprice.checkValidity() == false)
	  {
		  validity = false;
		  document.getElementById("itemprice").style.border="1px solid red";
		  $('#lbitemprice').text("Item Price is required");
	  }
	  
	  if(description.checkValidity() == false)
	  {
		  validity = false;
		  document.getElementById("itemdescription").style.border="1px solid red";
		  $('#lbitemdescription').text("Item Description is required");
	  }
	  
	  if(categoryselectoption.value == "-1"){
		  validity = false;
		  document.getElementById("categoryselectoption").style.border="1px solid red";
	  }
	  if(state.value == "-1"){
		  validity = false;
		  document.getElementById("itemstate").style.border="1px solid red";
	  }
	  
	  if(itemfile == "" || itemfile == null)
	  {
		  validity = false;
		  document.getElementById("itemfile").style.border="1px solid red";
	  }
	  
	  if(validity)
	  {
		  var url = ReturnBaseString()+"/findyouritem/item/add";
		  var user = sessionStorage.getItem("usersession");
		   var userdata = JSON.parse(user);
		  var itemobject = {
			"itemname": itemname.value,
			"itemprice": itemprice.value,
			"itempicture": "pic.png",
			"itemdescription": description.value,
			"itemstate": state.value,
			"categoryid": categoryselectoption.value,
			"userid": userdata.userid
		  };
		  
		  xhr.onreadystatechange = function()
		   {
		 	  if(xhr.readyState == 4 && xhr.status == 200)
		 	  {
		 		  var data = JSON.parse(xhr.responseText);		 		  
		 		  if(data.resultat == "Sucess")
		 		  {
		 			window.location.replace("../customer/home.html");
		 		  }
		 		  else{
		 			  alert("There is an error Check your internet connection");
		 		  }
		 	  }
		   }
		  
		  xhr.open("POST", url);
		  xhr.setRequestHeader("Content-Type", "application/json");
		  xhr.send(JSON.stringify(itemobject));
	  }
  }
  