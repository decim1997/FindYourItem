
window.checkCookie=ReturnBaseString();
window.checkCookie=CreateXHR();
function ReturnBaseString()
{
  return "http://192.168.43.11:3000";
}

function ReturnBasePictureString()
{
	return "http://192.168.43.11:8888";
}

function ReturneAPIBaseString()
{
	  return "http://192.168.43.11:3002";	  
}

function CreateXHR()
{
	var xhr = new XMLHttpRequest();
	
	return xhr;
}

function CreateCustomAlert()
{
	
}