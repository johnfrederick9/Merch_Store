window.onload = function(){
	setTimeout(function(){
		document.getElementById('loader-area').className = 'Out';		
	},2000)
	setTimeout(function(){
		document.getElementById('loader-area').style.display = 'none';		
	},2500)
}