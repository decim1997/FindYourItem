//window.addEventListener("load",LoadAnnounce, false);
var xhr = CreateXHR();
function LoadAnnounce()
{
	var url =  ReturnBaseString()+"/findyouritem/announce/display";
	var result = null;
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200)
		{
		  result = JSON.parse(xhr.responseText);
		  ShowAnnounce(result);
		}
	}
	
	xhr.open("GET", url);
	xhr.send(null);	
	
}

function CalculateDifferenceBetweenTwoDate(dateajout)
{
	const date1 = new Date();
	const date2 = new Date(dateajout);
	const diffTime = Math.abs(date2 - date1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 	
	return diffDays;
}

function ShowAnnounce(data)
{
	  var temp = ""; 
	  var page = '../chat/chat.html';
	  
	 data.forEach(function(announce,index)
	  {
		 temp += '<div class="container">';
		 
		 temp += '<div class="row mt-3">';
		 temp += '<div class="col-auto pr-0 align-self-center">';
		 temp += '<figure class="avatar avatar-70">';
		 temp += '<img src="';
		 temp += ReturnBasePictureString() + announce.userpicture;
		 temp += '" alt="">'; 
		 temp += '</figure>';
		 temp += '</div>';
		 temp += '<div class="col">';
		 temp += '<h5 class="mb-2 text-dark">';
		 temp += announce.userpseudo;
		 temp += '<br><small>';
		 temp += announce.userphonenumber;
		 temp += '</small></h5>';
		 temp += '<p class="text-secondary">';
		 temp += CalculateDifferenceBetweenTwoDate(announce.dateadded);
		 temp += ' days ago';
		 temp += '</p>';
		 temp += '</div>';
		 temp += '</div>';
		 temp += '<hr>';
		 temp += '<p class="text-secondary mb-2">';
		 temp += announce.description;
		 temp += '</p>';
		 temp += '<br>';
		 temp += '<a href="../chat/chat.html?status=sender" class="btn btn-lg btn-default btn-rounded shadow">';
		 temp += '<span>Comment</span><i class="material-icons">arrow_forward</i></a>';
		 temp += '</div>';
	  });
	  document.getElementById("annoucerow").innerHTML = temp;
}

document.addEventListener('tizenhwkey', function(e) {
    if (e.keyName === "back") {
        try {
           if(VerifIfUserIsConnected())
           {
        	   window.location.href = "../customer/home.html";
           }
        } catch (ignore) {}
    }
});



function AddNewPost()
{

	   var title = document.getElementById("addtitle");
	   var description = document.getElementById("adddescription");
	   var validity = true
	   
	   if(title.checkValidity() == false){
		   validity = false;
		   document.getElementById("addtitle").style.border="1px solid red";
		   $('#lbtitle').text("Announce Title is required");
	   }
	   if(description.checkValidity() == false){
		  validity = false; 
		  document.getElementById("adddescription").style.border="1px solid red";
		  $('#lbdescription').text("Announce Description is required");
	   }
	   
	   if(validity)
	   {
		   var url = ReturnBaseString() + "/findyouritem/announce/add";
		   var user = sessionStorage.getItem("usersession");
		   var userdata = JSON.parse(user);
		   var announcedata = 
		   {
		    "title": title.value,
		    "description": description.value,
		    "iduser":userdata.userid,
		    "dateadded": new Date().toISOString().slice(0,10)
		   };
		   
		   xhr.onreadystatechange = function()
		   {
		 	  if(xhr.readyState == 4 && xhr.status == 200)
		 	  {
		 		  var result = JSON.parse(xhr.responseText);
		 		  if(result.resultat == "sucess")
		 		  {
		 			window.location.replace("showannounce.html");
		 		  }
		 		  else{
		 			  alert(" There is an Error");
		 		  }
		 	  }
		   }
		   
		   xhr.open("POST",url,false);
		   xhr.setRequestHeader("Content-Type", "application/json");
		   xhr.send(JSON.stringify(announcedata));
	   }

	 
	   
}


function GoToChatRoom(page,infos)
{
  if(VerifIfUserIsConnected()){
	//  window.location.href = page+infos;
  }	
  else{
	  alert("You need to be connected to access to this function");
  }
}
