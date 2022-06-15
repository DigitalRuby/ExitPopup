# Digital Ruby Exit Popup

## Simple Exit Popup in Plain Javascript

Usage:

Include the javascript in your html:

```html
<!DOCTYPE html>
<html>
<head>

<script src="digitalruby.exitpopup.js" type="text/javascript" onload="
	const opt = digitalruby_exitpopup_options;
	opt.element_id = 'digitalruby_exitpopup_div'; // required
	opt.background_element_id = 'digitalruby_exitpopup_div_background'; // optional
	opt.top_only = false; // default false, whether popup shows only through top exit or all exits
	opt.click_outside_to_close = true; // default true, whether clicking outside the popup will close it
	opt.delay = 3000; // delay before allowing popup to show, default is 3000 milliseconds
	opt.path_regex = ''; // optional, specify a regex to filter the path on, if no match, exit popup will not show
  opt.will_show = function() // optional, specify a function to execute before the popup shows
	{
		console.log('popup showing');
	};
" async defer></script>
</head>
```

Next, setup the styles for the popup, and optionally a popup background:

```html
/* it's recommended that your html fill the window to properly detect when the mouse leaves */
html
{
	min-width: 100%;
	min-height: 100%;
}

/* make body also fill window, minus the padding */
body
{
	min-width: calc(100% - 40px);
	min-height: calc(100% - 40px);
	padding: 20px;
	margin: 0;
	font-family: 'Helvetica', 'Arial', sans-serif;
}

/* css for the popup, important notes are display of none and fixed position along with a high z index and centering */
#digitalruby_exitpopup_div
{
	display: none;
	position: fixed;
	z-index: 999;
	padding: 20px;
	background-color: #222222;
	color: #FFFFFF;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	max-width: 300px;
	max-height: 300px;
	width: 75%;
	height: 75%;
	filter: drop-shadow(0px 0px 10px black);
}

/* css for the popup background, also display of none and fixed position along with filling the viewport */
#digitalruby_exitpopup_div_background
{
	display: none;
	position: fixed;
	background-color: rgba(20, 20, 20, 0.5);
	z-index: 0;
	transform: translate(0%, 0%);
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
}
```

Finally, create your popup element and optionally a popup background element in your html:

```html
<!-- exit popup element, hidden by default -->
<div id="digitalruby_exitpopup_div">
This is the exit popup.<br/>
  
<!-- if you want to provide a button to close the popup, you can do so and make sure to call digitalruby_hide_exit_popup -->
<input type="button" value="Close" onclick="digitalruby_hide_exit_popup();" />
</div>

<!-- exit popup background element, hidden by default -->
<div id="digitalruby_exitpopup_div_background">
</div>
```

Notes:

The exit popup will put a flag in local storage to prevent it showing again and again. You can clear this flag by calling `digitalruby_exitpopup_reset_flag();`.

Thanks for visiting!

- Jeff
https://www.digitalruby.com
