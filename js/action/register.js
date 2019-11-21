var xhr = CreateXHR();

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function CheckEmailExistance(email)
{
   var url =  ReturnBaseString()+ "/findyouritem/checkemailunicty/"+email;
   var data = null;
   
   xhr.onreadystatechange = function(){
	   if(xhr.readyState == 4 || xhr.status == 200){
		 
		   data = xhr.responseText;
		   if(data.length == 0){
			   alert("reponse"+data.length);
		   }
		   else{
			   alert("reponse"+data.length);
		   }
	   }
   }
   
   xhr.open("GET", url);
   xhr.send();

}


function UserRegistration()
{
	var userpseudo =  document.getElementById("UserPseudo");		
	var useremail  =  document.getElementById("UserEmail");
	var userphonenumber = document.getElementById("UserPhoneNumber");
	var userpassword = document.getElementById("UserPassword");
	var validity = true;
	
	if(!userpseudo.checkValidity())
	{	
		validity = false;
		 document.getElementById("UserPseudo").style.border="1px solid red";
		 document.getElementById("UserPseudo").placeholder = "You must enter your pseudo";
	}
	if(!useremail.checkValidity())
	{	
		validity = false;
		document.getElementById("UserEmail").style.border="1px solid red";
		 document.getElementById("UserEmail").placeholder = "Email must be valid";
	}
	if(!userphonenumber.checkValidity())
	{		
	validity = false;
	document.getElementById("UserPhoneNumber").style.border="1px solid red";
	document.getElementById("UserPhoneNumber").placeholder = "Phone number is required";
	}
	if(!userpassword.checkValidity() || userpassword.length<=4)
	{	
		validity = false;
		document.getElementById("UserPassword").style.border="1px solid red";
		document.getElementById("UserPassword").placeholder = "Password is required and must be longer than 4";
	}
	
	if(validity){
	//CheckEmailExistance(useremail);
		var url = ReturnBaseString()+"/findyouritem/user/signup";
		var userdata = {
				"userpseudo": userpseudo.value,
				"userpassword": userpassword.value,
				"useremail": useremail.value,
				"userpicture":"mypic",
				"userphonenumber": userphonenumber.value
		};
		
		ProceedToRegistration(url, userdata);
	}
}


function ProceedToRegistration(url,userdata)
{
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200){
			 $('#registermodal').modal('hide');
			 $('#loginmodal').modal('show');
		}
	}
	
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(userdata));
}


