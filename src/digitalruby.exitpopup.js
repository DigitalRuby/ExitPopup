const digitalruby_exitpopup_options =
{
	element_id: '',
	background_element_id: '',
	top_only: false,
	click_outside_to_close: true,
	delay: 3000,
	path_regex: '',
	will_show: null,
	
	// internal
	delay_expired: false
};

function digitalruby_exitpopup_reset_flag()
{
	localStorage.setItem('digitalruby.exitpopup.can_show', '1');
}

function digitalruby_exitpopup_get(id, callback)
{
	var domEl = document.getElementById(id);
	if (domEl != null)
	{
		callback(domEl);
	}
}

function digitalruby_show_exit_popup()
{
	if (!digitalruby_exitpopup_options.delay_expired ||
		localStorage.getItem('digitalruby.exitpopup.can_show', '1') == '0')
	{
		return;
	}
	
	if (digitalruby_exitpopup_options.will_show != null)
	{
		digitalruby_exitpopup_options.will_show();
	}
	
	localStorage.setItem('digitalruby.exitpopup.can_show', '0');
	digitalruby_exitpopup_get(digitalruby_exitpopup_options.background_element_id, function(e)
	{
		e.style.display = 'block';
	});
	digitalruby_exitpopup_get(digitalruby_exitpopup_options.element_id, function(e)
	{
		e.style.display = 'block';
	});
}

function digitalruby_hide_exit_popup()
{
	digitalruby_exitpopup_get(digitalruby_exitpopup_options.element_id, function(e)
	{
		e.style.display = 'none';
	});
	digitalruby_exitpopup_get(digitalruby_exitpopup_options.background_element_id, function(e)
	{
		e.style.display = 'none';
	});
}

// internal
{
	setTimeout(function()
	{
		const pre = digitalruby_exitpopup_options.path_regex;
		if (pre != null && pre != '')
		{
			const loc = window.location.pathname;
			const re = new RegExp(pre);
			if (!re.test(loc))
			{
				console.log("Path does not match filter, exit popup will not be initialized");
				return;
			}
		}
		
		function digitalruby_mouse_out(event)
		{
			//console.log('mouse out ' + event.clientX + ' ' + event.clientY);		
			if
			(
				// if exit through top bar
				event.clientY <= 1 ||
				// or exit somewhere else and we are allowing exit anywhere
				!digitalruby_exitpopup_options.top_only
			)
			{
				digitalruby_show_exit_popup();
			}
		}
		
		function digitalruby_mouse_click(event)
		{
			digitalruby_exitpopup_get(digitalruby_exitpopup_options.element_id, function(e)
			{
				if (e.style.display == 'block')
				{
					const rect = e.getBoundingClientRect();
					if (event.clientX >= rect.left &&
						event.clientX <= rect.right &&
						event.clientY >= rect.top &&
						event.clientY <= rect.bottom)
					{
						// in popup, ignore
					}
					else if (digitalruby_exitpopup_options.click_outside_to_close)
					{
						digitalruby_hide_exit_popup();
					}
				}
			});
		}

		//document.addEventListener("mouseout", digitalruby_mouse_out);
		document.documentElement.addEventListener("mouseleave", digitalruby_mouse_out);
		document.documentElement.addEventListener("click", digitalruby_mouse_click);
	
		if (digitalruby_exitpopup_options.delay > 0)
		{
			setTimeout(function()
			{
				digitalruby_exitpopup_options.delay_expired = true;
			}, digitalruby_exitpopup_options.delay);
		}
	}, 100);
	console.log("Digital Ruby exit popup initialized - https://github.com/DigitalRuby/ExitPopup");
}