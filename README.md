# slidedeck
Application to generate Powerpoint kind of presentation from a GitHub repository

This can be used to create slidedeck for all your presentations.


##To launch the Slidedeck app as API, follow below steps :

1. Got to the project root directory and build app using below command in terminal

	**/Cmd path/5.1.1.39/sencha app build**
	
2. Navigate to app production build directory

	**cd <app root directory>/build/production/SD**
	
3. Create empty JS file with name slidedeck.js and save. ( This file contains the the details for loading the JS and css files requied for slidedeck app) 
	
	**touch slidedeck.js**
	
4. Open the index.html file and copy the content between tag (index.html file created as part of production build)

	**<script type="text/javascript"> ...... </script>**
	
	paste this content in slidedeck.js file which is created in previous step
	
5. Open the slidedeck.js file, search for "app.json" (Including double quotes) and replace with following content and save. ( app.json holds the details for js and css files, to avoid the additional file add direct path for js and css as below)

```javascript
	{"css":[{"path":"resources/SD-all.css"}],"js":[{"path":"app.js"}],}
```	
6. Create new file with following content and save as  thirdparty.html ( To luanch the slidedeck app)

```html

<!DOCTYPE HTML>

<html lang="en-US">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <title>SlideDeck</title>	
	<script type='text/javascript' src='slidedeck.js'></script>
	<script>  
	  SlideDeckonLoad=function(){SlideDeck.init('81b881aa2b1a32b4946f9b8d2972bbfd23822cca','ajit-kumar-azad','training','newDiv');};
	</script>
</head>
<body> 
<div id="newDiv" style="height:1100px;width:1400px;">
</div>
<script type="text/javascript">
	
	var myWidth;
var myHeight;

if( typeof( window.innerWidth ) == 'number' ) { 

//Non-IE 

myWidth = window.innerWidth;
myHeight = window.innerHeight; 

} else if( document.documentElement && 

( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) { 

//IE 6+ in 'standards compliant mode' 

myWidth = document.documentElement.clientWidth; 
myHeight = document.documentElement.clientHeight; 

} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) { 

//IE 4 compatible 

myWidth = document.body.clientWidth; 
myHeight = document.body.clientHeight; 

}
document.getElementById("newDiv").style.height = myHeight+'px';
document.getElementById("newDiv").style.width = myWidth+'px';
</script>
</body>
</html>
```


7. Open the thirdparty.html file in browser, you will see that slidedecl application is launched successfully.
