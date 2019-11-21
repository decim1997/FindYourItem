
  var xhr = new XMLHttpRequest();
  
function SendMessage()
{
	var firstname = document.getElementById("visitorfirstname");
	var lastname =  document.getElementById("visitorlastname");
	var email =  document.getElementById("visitoremail");
	var object = document.getElementById("mailobject");
	var message = document.getElementById("mailcontent");
	var validity = true;
	
	if(!firstname.checkValidity()){
		validity = false;
		 document.getElementById("visitorfirstname").style.border="1px solid red";
		 $('#lbvisitorfirstname').text( "Please enter your FirstName");
	}
	if(!lastname.checkValidity()){
		validity = false;
		 document.getElementById("visitorlastname").style.border="1px solid red";
		 $('#lbvisitorlastname').text( "Please enter your LastName");
	}
	
	if(!email.checkValidity())
	{
		validity = false;
		 document.getElementById("visitoremail").style.border="1px solid red";
		 $('#lbvisitoremail').text( "Please enter your email");
	}
	
	if(!object.checkValidity()){
	  validity = false;
	  document.getElementById("mailobject").style.border="1px solid red";
	  $('#lbmailobject').text( "Please enter your email object");
	}
	
	if(!message.checkValidity()){
		  validity = false;
		  document.getElementById("mailcontent").style.border="1px solid red";
		  $('#lbmailcontent').text( "Please Enter Your message here");
		}
	
	if(validity)
	{
		var url = ReturnBaseString() + "/findyouritem/sendmail";
		var mailobject = {
				"firstname": firstname.value,
				"lastname": lastname.value,
				"email": email.value,
				"object": object.value,
				"message": message.value
		};
		
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200){
				alert("Email Sent");
				window.location.replace("../../index.html");
			}
		}
		xhr.open("POST", url);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify(mailobject));
	}
	
	
}