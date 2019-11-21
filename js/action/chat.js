var firebaseConfig = {
    apiKey: "AIzaSyCTnkJ97BqcGWL7i0zVQepW-82fVIGzLQI",
    authDomain: "findyouritem-9521a.firebaseapp.com",
    projectId: "findyouritem-9521a",
    messagingSenderId: "964864138231",
    appId: "1:964864138231:web:36e56c430ba29ff8c52cf2"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
var db = firebase.firestore();

  function  SendMessage() 
  {
	
  			  
   var message = document.getElementById("message");
   var validity = true;
  
   
   if(message.checkValidity()== false)
   {
	   validity = false;
	   document.getElementById("message").style.border="1px solid red";
   }
   
   if(validity)
   {
	   var userobject = JSON.parse(sessionStorage.getItem("usersession"));
	   var currentstatus = new URLSearchParams(window.location.search);
	   var status = currentstatus.get("status");
	   /*var firebaseref = firebase.database().ref();
	   firebaseref.push().set(message.value);*/
	   firebase.firestore().collection('messages').add({
		    name:userobject["userpseudo"],
		    text: message.value,
		    picture: userobject["userpicture"],
		    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		    status: status
		  })
		  .then(function(docRef) {
			    console.log("Document written with ID: ", docRef.id);
			})
			.catch(function(error) {
			    console.error("Error adding document: ", error);
			});
   } 
 
  }
  
  function loadMessages() 
  {
	 //replies
	  var temp = null;

	   
	  db.collection("messages")
	  .orderBy('timestamp')
      .limit(12)
	  .get().then((querySnapshot) => {
		    querySnapshot.forEach((doc) => {		
		      if(doc.data().status == "sender"){
		    	  temp += '<li class="sent">';
			        temp += '<img src="';
			        temp += ReturnBasePictureString()+doc.data().picture;
			        temp += '"alt="" />';
			        temp += '<p>';
			        temp += doc.data().text;
			        temp += '</p>';
			        temp += '</li>';
		      }
		      if(doc.data().status == "replies"){
		    	  temp += '<li class="replies">';
			        temp += '<img src="';
			        temp += ReturnBasePictureString()+doc.data().picture;
			        temp += '"alt="" />';
			        temp += '<p>';
			        temp += doc.data().text;
			        temp += '</p>';
			        temp += '</li>';
		      }
		        
		    });
		    document.getElementById("messagecontent").innerHTML = temp;
		});
	  
	

	  
	}
  
  
  function updateChatBox(userpicture,pseudo,mesage)
  {
	  var temp = null;
	/*	<li class="sent">
		<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
		<p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
	</li>*/
	  document.getElementById("categoryselectoption").innerHTML = categoryoptions;
  }
  
  
  
  function newMessage() {
		message = $(".message-input input").val();
		if($.trim(message) == '') {
			return false;
		}
		var userobject = JSON.parse(sessionStorage.getItem("usersession"));
		var userpseudo = userobject["userpseudo"];
		var useremail = userobject["useremail"];
		var userpicture = userobject["userpicture"];
		 var currentstatus = new URLSearchParams(window.location.search);
		 var status = currentstatus.get("status");
		  
		 if(status == "sender"){
$('<li class="sent"><img src="'+ ReturnBasePictureString()+userpicture + '" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));		 
		 }
        if(status == "replies"){
 $('<li class="replies"><img src="'+ ReturnBasePictureString()+userpicture + '" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));		 			 
		 }
		$('.message-input input').val(null);
		$('.contact.active .preview').html('<span>You: </span>' + message);
		$(".messages").animate({ scrollTop: $(document).height() }, "fast");
	};

	$('.submit').click(function() {
	  newMessage();
	});

	$(window).on('keydown', function(e) {
	  if (e.which == 13) {
		SendMessage() 
	    newMessage();
	    return false;
	  }
	});
  
  
  