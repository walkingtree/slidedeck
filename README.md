# slidedeck
Application to generate Powerpoint kind of presentation from a GitHub repository

This can be used to create slidedeck for all your presentations.


##To launch the Slidedeck app as API, follow below steps :

1. Got to the project root directory and build app using below command in terminal

	**/Cmd path/5.1.1.39/sencha app build**
	
2. Navigate to app production build directory

	**cd <app root directory>/build/production/SD**
	
3. Create empty JS file with name slidedeck.js and save.
	
	**touch slidedeck.js**
	
4. Open the index.html file and copy the content between tag

	**<script type="text/javascript"> ...... </script>**
	
	paste this content in slidedeck.js file which is created in previous step
	
5. Open the slidedeck.js file, search for "app.json" (Including double quotes) and replace with following content and save.

```javascript
	{"css":[{"path":"resources/SD-all.css"}],"js":[{"path":"app.js"}],}
```	
6. Create new file with following content and save as test.html

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
</body>
</html>
```


7. Open the test.html file in browser, you will see that slidedecl application is launched successfully.
