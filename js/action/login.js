
window.checkCookie= VerifIfUserIsConnected();
var xhr = CreateXHR();
var result =  null;

function Login(page)
{
	
	  var pseudo = document.getElementById("Pseudo");
	  var password = document.getElementById("Password");
	  var validity = true;
	  if(pseudo.checkValidity()==false){
		 validity = false;
		// document.getElementById("lbpseudo").innerHTML = "You must enter your pseudo";
		 document.getElementById("Pseudo").style.border="1px solid red";
		 document.getElementById("Pseudo").placeholder = "You must enter your pseudo";
	  }
	  if(password.checkValidity()==false){
		validity = false;
	//	document.getElementById("lbpassword").innerHTML = "You must enter your password"
		document.getElementById("Password").style.border="1px solid red";
		document.getElementById("Password").placeholder = "You must enter your password";
	  }
	  
	  if(validity){
		  var url = ReturnBaseString()+"/findyouritem/user/signin/"+pseudo.value+"/"+password.value;
		  
		  xhr.onreadystatechange = function(){
			 if(xhr.readyState == 4 && xhr.status == 200){
				 result = JSON.parse(xhr.responseText);
				 
				 if(result.length == 1){
					 sessionStorage.setItem("usersession", JSON.stringify(result[0]));
					 RedirectionController(page);
				 }
				 else{
					 pseudo.value = "";
					 password.value = "";
					 alert("login or password are incorrect");
				 }
			 }  
		  }
		  
		  xhr.open("GET", url, true);
		  xhr.send();
	  }
}

function RedirectionController(page)
{
	switch (page) {
	case "index":
		 window.location.replace("pages/customer/home.html");
		break;
	case "cart":
	 window.location.replace("../payment/payment.html");
		break;
	default:
		alert("unknown page");
		break;
	}
}

function LogOut(){
	sessionStorage.removeItem("usersession");
	 window.location.replace("../../index.html");
}




function VerifIfUserIsConnected()
{
	
	if(sessionStorage.getItem("usersession") != null)
	{
		return true;
	}
	else{
		return false;
	}
}

function goToAcceuilPage()
{
	if(VerifIfUserIsConnected() == true)
	{
		window.location.replace("../Customer/home.html");
	}
	else{
		window.location.replace("../../index.html");
	}
}

function LogOut()
{
 sessionStorage.removeItem("usersession");	
 window.location.replace("../../index.html");
}
